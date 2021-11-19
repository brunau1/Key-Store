const AuthService = require('../../services/auth.service');

class AuthController {
	async login(req, res) {
		try {
			const { email, password } = req.body;
			await AuthService.login({ email, password }, errors);
			return res.status(201).send('ok');
		} catch (error) {
			return res.status(error.status).send(error.message);
		}
	}
	async logout(req, res) {
		const { id } = req.body;
		await AuthService.logout(id);
	}
	async signup(req, res) {
		try {
			const { name, email, password } = req.body;
			const errors = {
				name: [400, 'Missing name'],
				email: [400, 'Missing email'],
				password: [400, 'Missing password'],
			};
			await AuthService.register({ name, email, password }, errors);
			return res.status(201).send('ok');
		} catch (error) {
			return res.status(error.status).send(error.message);
		}
	}
}

module.exports = new AuthController();
