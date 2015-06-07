catalog.controller('ProductsController', function ($scope, category, products, paymentInfo) {
	$scope.category = category;
	$scope.products = products;
	$scope.currency = paymentInfo.currency;
});
