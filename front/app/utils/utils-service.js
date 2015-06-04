app.factory('Utils', function ($http, $state) {
	return {
		goToCartPopUp: function (product) {
			swal({
				imageUrl: product.imgUrl,
				title: 'Well done !',
				text: product.name + ' is now in your cart',
				showCancelButton: true,
				type: 'success',
				cancelButtonText: 'Continue shopping',
				confirmButtonColor: '#3f3f3f',
				confirmButtonText: 'Proceed to checkout',
				closeOnConfirm: true
			},
			function () {
				$state.go('cart');
			});
		},
		removeItemPopUp: function (item, callback) {
			swal({
				imageUrl: item.product.imgUrl,
				title: 'Are you sure ?',
				type: 'warning',
				text: 'Do you really want to remove ' + item.product.name + ' from your cart ?',
				showCancelButton: true,
				cancelButtonText: 'No',
				confirmButtonText: 'Yes',
				confirmButtonColor: '#3f3f3f',
				closeOnConfirm: true
			}, callback);
		}
	};
});