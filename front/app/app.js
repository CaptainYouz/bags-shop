var app = angular.module('awsatApp', [
	'ui.router',
	'awsatApp.catalog'
]);

app.config(function ($urlRouterProvider, $stateProvider) {
	$stateProvider.state('awsatApp', {
		url: '/',
		abstract: true,
		views : {
			'header' : {
				templateUrl: 'header/header.html',
				controller: 'HeaderController'
			},
			'footer' : {
				templateUrl: 'footer/footer.html'
			}
		}
	});

	$urlRouterProvider.otherwise('/catalog');
});
