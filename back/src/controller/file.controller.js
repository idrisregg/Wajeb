const File = require('../models/file.model');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

async function uploadFile(req, reply) {
    try {
        const data = await req.file();
        
        if (!data) {
            return reply.status(400).send({ 
                error: 'No file uploaded' 
            });
        }

        const { senderName, description, tags, isPublic } = req.body;
        
        if (!senderName) {
            return reply.status(400).send({ 
                error: 'Sender name is required' 
            });
        }

        // Generate unique filename
        const fileExtension = path.extname(data.filename);
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
        const filePath = path.join(uploadsDir, uniqueFileName);

        // Save file to disk
        const writeStream = fs.createWriteStream(filePath);
        await data.file.pipe(writeStream);

        // Wait for file to be written
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Create file record in database
        const fileRecord = await File.create({
            fileName: uniqueFileName,
            originalName: data.filename,
            filePath: filePath,
            fileSize: data.file.bytesRead || 0,
            mimeType: data.mimetype,
            uploadedBy: req.user.userId,
            senderName: senderName,
            description: description || '',
            isPublic: isPublic === 'true',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : []
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
                description: fileRecord.description,
                isPublic: fileRecord.isPublic,
                tags: fileRecord.tags,
                uploadedAt: fileRecord.createdAt
            }
        });

    } catch (error) {
        console.error('File upload error:', error);
        reply.status(500).send({ 
            error: 'Failed to upload file',
            details: error.message 
        });
    }
}

async function getAllFiles(req, reply) {
    try {
        const { page = 1, limit = 10, public } = req.query;
        const skip = (page - 1) * limit;

        let query = {};
        
        // If requesting public files, show only public files
        // Otherwise, show user's own files
        if (public === 'true') {
            query.isPublic = true;
        } else {
            query.uploadedBy = req.user.userId;
        }

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

        // Check if user can access this file
        if (!file.isPublic && file.uploadedBy._id.toString() !== req.user.userId) {
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

        // Check if user can access this file
        if (!file.isPublic && file.uploadedBy.toString() !== req.user.userId) {
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

        // Set appropriate headers
        reply.header('Content-Disposition', `attachment; filename="${file.originalName}"`);
        reply.header('Content-Type', file.mimeType);
        
        // Send file
        reply.send(fs.createReadStream(file.filePath));

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

        // Delete file from disk
        if (fs.existsSync(file.filePath)) {
            fs.unlinkSync(file.filePath);
        }

        // Delete file record from database
        await File.findByIdAndDelete(req.params.id);

        reply.send({
            message: 'File deleted successfully'
        });

    } catch (error) {
        console.error('Delete file error:', error);
        reply.status(500).send({ 
            error: 'Failed to delete file',
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


