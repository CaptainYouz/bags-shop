var app = angular.module('awsatApp', [
	'ui.router',
	'awsatApp.catalog'
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
			categories: function (Catalog) {
				return Catalog.init();
			}
		}
	});

	$urlRouterProvider.otherwise('/catalog');
});