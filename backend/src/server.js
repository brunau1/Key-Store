const express = require('express');
const productsRouter = require('./controllers/products/index');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
	res.send('Hello World!');
});
app.use('/products', productsRouter);
module.exports = app;
