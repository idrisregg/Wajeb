const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    originalName: {
        type: String,
        required: true,
        trim: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // CHANGED: Use userName instead of ObjectId for easier recipient identification
    recipientUserName: {
        type: String,
        required: true,
        trim: true
    },
    senderName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
        trim: true
    }],
    expiresAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        },
        index: { expireAfterSeconds: 0 }
    }
}, {
    timestamps: true
});

// Index for better query performance
FileSchema.index({ uploadedBy: 1, createdAt: -1 });
FileSchema.index({ recipientUserName: 1, createdAt: -1 }); // Index by username
FileSchema.index({ fileName: 1 });
FileSchema.index({ tags: 1 });

const File = mongoose.model('File', FileSchema);

module.exports = File;