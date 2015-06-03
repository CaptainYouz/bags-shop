cart.controller('CartController', function ($scope, Cart) {
	$scope.getItems = Cart.getItems;

	$scope.increase = function (item) { Cart.addProduct(item); };
	$scope.decrease = function (item) { Cart.increaseQuantity(item.id); };
});
