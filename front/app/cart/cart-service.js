cart.factory('CartService', function ($http) {
	var Cart = {
		items: [],
		nbItems: 0,
		totalPrice: 0,
		getTotalItemsNb: function () { return Cart.nbItems; },
		getItems: function () { return Cart.items; },
		initItems: function (items) {
			Cart.items = items;
			var ids = _.pluck(Cart.items, 'id').join('-');

			// we retreive products from ids stored in localStorage
			return $http.get('@@api/products/' + ids).then(function (res) {
				var products = res.data;

				// for each items in the cart we set
				Cart.items.forEach(function (item) {
					// - the complete detail of the product,
					item.product = _.find(products, function (product) { return product.id == item.id; });
					// - the total price of the current item (productPrice * nbItems)
					item.totalPrice = item.product.price * item.quantity;
					// - the total price of the cart
					Cart.totalPrice += item.totalPrice;
					// - the total numbers of items
					Cart.nbItems += item.quantity;
				});

				return Cart;
			});
		},
		addProduct: function (product) {
			var item = _.find(Cart.items, function (it) { return it.id == product.id; });

			if (item) {
				item.quantity++;
				item.totalPrice += item.product.price;
			}
			else {
				Cart.items.push({
					id: product.id,
					quantity: 1,
					product: product,
					totalPrice: product.price
				});
			}

			Cart.nbItems++;
			window.localStorage.setItem('aswatCart', JSON.stringify(Cart.items));
		}
	};

	return {
		init: function () {
			localStorageCart = window.localStorage.getItem('aswatCart');
			return (localStorageCart) ? Cart.initItems(JSON.parse(localStorageCart)) : Cart;
		}
	};
});