const AuthService = require('../../services/auth.service');

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body;
			AuthService.login({ email, password }, errors);
			return res.status(201).send('ok');
		} catch (error) {
			return res.status(error.status).send(error.message);
		}
	}
	logout(req, res) {
		const { id } = req.body;
		AuthService.logout(id);
	}
	signup(req, res) {
		try {
			const { name, email, password } = req.body;
			const errors = {
				name: [400, 'Missing name'],
				email: [400, 'Missing email'],
				password: [400, 'Missing password'],
			};
			AuthService.register({ name, email, password }, errors);
			return res.status(201).send('ok');
		} catch (error) {
			return res.status(error.status).send(error.message);
		}
	}
}

module.exports = new AuthController();
