cart.controller('CartController', function ($scope, Cart) {
	$scope.getItems = Cart.getItems;

	$scope.increase = function (item) { Cart.addItem(item); };
	$scope.decrease = function (item) { Cart.decreaseItemQuantity(item.id); };
	$scope.remove   = function (item) {
		Cart.removeItem(item, function () { $scope.$apply(); });
	};
});
