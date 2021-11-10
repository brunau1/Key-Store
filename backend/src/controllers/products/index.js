const controller = require('./products.controller');
const router = require('express').Router();

module.exports = (server) => {
	router.get('/', controller.get);
	router.get('/:id', controller.getById);
	router.post('/', controller.create);
	router.put('/:id', controller.update);
	router.delete('/:id', controller.delete);
	server.use('/products', router);
};
