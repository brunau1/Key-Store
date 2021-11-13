const Database = require('../../database/index');

class UsersController {
	get(req, res) {
		const users = Database.find('users');
		return res.status(200).send({ users });
	}
	getById(req, res) {
		const { id } = req.params;
		const users = Database.find('users', { id });
		res.status(200).send({ users });
	}
	create(req, res) {
		const payload = req.body;
		Database.create('users', payload);
		res.status(201).send('created');
	}
	update(req, res) {
		const { id } = req.params;
		const payload = req.body;
		Database.update('users', { id, ...payload });
		res.status(201).send('ok');
	}
	delete(req, res) {
		const { id } = req.params;
		Database.delete('users', id);
		res.status(200).send('deleted');
	}
}

module.exports = new UsersController();
