const express = require('express');

const productsRouter = require('./controllers/products/index');

const app = express();

app.use(express.json());
app.use(require('cors'));

productsRouter.init(app);

module.exports = app;
