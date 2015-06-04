catalog.controller('ProductController', function ($scope, $rootScope, product, Cart) {
	$scope.product = product;
	$scope.addToCart = Cart.addItem;
});