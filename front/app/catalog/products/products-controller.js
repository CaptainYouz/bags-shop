catalog.controller('ProductsController', function ($scope, $state, $stateParams, categories, products, paymentInfo) {
	$scope.category = _.find(categories, function (categ) {
		return categ.id == $stateParams.categoryId;
	});
	$scope.currency = paymentInfo.currency;
	$scope.products = products;
});
