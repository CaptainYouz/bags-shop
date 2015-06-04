catalog.controller('ProductsController', function ($scope, $state, $stateParams, categories, products) {
	$scope.category = _.find(categories, function (categ) {
		return categ.id == $stateParams.categoryId;
	});

	$scope.products = products;
});
