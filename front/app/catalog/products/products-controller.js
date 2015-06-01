catalog.controller('ProductsController', function ($scope, $stateParams, categories) {
	$scope.category = _.find(categories, function (categ) {
		return categ.id == $stateParams.categoryId;
	});
});
