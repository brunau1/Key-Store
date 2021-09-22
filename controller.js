// ------ DECLARATIONS --------//

const inputs = {
	search: document.querySelector('#search'),
};

const templates = [
	{
		name: 'home',
		template: ``,
	},
	{
		name: 'cart',
		template: ``,
	},
	{
		name: 'support',
		template: ``,
	},
	{
		name: 'itemDetail',
		template: ``,
	},
];

// ------ DINAMIC TEMPLATES ------- //

const dinamicTemplates = [
	{
		name: 'home-products',
		generator: generateProductsTemplate,
	},
	{
		name: 'home-categories',
		generator: null,
	},
];

function generateProductsTemplate() {
	const html = ``;
	for (const product of currentProducts) {
	}
}

const pages = [
	{
		name: 'home',
		events: [
			{
				type: 'keydown',
				input: 'search',
				function: searchScript,
			},
		],
		template: {
			static: getPropertie('home', templates),
			dinamic: {
				products: '',
			},
		},
		loadFunction: () => {},
	},
	{
		name: 'cart',
		events: [],
		template: {
			static: getPropertie('cart', templates),
			dinamic: {
				products: '',
			},
		},
		loadFunction: () => {},
	},
	{
		name: 'support',
		events: [],
		template: {
			static: getPropertie('support', templates),
			dinamic: {
				products: '',
			},
		},
		loadFunction: () => {},
	},
	{
		name: 'itemDetail',
		events: [],
		template: {
			static: getPropertie('itemDetail', templates),
			dinamic: {
				products: '',
			},
		},
		loadFunction: () => {},
	},
];

const products = [
	{
		name: 'Flower key',
		category: 'cute',
		description:
			'Chave com formato de flor, na cor dourado. Acompanha fechadura.',
		image: 'images/products/1.png',
		price: 5.99,
	},
	{
		name: 'Latoya kantrele key',
		category: 'medieval',
		description: 'Chave artesanal. Detalhes em bronze. Acompanha fechadura.',
		image: 'images/products/2.png',
		price: 49.99,
	},
	{
		name: 'Conjunto horse, bomb & men.',
		category: 'kit',
		description:
			'Três chaves com formatos diferentes em aço inox. Acompanha fechadura.',
		image: 'images/products/3.png',
		price: 39.9,
	},
	{
		name: 'Conjunto medieval keys',
		category: 'kit, medieval',
		description:
			'Três chaves com formatos diferentes em bronze. Acompanha fechadura.',
		image: 'images/products/4.png',
		price: 59.99,
	},
	{
		name: 'Templars order key',
		category: 'fantasy',
		description:
			'Chave com símbolo da ordem dos templários, na cor azul e prata. Acompanha fechadura.',
		image: 'images/products/5.png',
		price: 9.99,
	},
	{
		name: 'Axe key',
		category: 'fantasy',
		description:
			'Chave com formato de machado, na cor dourado e prata, com detalhes e metal. Acompanha fechadura.',
		image: 'images/products/6.png',
		price: 14.9,
	},
	{
		name: 'Heart key',
		category: 'love',
		description: 'Chave e cadeado com formato de coração.',
		image: 'images/products/7.png',
		price: 29.9,
	},
	{
		name: 'Red love',
		category: 'love',
		description: 'Chave comum com cadeado vermelho em formato de coração.',
		image: 'images/products/8.png',
		price: 11.99,
	},
];

let currentProducts = [];

// ------ LISTENER FUNCTIONS --------//

function searchScript(event) {
	currentProducts = [];
	currentProducts = products.filter(
		(product) =>
			product.name.includes(event.target.value) ||
			product.description.includes(event.target.value)
	);
}

// ------ INIT FUNCTIONS ------- //

function startEventListeners() {
	for (const page of pages) {
		page.events.map((event) => {
			inputs[event.input].addEventListener(event.type, event.function);
		});
	}
}

// ------ GENERAL FUNCTION --------//

function getPropertie(value, collection) {
	const index = collection.map((item) => item.name).indexOf(value);
	if (!index || index == 1) return null;
	return collection[index];
}

// ------ FUNCTION CALL --------//
startEventListeners();
