const Database = require('../../database/index');

class ProductsController {
	get(req, res) {
		const products = Database.find('products');
		res.status(200).send({ products });
	}
	getById(req, res) {
		const { id } = req.params;
		const product = Database.find('products', { id });
		res.status(200).send({ product });
	}
	create(req, res) {
		const payload = req.body;
		Database.create('products', payload);
		res.status(201).send('created');
	}
	update(req, res) {
		const { id } = req.params;
		const payload = req.body;
		Database.update('products', { id, ...payload });
		res.status(201).send('ok');
	}
	delete(req, res) {
		const { id } = req.params;
		Database.delete('products', id);
		res.status(200).send('deleted');
	}
}
module.exports = new ProductsController();
