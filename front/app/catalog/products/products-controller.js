catalog.controller('ProductsController', function ($scope, $state, $stateParams, category, products, paymentInfo) {
	$scope.category = category;
	$scope.currency = paymentInfo.currency;
	$scope.products = products;
});
