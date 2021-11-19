const express = require('express');
const cors = require('cors');
const productsRouter = require('./controllers/products/index');
const usersRouter = require('./controllers/users/index');
const authRouter = require('./controllers/auth/index');
const cartRouter = require('./controllers/cart/index');

class Server {
	constructor(port) {
		this.port = port;
		this.app = express();
		this.config();
		this.routes();
	}

	config() {
		this.app.use(express.json());
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.send('Hello World!');
		});
		productsRouter.init(this.app);
		usersRouter.init(this.app);
		authRouter.init(this.app);
		cartRouter.init(this.app);
	}

	start() {
		this.app.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
