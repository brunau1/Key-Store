const controller = require('./users.controller');
const router = require('express').Router();

module.exports = {
	init: (server) => {
		router.get('/', controller.get);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);
		server.use('/user', router);
	},
};
