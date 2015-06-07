cart.controller('CartController', function ($scope, paymentInfo, Cart, Utils) {
	$scope.paymentInfo        = paymentInfo;
	$scope.shippingMethod     = paymentInfo.shippingMethods[0];
	$scope.discountCode       =	'';
	$scope.discount		 	  = false;

	$scope.getItems           = Cart.getItems;
	$scope.getTotalItemsPrice = Cart.getTotalItemsPrice;
	$scope.getTotalCartPrice  = Cart.getTotalCartPrice;

	$scope.setDiscountCode    = function () {
		$scope.discount = Cart.setDiscountCode($scope.discountCode);

		if (!$scope.discount) Utils.errorPopUp('Sorry, your code is not valid !');
		else {
			Utils.successPopUp('You have now a ' + $scope.discount.percentage + '% discount');
			$scope.showDiscountMsg = true;
		}
	};

	$scope.increase  = function (item) { Cart.addItem(item); };
	$scope.decrease  = function (item) { Cart.decreaseItemQuantity(item.id); };
	$scope.remove    = function (item) { Cart.removeItem(item, $scope.$apply) };

	$scope.easterEag = function () {
		Utils.specialMessagePopUp(
			'Hi Aswat Team !',
			'<br/>Unfortunately, it ends here... :(<br/><br/>I hope you enjoyed to shop some bags !<br/><br/>And i also hope to see you all soon in Dubaï ;) <br/><br/>Anas.',
			'Hire me'
		);
	}
});
