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
		url: '/category/:categoryId',
		parent: 'catalog',
		views: {
			'content@': {
				templateUrl: 'catalog/products/products.html',
				controller: 'ProductsController'
			}
		},
		resolve: {
			products : function ($stateParams, Catalog) {
				return Catalog.getProducts($stateParams.categoryId);
			}
		}
	})
	.state('product', {
		url: '/product/:productId',
		parent: 'products',
		views: {
			'content@': {
				templateUrl: 'catalog/products/product/product.html',
				controller: 'ProductController'
			}
		},
		resolve: {
			product: function ($stateParams, Catalog) {
				return Catalog.getProduct($stateParams.categoryId, $stateParams.productId);
			}
		}
	});
});