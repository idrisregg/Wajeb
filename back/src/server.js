const Fastify = require ('fastify');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const jwt = require("./plugins/jwt");

const { basicAuth } = require("./middlewares/auth")

 const fastify = Fastify({
    logger:true
});


mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('Connected to DB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error)
})

fastify.register(userRoutes,{prefix: 'api/users'})

const start = async () => {
    try {
        const port = process.env.PORT || 3000;
        const host = '0.0.0.0';
       fastify.listen({port,host})
       fastify.log(`Server running on ${fastify.server.address().port}`)
    } catch (error) {
        
    }
}
start();