class CartController {
	addToCart(product) {
		this.cartService.addToCart(product);
	}

	removeFromCart(product) {
		this.cartService.removeFromCart(product);
	}

	checkout() {
		this.$state.go('checkout');
	}
}

module.exports = new CartController();
