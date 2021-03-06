var app = angular.module('awsatApp', [
	'ui.router',
	'ui.bootstrap',
	'angular-loading-bar',
	'angularUtils.directives.uiBreadcrumbs',
	'awsatApp.catalog',
	'awsatApp.cart'
]);

app.config(function ($urlRouterProvider, $stateProvider) {
	$stateProvider.state('awsatApp', {
		url: '/',
		abstract: true,
		views : {
			'header': {
				templateUrl: 'header/header.html',
			},
			'menu@awsatApp': {
				templateUrl: 'header/menu/menu.html',
				controller: 'MenuController'
			},
			'footer' : {
				templateUrl: 'footer/footer.html'
			}
		},
		resolve: {
			paymentInfo: function (CartService) {
				return CartService.getPaymentInfo();
			},
			Cart: function (CartService) {
				return CartService.init();
			},
			categories: function (CatalogService) {
				return CatalogService.init();
			}
		}
	});

	$urlRouterProvider.otherwise('/catalog');
});