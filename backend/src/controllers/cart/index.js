const controller = require('./cart.controller');
const router = require('express').Router();

module.exports = {
	init: (server) => {
		router.get('/:userId', controller.get);
		router.post('/', controller.create);
		// router.put('/:id', controller.update);
		router.delete('/:userId/:productId', controller.delete);
		server.use('/cart', router);
	},
};
