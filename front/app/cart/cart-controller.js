cart.controller('CartController', function ($scope, paymentInfo, Cart) {
	$scope.currency = paymentInfo.currency;
	$scope.getItems = Cart.getItems;
	$scope.getTotalCartPrice = Cart.getTotalCartPrice;
	$scope.increase = function (item) { Cart.addItem(item); };
	$scope.decrease = function (item) { Cart.decreaseItemQuantity(item.id); };
	$scope.remove   = function (item) {
		Cart.removeItem(item, function () { $scope.$apply(); });
	};
});
