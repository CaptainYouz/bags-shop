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
		},
		data: {
			breadcrumbLabel: 'Categories'
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
			category: function ($stateParams, categories) {
				return _.find(categories, function (categ) {
					return categ.id == $stateParams.categoryId;
				});
			},
			products: function ($stateParams, CatalogService) {
				return CatalogService.getProducts($stateParams.categoryId);
			}
		},
		data: {
			breadcrumbLabel: '{{ category.name }}'
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
			product: function ($stateParams, CatalogService) {
				return CatalogService.getProduct($stateParams.categoryId, $stateParams.productId);
			}
		},
		data: {
			breadcrumbLabel: '{{ product.name }}'
		}
	});
});