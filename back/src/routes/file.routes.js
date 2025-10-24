const FileController = require('../controller/file.controller');

async function routes(fastify, options) {
    // File upload routes
    fastify.post('/upload', { 
        onRequest: [fastify.jwtAuth],
    }, FileController.uploadFile);

    // Get all files (user's own files or public files)
    fastify.get('/', { 
        onRequest: [fastify.jwtAuth] 
    }, FileController.getAllFiles);

    // Get public files only
    fastify.get('/public', FileController.getAllFiles);

    // Get specific file info
    fastify.get('/:id', { 
        onRequest: [fastify.jwtAuth] 
    }, FileController.getFileById);

    // Download file
    fastify.get('/:id/download', { 
        onRequest: [fastify.jwtAuth] 
    }, FileController.downloadFile);

    // Update file metadata
    fastify.put('/:id', { 
        onRequest: [fastify.jwtAuth] 
    }, FileController.updateFile);

    // Delete file
    fastify.delete('/:id', { 
        onRequest: [fastify.jwtAuth] 
    }, FileController.deleteFile);
}

module.exports = routes;


