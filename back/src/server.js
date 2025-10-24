const Fastify = require('fastify');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('@fastify/cors');
const userRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes');
const fastifyMultipart = require('@fastify/multipart');

const jwt = require("./plugins/jwt");

const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
});

mongoose.connect(process.env.MONGO_DB, {
    dbName: 'Wajeb'
}).then(() => {
    console.log('Connected to DB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error)
})

const start = async () => {
    try {

         await fastify.register(fastifyMultipart, {
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB
                files:1
            }
        });
        // Register JWT plugin first and wait for it
        await fastify.register(jwt);

        // Then register routes that depend on JWT
        await fastify.register(userRoutes, { prefix: 'api/users' });


        await fastify.register(fileRoutes, { prefix: 'api/files' });

        // Start the server
        const port = process.env.PORT;
        const host = '0.0.0.0';
        await fastify.listen({ port, host })
        fastify.log.info(`Server running on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();
