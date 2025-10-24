const File = require('../models/file.model');
const User = require('../models/user.model');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

async function uploadFile(req, reply) {
    let filePath = null;
    
    try {
        // CHECK: Has user uploaded a file in the last 3 days?
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        const recentUpload = await File.findOne({
            uploadedBy: req.user.userId,
            createdAt: { $gte: threeDaysAgo }
        });

        if (recentUpload) {
            const nextAllowedDate = new Date(recentUpload.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000);
            return reply.status(429).send({ 
                error: 'Upload limit reached',
                message: `You can only upload one file every 3 days. Next upload allowed: ${nextAllowedDate.toLocaleString()}`,
                nextAllowedDate: nextAllowedDate
            });
        }
        
        const parts = req.parts();
        let fileData = null;
        const fields = {};

        // Process all parts (both file and fields)
        for await (const part of parts) {
            if (part.file) {
                const fileExtension = path.extname(part.filename);
                const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
                filePath = path.join(uploadsDir, uniqueFileName);

                await pipeline(part.file, fs.createWriteStream(filePath));
                
                const stats = fs.statSync(filePath);

                fileData = {
                    savedPath: filePath,
                    uniqueName: uniqueFileName,
                    originalName: part.filename,
                    mime: part.mimetype,
                    size: stats.size
                };
            } else {
                fields[part.fieldname] = part.value;
            }
        }

        if (!fileData) {
            return reply.status(400).send({ 
                error: 'No file uploaded' 
            });
        }

        // Extract fields
        const { senderName, description, tags, recipientUserName } = fields;
        
        if (!senderName || !senderName.trim()) {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return reply.status(400).send({ 
                error: 'Sender name is required' 
            });
        }

        // Validate recipient username
        if (!recipientUserName || !recipientUserName.trim()) {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return reply.status(400).send({ 
                error: 'Recipient username is required' 
            });
        }

        // Check if recipient user exists
        const recipientUser = await User.findOne({ userName: recipientUserName.trim() });
        if (!recipientUser) {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return reply.status(404).send({ 
                error: 'Recipient user not found',
                message: `No user found with username: ${recipientUserName.trim()}`
            });
        }

        // Create database record
        const fileRecord = await File.create({
            fileName: fileData.uniqueName,
            originalName: fileData.originalName,
            filePath: fileData.savedPath,
            fileSize: fileData.size,
            mimeType: fileData.mime,
            uploadedBy: req.user.userId,
            recipientUserName: recipientUserName.trim(),
            senderName: senderName.trim(),
            description: description ? description.trim() : '',
            tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
        });

        reply.status(201).send({
            message: 'File uploaded successfully',
            file: {
                id: fileRecord._id,
                fileName: fileRecord.fileName,
                originalName: fileRecord.originalName,
                fileSize: fileRecord.fileSize,
                mimeType: fileRecord.mimeType,
                senderName: fileRecord.senderName,
                recipientUserName: fileRecord.recipientUserName,
                description: fileRecord.description,
                tags: fileRecord.tags,
                uploadedAt: fileRecord.createdAt
            }
        });

    } catch (error) {
        console.error('File upload error:', error);
        
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (cleanupError) {
                console.error('Error cleaning up file:', cleanupError);
            }
        }
        
        reply.status(500).send({ 
            error: 'Failed to upload file',
            details: error.message
        });
    }
}

