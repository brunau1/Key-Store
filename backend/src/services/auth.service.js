const Database = require('../database/index');
class AuthService {
	static async login({ email, password }, errorsList) {
		const [user] = Database.find('users', { email });
		this.handleError(!user, 'user', errorsList);
		this.handleError(user.password !== password, 'password', errorsList);
		user.logged = true;
		await Database.update('users', user);
		return user;
	}
	static async register({ name, email, password }, errorsList) {
		this.handleError(name, 'name', errorsList);
		this.handleError(email, 'email', errorsList);
		this.handleError(password, 'password', errorsList);
		const user = { name, email, password, logged: false };
		await Database.create('users', user);
		return user;
	}
	static async logout(id) {
		const [user] = await Database.find('users', { id });
		user.logged = false;
		await Database.update('users', user);
	}
	static async handleError(condition, error, errorsList) {
		if (condition)
			throw { status: errorsList[error][0], message: errorsList[error][1] };
	}
}

module.exports = AuthService;
