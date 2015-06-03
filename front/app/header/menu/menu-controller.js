app.controller('MenuController', function ($scope, categories, Cart) {
	$scope.categories = categories;
	$scope.getItemsNb = Cart.getTotalItemsNb;
});