async function getAllFiles(req, reply) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        // Get current user's username
        const currentUser = await User.findById(req.user.userId);
        if (!currentUser) {
            return reply.status(404).send({ error: 'User not found' });
        }

        // Get files sent TO the logged-in user
        const query = {
            recipientUserName: currentUser.userName
        };

        const files = await File.find(query)
            .populate('uploadedBy', 'userName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await File.countDocuments(query);

        reply.send({
            files,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalFiles: total,
                hasNext: skip + files.length < total,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Get files error:', error);
        reply.status(500).send({ 
            error: 'Failed to fetch files',
            details: error.message 
        });
    }
}

async function getFileById(req, reply) {
    try {
        const file = await File.findById(req.params.id).populate('uploadedBy', 'userName email');
        
        if (!file) {
            return reply.status(404).send({ 
                error: 'File not found' 
            });
        }

        // Get current user's username
        const currentUser = await User.findById(req.user.userId);
        
        // Check if user can access this file (either sender or recipient)
        const isRecipient = file.recipientUserName === currentUser.userName;
        const isSender = file.uploadedBy._id.toString() === req.user.userId;
        
        if (!file.isPublic && !isRecipient && !isSender) {
            return reply.status(403).send({ 
                error: 'Access denied' 
            });
        }

        reply.send({ file });
    } catch (error) {
        console.error('Get file error:', error);
        reply.status(500).send({ 
            error: 'Failed to fetch file',
            details: error.message 
        });
    }
}

async function downloadFile(req, reply) {
    try {
        const file = await File.findById(req.params.id);
        
        if (!file) {
            return reply.status(404).send({ 
                error: 'File not found' 
            });
        }

        // Get current user's username
        const currentUser = await User.findById(req.user.userId);
        
        // Check if user can access this file (either sender or recipient)
        const isRecipient = file.recipientUserName === currentUser.userName;
        const isSender = file.uploadedBy.toString() === req.user.userId;
        
        if (!file.isPublic && !isRecipient && !isSender) {
            return reply.status(403).send({ 
                error: 'Access denied' 
            });
        }

        // Check if file exists on disk
        if (!fs.existsSync(file.filePath)) {
            return reply.status(404).send({ 
                error: 'File not found on disk' 
            });
        }

        // Increment download count
        await File.findByIdAndUpdate(req.params.id, { 
            $inc: { downloadCount: 1 } 
        });

        // Set headers and send file
        reply.header('Content-Disposition', `attachment; filename="${file.originalName}"`);
        reply.header('Content-Type', file.mimeType || 'application/octet-stream');
        
        const fileStream = fs.createReadStream(file.filePath);
        return reply.send(fileStream);

    } catch (error) {
        console.error('Download file error:', error);
        reply.status(500).send({ 
            error: 'Failed to download file',
            details: error.message 
        });
    }
}

async function updateFile(req, reply) {
    try {
        const { senderName, description, tags, isPublic } = req.body;
        
        const file = await File.findById(req.params.id);
        
        if (!file) {
            return reply.status(404).send({ 
                error: 'File not found' 
            });
        }

        // Check if user owns this file
        if (file.uploadedBy.toString() !== req.user.userId) {
            return reply.status(403).send({ 
                error: 'Access denied' 
            });
        }

        const updateData = {};
        if (senderName) updateData.senderName = senderName;
        if (description !== undefined) updateData.description = description;
        if (tags) updateData.tags = tags.split(',').map(tag => tag.trim());
        if (isPublic !== undefined) updateData.isPublic = isPublic === 'true';

        const updatedFile = await File.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        ).populate('uploadedBy', 'userName email');

        reply.send({
            message: 'File updated successfully',
            file: updatedFile
        });

    } catch (error) {
        console.error('Update file error:', error);
        reply.status(500).send({ 
            error: 'Failed to update file',
            details: error.message 
        });
    }
}

async function deleteFile(req, reply) {
    try {
        const fileId = req.params.id;
        console.log('DELETE request received for file ID:', fileId);
        console.log('User ID making request:', req.user.userId);

        // Validate file ID format
        if (!fileId || fileId.length !== 24) {
            console.log('Invalid file ID format:', fileId);
            return reply.status(400).send({ 
                error: "Invalid file ID format" 
            });
        }

        // Find the file first to check if it exists
        const file = await File.findById(fileId);
        console.log('File found:', file ? file._id : 'NOT FOUND');
        
        if (!file) {
            return reply.status(404).send({ 
                error: "File not found" 
            });
        }
        
        // Get current user's information
        const currentUser = await User.findById(req.user.userId);
        if (!currentUser) {
            console.log('Current user not found:', req.user.userId);
            return reply.status(404).send({ 
                error: "User not found" 
            });
        }

        console.log('Current user:', currentUser.userName);
        console.log('File recipient:', file.recipientUserName);
        console.log('File uploaded by:', file.uploadedBy.toString());
        
        // Check if user is authorized (either sender or recipient)
        const isSender = file.uploadedBy.toString() === req.user.userId;
        const isRecipient = file.recipientUserName === currentUser.userName;
        
        console.log('Is sender:', isSender);
        console.log('Is recipient:', isRecipient);
        
        if (!isSender && !isRecipient) {
            console.log('User not authorized to delete this file');
            return reply.status(403).send({ 
                error: "Not authorized to delete this file" 
            });
        }
        
        // Delete the actual file from storage
        if (fs.existsSync(file.filePath)) {
            try {
                fs.unlinkSync(file.filePath);
                console.log(`Deleted physical file: ${file.filePath}`);
            } catch (fsError) {
                console.error('Error deleting file from disk:', fsError);
            }
        } else {
            console.log('Physical file not found at path:', file.filePath);
        }
        
        // Delete from database
        await File.findByIdAndDelete(fileId);
        console.log(`File ${fileId} deleted successfully`);
        
        reply.send({ 
            message: "File deleted successfully",
            fileId: fileId 
        });
    } catch (error) {
        console.error('Delete file error:', error);
        
        // Handle invalid ObjectId format
        if (error.name === 'CastError') {
            console.log('CastError - Invalid ObjectId');
            return reply.status(400).send({ 
                error: "Invalid file ID format" 
            });
        }
        
        reply.status(500).send({ 
            error: "Failed to delete file",
            details: error.message 
        });
    }
}

module.exports = {
    uploadFile,
    getAllFiles,
    getFileById,
    downloadFile,
    updateFile,
    deleteFile
};