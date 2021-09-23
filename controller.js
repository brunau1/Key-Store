// ------ DECLARATIONS --------//
let inputs = {};

let currentPage = '';

let containers = {};

let cart = [];

let templates = [
	{
		name: 'home',
		template:
			`<div id="home">` +
			`<div id="categories">` +
			`<p><b>Categorias</b></p>` +
			`<ul id="categoriesList" type="none">` +
			`</ul></div>` +
			`<div id="productsPanel">` +
			`</div></div>`,
	},
	{
		name: 'cart',
		template:
			`<div id="cart">` +
			`<div class="cartProductsPanel">` +
			`<p><b>Produtos adicionados ao carrinho</b></p>` +
			`<div id="products"></div></div>` +
			`<div class="cartFinish">` +
			`<h3>Total: R$</h3><p>` +
			`Ao finalizar, serão enviadas para o seu email as orientaçãoes para` +
			`concluir sua compra</p>` +
			`<a onclick="finishBuy()"` +
			`class="finishButton">Finalizar compra</a></div></div>`,
	},
	{
		name: 'support',
		template: ``,
	},
	{
		name: 'itemDetail',
		template: `<div id="itemDetail"></div>`,
	},
];

// ------ DINAMIC TEMPLATES ------- //

let dinamicTemplates = [
	{
		name: 'home-products',
		generate: generateProductsPanel,
	},
	{
		name: 'home-categories',
		generate: generateCategoryOptions,
	},
	{
		name: 'itemDetail-product',
		generate: generateProductDetail,
	},
	{
		name: 'cart-products',
		generate: generateCartProductTemplate,
	},
];

function generateProductsPanel() {
	let html = '';
	for (const product of currentProducts) {
		html += `<div class="product">`;
		html += `<a onclick="loadPage('itemDetail', { id: ${product.id} })">`;
		html += `<img class="image" src="images/products/${product.image}" /></a>`;
		html += `<div class="description">`;
		html += `<p><b>Nome: ${product.name}</b></p>`;
		html += `<p>Descrição: ${product.description}</p>`;
		html += `<p>Preço: R$ ${product.price.toString()}</p></div></div>`;
	}
	injectTemplate(html, containers.productsPanel);
}

function generateCategoryOptions() {
	let html = '';
	for (const category of categories) {
		html += `<li><a onClick="filterByCategory('${category}')">${category}</a></li>`;
	}
	injectTemplate(html, containers.categoriesList);
}

function generateProductDetail(product) {
	let html =
		`<div class="itemDetailPanel">` +
		`<img class="productImage" src="images/products/${product.image}" alt="" />` +
		`<div class="detail">` +
		`<p><b>${product.name}</b></p>` +
		`<p>${product.description}</p>` +
		`<p style="font-size: 12px">Preço: R$ ${product.price.toString()}</p>` +
		`<a class="addToCartButton" onclick="addProductToCart(${product.id})">Comprar</a>` +
		`</div></div>`;
	injectTemplate(html, containers.itemDetail);
}

function generateCartProductTemplate() {
	let html = '';
	for (const item of cart) {
		html +=
			`<div class="product">` +
			`<a onclick="loadPage('itemDetail', { id: ${item.product.id} })">` +
			`<img src="images/products/${item.product.image}" alt="imagem"/></a>` +
			`<div class="description">` +
			`<span><b>${item.product.name}</b></span><br />` +
			`<span>${item.product.description}</span><br /><br />` +
			`<span>Preço: R$ ${item.product.price.toString()}</span></div>` +
			`<a onclick="removeFromCart(${item.id})" class="removeButton">X</a></div>`;
	}
	if (html == '') html += 'Carrinho vazio';
	injectTemplate(html, containers.cartProducts);
	const h3 = getElement('#cart > div.cartFinish > h3');
	h3.innerText = `Total: R$ ${getCartTotalPrice()}`;
}

function getCartTotalPrice() {
	let total = 0;
	cart.map((item) => {
		total += item.product.price;
	});
	return total;
}
function addProductToCart(id) {
	const productIndex = products.map((item) => item.id).indexOf(id);
	let lastOfCart = cart.length - 1;
	if (lastOfCart != -1)
		cart.push({ product: products[productIndex], id: ++lastOfCart });
	else cart.push({ product: products[productIndex], id: 0 });
	console.log(cart);
	alert('Produto adicionado ao carrinho.');
}

function removeFromCart(cartId) {
	cart = cart.filter((product) => product.id != cartId);
	const cartProducts = getPropertie('cart-products', dinamicTemplates);
	cartProducts.generate();
}

function filterByCategory(category) {
	currentProducts = [];
	currentProducts = products.filter((product) =>
		product.category.toLowerCase().includes(category)
	);
	currentProducts = !currentProducts.length ? products : currentProducts;
	if (currentPage != 'home') loadPage('home');
	else getPropertie('home-products', dinamicTemplates).generate();
}

// ------- PAGES -------- //

