var catalog = angular.module('awsatApp.catalog', ['ui.router']);

catalog.config(function ($stateProvider) {
	$stateProvider.state('catalog', {
		url: 'catalog',
		parent: 'awsatApp',
		views: {
			'content@': {
				templateUrl: 'catalog/catalog.html',
				controller: 'CatalogController'
			}
		}
	});
});