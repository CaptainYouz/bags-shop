catalog.controller('ProductController', function ($scope, product, Cart) {
	$scope.product = product;
	$scope.addToCart = Cart.addProduct;
});