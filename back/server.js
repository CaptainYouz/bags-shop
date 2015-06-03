var conf 		 = require('nconf'),
	_			 = require('lodash'),
	restify 	 = require('restify'),
	categories	 = require('./models/categories.json'),
	products 	 = require('./models/products.json')

conf.file('conf/aswat_conf.json');

var	server = restify.createServer({ name: conf.get('server:name') });

server.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	return next();
});

var getCategories = function (req, res, next) {
	res.send(categories);
	res.send(200);
	return next();
};

var getCategory = function (req, res, next) {
	var response = _.find(categories, function (categ) {
		return categ.id == req.params.id;
	});

	if (response) {
		res.send(response);
		res.send(200);
	} else {
		res.send(404);
	}
	return next();
};

var getCategoryProducts = function (req, res, next) {
	var response = _.where(products, { 'categoryId' : parseInt(req.params.categoryId) });

	if (response.length > 0) {
		res.send(response);
		res.send(200);
	} else {
		res.send(404);
	}
	return next();
};

var getProducts = function (req, res, next) {
	var response = [];
	var ids = req.params.ids.split('-');

	ids.forEach(function (id) {
		var product = _.find(products, function (pr) { return pr.id == parseInt(id); });
		if (product) response.push(product);
	})

	if (response.length > 0) {
		res.send(response);
		res.send(200);
	} else {
		res.send(404);
	}
	return next();
};

var getProduct = function (req, res, next) {
	var response = _.find(products, function (product) {
		return product.id == req.params.productId;
	});

	if (response) {
		res.send(response);
		res.send(200);
	} else {
		res.send(404);
	}
	return next();
};

server.get('/categories', getCategories);
server.get('/category/:id', getCategory);
server.get('/category/:categoryId/products', getCategoryProducts);
server.get('/products/:ids', getProducts)
server.get('/product/:productId', getProduct);

server.listen(conf.get('server:port'), function() {
	console.log('%s listening at %s', server.name, server.url);
});
