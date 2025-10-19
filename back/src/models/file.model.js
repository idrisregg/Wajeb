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
            // Set expiration to 7 days from now
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        },
        index: { expireAfterSeconds: 0 } // MongoDB TTL index
    }
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

// Index for better query performance
FileSchema.index({ uploadedBy: 1, createdAt: -1 });
FileSchema.index({ fileName: 1 });
FileSchema.index({ tags: 1 });

const File = mongoose.model('File', FileSchema);

module.exports = File;

