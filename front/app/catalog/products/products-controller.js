catalog.controller('ProductsController', function ($scope, $stateParams, categories, products) {
	$scope.category = _.find(categories, function (categ) {
		return categ.id == $stateParams.categoryId;
	});

	$scope.products = products;
});
