const File = require('../models/file.model');
const fs = require('fs');
const path = require('path');

class FileCleanupService {
    constructor() {
        this.cleanupInterval = 24 * 60 * 60 * 1000; // 24 hours
        this.startCleanup();
    }

    startCleanup() {
        // Run cleanup immediately
        this.cleanupExpiredFiles();
        
        // Schedule regular cleanup
        setInterval(() => {
            this.cleanupExpiredFiles();
        }, this.cleanupInterval);
    }

    async cleanupExpiredFiles() {
        try {
            console.log('Starting file cleanup...');
            
            // Find files that should be deleted (expired or older than 7 days)
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            
            const expiredFiles = await File.find({
                $or: [
                    { expiresAt: { $lte: new Date() } },
                    { createdAt: { $lte: sevenDaysAgo } }
                ]
            });

            console.log(`Found ${expiredFiles.length} files to clean up`);

            for (const file of expiredFiles) {
                try {
                    // Delete physical file
                    if (fs.existsSync(file.filePath)) {
                        fs.unlinkSync(file.filePath);
                        console.log(`Deleted file: ${file.fileName}`);
                    }

                    // Delete database record
                    await File.findByIdAndDelete(file._id);
                    console.log(`Deleted database record for: ${file.fileName}`);
                } catch (error) {
                    console.error(`Error cleaning up file ${file.fileName}:`, error);
                }
            }

            console.log(`File cleanup completed. Cleaned ${expiredFiles.length} files.`);
        } catch (error) {
            console.error('Error during file cleanup:', error);
        }
    }

    // Manual cleanup method for testing
    async forceCleanup() {
        console.log('Force cleanup initiated...');
        await this.cleanupExpiredFiles();
    }

    // Get cleanup statistics
    async getCleanupStats() {
        try {
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            
            const totalFiles = await File.countDocuments();
            const expiredFiles = await File.countDocuments({
                $or: [
                    { expiresAt: { $lte: new Date() } },
                    { createdAt: { $lte: sevenDaysAgo } }
                ]
            });
            const activeFiles = totalFiles - expiredFiles;

            return {
                totalFiles,
                expiredFiles,
                activeFiles,
                nextCleanup: new Date(Date.now() + this.cleanupInterval)
            };
        } catch (error) {
            console.error('Error getting cleanup stats:', error);
            return null;
        }
    }
}

module.exports = FileCleanupService;

