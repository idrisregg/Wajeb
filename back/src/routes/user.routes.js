const UserController = require('../controller/user.controller');
const { basicAuth } = require("../middlewares/auth");
const User = require("../models/user.model")

async function routes(fastify, options) {
    // Specific routes first (before parameterized routes)
    fastify.post("/login", async (request, reply) => {
        const { email, password } = request.body;
        
        // Validate input
        if (!email || !password) {
            return reply.status(400).send({ 
                error: "Email and password are required" 
            });
        }
        
        try {
            const user = await User.findOne({ email }).select(["password", "userName", "email"]);

            if (!user) {
                return reply.status(401).send({ 
                    error: "Invalid email or password" 
                });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return reply.status(401).send({ 
                    error: "Invalid email or password" 
                });
            }

            // Generate JWT token with proper payload structure
            const token = fastify.jwt.sign({
                userId: user._id,
                email: user.email,
                userName: user.userName
            }, {
                expiresIn: '24h' // Token expires in 24 hours
            });
            
            reply.send({ 
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    userName: user.userName
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            return reply.status(500).send({ 
                error: "An error occurred during login" 
            });
        }
    });
    
    // Other specific routes
    fastify.get("/", { onRequest: [fastify.jwtAuth] }, UserController.getAllUsers);
    fastify.get("/me", { onRequest: [fastify.jwtAuth] }, async (request, reply) => {
        try {
            const userId = request.user.userId;
            const user = await User.findById(userId).select("-password");
            
            if (!user) {
                return reply.status(404).send({ 
                    error: "User not found" 
                });
            }
            
            reply.send({
                user: {
                    id: user._id,
                    email: user.email,
                    userName: user.userName
                }
            });
        } catch (error) {
            console.error('Get user info error:', error);
            reply.status(500).send({ 
                error: "An error occurred while fetching user info" 
            });
        }
    });
    
    // Parameterized routes last
    fastify.get('/:id', UserController.getUserById);
    fastify.post('/', UserController.createUser);
    fastify.put('/:id', UserController.updateUser);
    fastify.delete('/:id',UserController.deleteUser);
}

module.exports = routes;
