const Database = require('../../database/index');

class UsersController {
	async get(req, res) {
		const users = await Database.find('users');
		return res.status(200).send({ users });
	}
	async getById(req, res) {
		const { id } = req.params;
		const users = await Database.find('users', { id });
		res.status(200).send({ users });
	}
	async create(req, res) {
		const payload = req.body;
		await Database.create('users', payload);
		res.status(201).send('created');
	}
	async update(req, res) {
		const { id } = req.params;
		const payload = req.body;
		await Database.update('users', { id, ...payload });
		res.status(201).send('ok');
	}
	async delete(req, res) {
		const { id } = req.params;
		await Database.delete('users', id);
		res.status(200).send('deleted');
	}
}

module.exports = new UsersController();
