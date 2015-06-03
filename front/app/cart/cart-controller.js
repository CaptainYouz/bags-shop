cart.controller('CartController', function ($scope, Cart) {
	$scope.items = Cart.getItems();
});
