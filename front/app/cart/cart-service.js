cart.factory('CartService', function ($http, $state, Utils) {
	var Cart = {
		items: [],
		nbItems: 0,
		totalPrice: 0,
		storeCurrentCart: function () {
			window.localStorage.setItem('aswatCart', JSON.stringify(Cart.items));
		},
		getTotalItemsNb: function () {
			return Cart.nbItems;
		},
		getItems: function () {
			return Cart.items;
		},
		getItem: function (itemId) {
			return _.find(Cart.items, function (it) { return it.id == itemId; })
		},
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
		addItem: function (product, showPopup) {
			var item = Cart.getItem(product.id);

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
			Cart.storeCurrentCart();

			if (showPopup) Utils.goToCartPopUp(product);
		},
		decreaseItemQuantity: function (itemId) {
			var item = Cart.getItem(itemId);

			if (item.quantity > 1) {
				item.quantity--;
				item.totalPrice -= item.product.price;
				Cart.nbItems--;
			}

			Cart.storeCurrentCart();
		},
		removeItem: function (item, callback) {
			var removeCallback = function () {
				var removedItem = _.remove(Cart.items, function (it) { return it.id == item.id; });
				Cart.nbItems -= removedItem[0].quantity;
				Cart.storeCurrentCart();
				callback();
			};

			Utils.removeItemPopUp(item, removeCallback);
		}
	};

	return {
		init: function () {
			localStorageCart = window.localStorage.getItem('aswatCart');
			return (localStorageCart) ? Cart.initItems(JSON.parse(localStorageCart)) : Cart;
		}
	};
});