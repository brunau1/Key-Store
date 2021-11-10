const Storage = require('../../database/index');

class ProductsController {
	get(req, res) {
		const products = Storage.find('products');
		res.status(200).send({ products });
	}
	getById(req, res) {
		const { id } = req.params;
		const product = Storage.find('products', 'id', id);
		res.status(200).send({ product });
	}
	create(req, res) {
		const payload = req.body;
		Storage.create('products', payload);
		res.status(201).send('created');
	}
	update(req, res) {
		const { id } = req.params;
		const payload = req.body;
		Storage.update('products', { id, ...payload });
		res.status(201).send('ok');
	}
	delete(req, res) {
		const { id } = req.params;
		Storage.delete('products', id);
		res.status(200).send('deleted');
	}
}
module.exports = new ProductsController();
