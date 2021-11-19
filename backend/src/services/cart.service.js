const Database = require('../database/index');

class CartService {
	static async get(userId) {
		const [cart] = await Database.find('cart', { userId: userId });
		let products = [];
		if (cart && cart.products) {
			products = await Database.find(
				'products',
				{},
				cart.products.map((product) => product.id)
			);
		}
		return products;
	}

	static async getTotal(userId) {
		const [cart] = await Database.find('cart', { userId: userId });
		console.log('cart: ', cart, 'user:', userId);
		let total = 0;
		const products = await this.get(userId);
		console.log('products found:', products);
		if (cart && cart.products.length) {
			total = products.reduce((acc, product) => {
				const index = cart.products
					.map((product) => product.id)
					.indexOf(product.id);
				return acc + product.price * cart.products[index].quantity;
			}, 0);
		}
		return { total, products: products };
	}

	static async addToCart(userId, productId, quantity) {
		const [cart] = await Database.find('cart', { userId: userId });
		if (!cart) await Database.create('cart', { userId: userId, products: [] });
		const product = await Database.find('products', { id: productId });
		product.quantity -= 1;
		await Database.update('products', product);
		cart.products.push({
			id: productId,
			quantity: quantity,
		});
		await Database.update('cart', cart);
	}

	static async removeFromCart(userId, productId) {
		const [cart] = await Database.find('cart', { userId: userId });
		const product = await Database.find('products', { id: productId });
		product.quantity += 1;
		await Database.update('products', product);
		cart.products = cart.products.filter((product) => product.id !== productId);
		await Database.update('cart', cart);
	}

	static async checkout(userId) {
		const cart = await Database.find('cart', { userId: userId });
		const products = await Database.find('products', {}, [
			cart.products.map((product) => product.id),
		]);
		products.forEach(async (product) => {
			product.quantity -= 1;
			await Database.update('products', product);
		});
		await Database.delete('cart', { userId: userId });
	}
}

module.exports = CartService;
