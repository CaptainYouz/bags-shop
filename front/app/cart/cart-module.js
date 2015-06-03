var cart = angular.module('awsatApp.cart', ['ui.router']);

cart.config(function ($stateProvider) {
	$stateProvider
	.state('cart', {
		url: 'cart',
		parent: 'awsatApp',
		views: {
			'content@': {
				templateUrl: 'cart/cart.html',
				controller: 'CartController'
			}
		}
	});
});