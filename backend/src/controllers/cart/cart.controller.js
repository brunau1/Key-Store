const CartService = require('../../services/cart.service');

class CartController {
	async get(req, res) {
		const { userId } = req.params;
		console.log('user:', userId);
		const cart = await CartService.getTotal(userId);
		res.status(200).send(cart);
	}
	async create(req, res) {
		const { userId, productId, quantity } = req.body;
		await CartService.addToCart(userId, productId, quantity);
		res.status(201).send('created');
	}

	async delete(req, res) {
		const { userId, productId } = req.params;
		await CartService.removeFromCart(userId, productId);
		res.status(201).send('deleted');
	}
}

module.exports = new CartController();
