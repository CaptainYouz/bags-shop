var catalog = angular.module('awsatApp.catalog', ['ui.router']);

catalog.config(function ($stateProvider) {
	$stateProvider
	.state('catalog', {
		url: 'catalog',
		parent: 'awsatApp',
		views: {
			'content@': {
				templateUrl: 'catalog/catalog.html',
				controller: 'CatalogController'
			}
		}
	})
	.state('products', {
		url: '/products/:categoryId',
		parent: 'catalog',
		views: {
			'content@': {
				templateUrl: 'catalog/products/products.html',
				controller: 'ProductsController'
			}
		}
	});
});