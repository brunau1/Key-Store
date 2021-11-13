const controller = require('./auth.controller');
const router = require('express').Router();

module.exports = {
	init: (server) => {
		router.post('/login', controller.login);
		router.post('/logout', controller.logout);
		router.post('/signup', controller.signup);
		server.use('/auth', router);
	},
};
