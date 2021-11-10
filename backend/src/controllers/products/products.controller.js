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
		const { name, price, quantity } = req.body;
		const product = Storage.create('products', { name, price, quantity });
		res.status(200).send({ product });
	}
}
module.exports = new ProductsController();
