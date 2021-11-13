const Database = require('../database/index');
class AuthService {
	static login({ email, password }, errorsList) {
		const [user] = await Database.find('users', { email });
		this.handleError(!user, 'user', errorsList);
		this.handleError(user.password !== password, 'password', errorsList);
		user.logged = true;
		Database.update('users', user);
		return user;
	}
	static register({ name, email, password }, errorsList) {
		this.handleError(name, 'name', errorsList);
		this.handleError(email, 'email', errorsList);
		this.handleError(password, 'password', errorsList);
		const user = { name, email, password, logged: false };
		Database.create('users', user);
		return user;
	}
	static logout(id) {
		const [user] = await Database.find('users', { id });
		user.logged = false;
		Database.update('users', user);
	}
	static handleError(condition, error, errorsList) {
		if (condition)
			throw { status: errorsList[error][0], message: errorsList[error][1] };
	}
}

module.exports = AuthService;
