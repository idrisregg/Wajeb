const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {
	fastify.register(require("@fastify/jwt"), {
		secret: process.env.JWT_SECRET,
		sign: {
			expiresIn: '24h'
		},
		verify: {
			maxAge: '24h'
		}
	})

	fastify.decorate("jwtAuth", async function (request, reply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			console.error('JWT verification error:', err.message);
			reply.status(401).send({ 
				error: "Unauthorized",
				message: "Invalid or expired token" 
			});
		}
	})
})