const pages = [
	{
		name: 'home',
		generate: loadHomePage,
	},
	{
		name: 'cart',
		generate: loadCartPage,
	},
	{
		name: 'support',
		generate: () => {},
	},
	{
		name: 'itemDetail',
		generate: loadItemDetail,
	},
];

function loadHomePage(options) {
	currentPage = 'home';
	const home = getPropertie('home', templates);

	injectTemplate(home.template, containers.content);

	const productsPanel = getPropertie('home-products', dinamicTemplates);
	const categoriesList = getPropertie('home-categories', dinamicTemplates);

	currentProducts = products.map((item) => item);

	containers.productsPanel = getElement('#productsPanel');
	containers.categoriesList = getElement('#categoriesList');

	categoriesList.generate();
	productsPanel.generate();
}

function loadItemDetail(options) {
	currentPage = 'itemDetail';
	const id = options.id;
	const itemDetail = getPropertie('itemDetail', templates);

	injectTemplate(itemDetail.template, containers.content);

	containers.itemDetail = getElement('#itemDetail');

	const productPanel = getPropertie('itemDetail-product', dinamicTemplates);

	const index = products.map((item) => item.id).indexOf(id);
	productPanel.generate(products[index]);
}

function loadCartPage(options) {
	currentPage = 'cart';

	const cart = getPropertie('cart', templates);
	injectTemplate(cart.template, containers.content);

	containers.cartProducts = getElement('#products');

	const cartProducts = getPropertie('cart-products', dinamicTemplates);
	cartProducts.generate();
}

function finishBuy() {
	if (getCartTotalPrice() != 0)
		alert(
			'Um email com sua compra será enviado para support@keystore.com. ' +
				'Verifique sua caixa de entrada para seguir os próximos passos.'
		);
	else alert('Nenhum produto selecionado');
}

// ----------- PRODUCTS ----------- //

const products = [
	{
		id: 1,
		name: 'Flower key',
		category: 'cute',
		description:
			'Chave com formato de flor, na cor dourado. Acompanha fechadura.',
		image: '1.jpg',
		price: 5.99,
	},
	{
		id: 2,
		name: 'Latoya kantrele key',
		category: 'medieval',
		description: 'Chave artesanal. Detalhes em bronze. Acompanha fechadura.',
		image: '2.jpg',
		price: 49.99,
	},
	{
		id: 3,
		name: 'Conjunto horse, bomb & men.',
		category: 'kit',
		description:
			'Três chaves com formatos diferentes em aço inox. Acompanha fechadura.',
		image: '3.jpg',
		price: 39.9,
	},
	{
		id: 4,
		name: 'Conjunto medieval keys',
		category: 'kit, medieval',
		description:
			'Três chaves com formatos diferentes em bronze. Acompanha fechadura.',
		image: '4.jpg',
		price: 59.99,
	},
	{
		id: 5,
		name: 'Templars order key',
		category: 'fantasy',
		description:
			'Chave com símbolo da ordem dos templários, na cor azul e prata. Acompanha fechadura.',
		image: '5.jpg',
		price: 9.99,
	},
	{
		id: 6,
		name: 'Axe key',
		category: 'fantasy',
		description:
			'Chave com formato de machado, na cor dourado e prata, com detalhes e metal. Acompanha fechadura.',
		image: '6.jpg',
		price: 14.9,
	},
	{
		id: 7,
		name: 'Heart key',
		category: 'love',
		description: 'Chave e cadeado com formato de coração.',
		image: '7.jpg',
		price: 29.9,
	},
	{
		id: 8,
		name: 'Red love',
		category: 'love',
		description: 'Chave comum com cadeado vermelho em formato de coração.',
		image: '8.jpg',
		price: 11.99,
	},
];

let currentProducts = [];

const categories = ['todos', 'love', 'fantasy', 'kit', 'medieval', 'cute'];

// ------ LISTENER FUNCTIONS --------//

let events = [
	{
		type: 'keyup',
		input: 'search',
		function: filterByNameDescription,
	},
];

function filterByNameDescription(event) {
	currentProducts = [];
	currentProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
			product.description
				.toLowerCase()
				.includes(event.target.value.toLowerCase())
	);
	currentProducts = !currentProducts.length ? products : currentProducts;
	if (currentPage != 'home') loadPage('home');
	else getPropertie('home-products', dinamicTemplates).generate();
}
// ------ GENERAL FUNCTIONS --------//

function getPropertie(value, collection) {
	const index = collection.map((item) => item.name).indexOf(value);
	if (index == -1) return null;
	return collection[index];
}

function getElement(selector) {
	return document.querySelector(selector);
}

// ------ CONTROLLER FUNCTIONS ------- //

function loadPage(name, options = {}) {
	const page = getPropertie(name, pages);
	page.generate(options);
}

function injectTemplate(template, element) {
	element.innerHTML = template;
}

function startEventListeners() {
	events.map((event) => {
		inputs[event.input].addEventListener(event.type, event.function);
	});
}

function init() {
	inputs.search = document.querySelector('#search');
	containers.content = getElement('#content');
	startEventListeners();
	loadPage('home');
}

// ------ FUNCTION CALL --------//

init();
