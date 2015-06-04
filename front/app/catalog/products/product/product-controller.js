catalog.controller('ProductController', function ($scope, product, paymentInfo, Cart) {
	$scope.product = product;
	$scope.currency = paymentInfo.currency;
	$scope.addToCart = Cart.addItem;
});