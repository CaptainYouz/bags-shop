var conf 		 = require('nconf'),
	_			 = require('lodash'),
	restify 	 = require('restify'),
	categories	 = require('./models/categories.json'),
	products 	 = require('./models/products.json')

conf.file('conf/aswat_conf.json');

var	server = restify.createServer({ name: conf.get('server:name') });

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

var getProducts = function (req, res, next) {
	var response = _.where(products, { 'categoryId' : parseInt(req.params.categoryId) });

	if (response.length > 0) {
		res.send(response);
		res.send(200);
	} else {
		res.send(404);
	}
	return next();
};

server.get('/categories', getCategories);
server.get('/category/:id', getCategory);
server.get('/products/:categoryId', getProducts);

server.listen(conf.get('server:port'), function() {
	console.log('%s listening at %s', server.name, server.url);
});
