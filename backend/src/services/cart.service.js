const Database = require('../database/index');

class CartService {
	get(userId) {
		const cart = Database.find('cart', { userId: userId });
		let products = [];
		if (cart) {
			products = Database.find('products', {}, [
				cart.products.map((product) => product.id),
			]);
		}
		return products;
	}

	addToCart(userId, productId, quantity) {
		const cart = Database.find('cart', { userId: userId });
		if (!cart) Database.create('cart', { userId: userId, products: [] });
		const product = Database.find('products', { id: productId });
		product.quantity -= 1;
		Database.update('products', product);
		cart.products.push({
			id: productId,
			quantity: quantity,
		});
		Database.update('cart', cart);
	}

	removeFromCart(userId, productId) {
		const cart = Database.find('cart', { userId: userId });
		const product = Database.find('products', { id: productId });
		product.quantity += 1;
		Database.update('products', product);
		cart.products = cart.products.filter((product) => product.id !== productId);
		Database.update('cart', cart);
	}
}
