const Database = require('../../database/index');

class ProductsController {
	async get(req, res) {
		const products = await Database.find('products');
		res.status(200).send({ products });
	}
	async getById(req, res) {
		const { id } = req.params;
		const product = await Database.find('products', { id });
		res.status(200).send({ product });
	}
	async create(req, res) {
		const payload = req.body;
		await Database.create('products', payload);
		res.status(201).send('created');
	}
	async update(req, res) {
		const { id } = req.params;
		const payload = req.body;
		await Database.update('products', { id, ...payload });
		res.status(201).send('ok');
	}
	async delete(req, res) {
		const { id } = req.params;
		await Database.delete('products', id);
		res.status(200).send('deleted');
	}
}
module.exports = new ProductsController();
