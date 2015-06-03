var app = angular.module('awsatApp', [
	'ui.router',
	'angular-loading-bar',
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
				controller: 'HeaderController'
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

angular.module('myApp', ['angular-loading-bar']).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.latencyThreshold = 050;
}])