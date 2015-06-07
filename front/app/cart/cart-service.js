/*
	In this service, i return a full object
	See catalogService to see another possible implementation of services
*/
cart.factory('CartService', function ($http, $state, Utils) {
	var Cart = {
		items: [],
		nbItems: 0,
		totalPrice: 0,
		discountCode: false,
		paymentInfo: {},
		removeStoredCart: function () { window.localStorage.removeItem('aswatCart'); },
		storeCurrentCart: function () {
			if (Cart.nbItems > 0) window.localStorage.setItem('aswatCart', JSON.stringify(Cart.items));
			else Cart.removeStoredCart();
		},
		setDiscountCode: function (discountCode) {
			if (discountCode && discountCode != '') {
				Cart.discountCode = _.find(Cart.paymentInfo.dicountCodes, function (code) {
					return code.name == discountCode.toLowerCase();
				});
			}

			return Cart.discountCode;
		},
		getTotalCartPrice: function (shippingPrice) {
			var withoutTaxs = Cart.totalPrice + shippingPrice;
			var tax = withoutTaxs / Cart.paymentInfo.taxPercentage;
			var discount = (Cart.discountCode) ? ((Cart.discountCode.percentage / 100) * withoutTaxs) : 0;

			return Math.round((withoutTaxs + tax - discount) * 100) / 100;
		},
		getTotalItemsPrice: function () { return Cart.totalPrice; },
		getTotalItemsNb: function () { return Cart.nbItems; },
		getItems: function () { return Cart.items; },
		getItem: function (itemId) {
			return _.find(Cart.items, function (it) { return it.id == itemId; })
		},
		initItems: function (items) {
			var ids = _.pluck(items, 'id').join('-');

			if (ids) {
				// we retreive products from ids stored in localStorage
				return $http.get('@@api/products/' + ids).then(
					function (res) {
						var products = res.data;

						// for each stored item
						items.forEach(function (item) {
							// - we check if the product exist and if quantity is ok
							var product = _.find(products, function (product) { return product.id == item.id; });
							item.quantity = isNaN(item.quantity) ? 1 : item.quantity;

							if (product) {
								// - we put it item in items list
								Cart.items.push(item);
								// - we save the complete detail of the product,
								item.product = product;
								// - we calculate the total price of the current item (productPrice * nbItems)
								item.totalPrice = item.product.price * item.quantity;
								// - we update the total price of the cart
								Cart.totalPrice += item.totalPrice;
								// - we update the total numbers of items
								Cart.nbItems += item.quantity;
							}
						});

						// finally, we save cart to keep the localstorage value clean
						Cart.storeCurrentCart();
						return Cart;
					},
					function (res) {
						Utils.errorPopUp('Sorry, something went wrong with your cart.');
						Cart.removeStoredCart();
						return Cart;
					}
				);
			} else return Cart;
		},
		addItem: function (product, showPopup) {
			var item = Cart.getItem(product.id);

			if (item) {
				item.quantity++;
				item.totalPrice += item.product.price;
			} else {
				Cart.items.push({
					id: product.id,
					quantity: 1,
					product: product,
					totalPrice: product.price
				});
			}

			Cart.nbItems++;
			Cart.totalPrice += product.price || item.product.price;
			Cart.storeCurrentCart();

			if (showPopup) Utils.goToCartPopUp(product);
		},
		decreaseItemQuantity: function (itemId) {
			var item = Cart.getItem(itemId);

			if (item.quantity > 1) {
				item.quantity--;
				item.totalPrice -= item.product.price;
				Cart.totalPrice -= item.product.price;
				Cart.nbItems--;
			}

			Cart.storeCurrentCart();
		},
		removeItem: function (item, callback) {
			var removeCallback = function () {
				var removedItem = _.remove(Cart.items, function (it) { return it.id == item.id; });

				Cart.nbItems -= removedItem[0].quantity;
				Cart.totalPrice -= removedItem[0].product.price * removedItem[0].quantity;
				Cart.storeCurrentCart();
				callback();
			};

			Utils.removeItemPopUp(item, removeCallback);
		}
	};

	return {
		init: function () {
			jsonStoredCart = window.localStorage.getItem('aswatCart');

			try {
				if (jsonStoredCart) {
					var storedCart = JSON.parse(jsonStoredCart);
					return (storedCart && storedCart.length) ? Cart.initItems(storedCart) : Cart;
				} else {
					return Cart;
				}
			} catch (e) {
				Utils.errorPopUp('Sorry, something went wrong with your cart.');
				Cart.removeStoredCart();
				return Cart;
			}
		},
		getPaymentInfo: function () {
			return $http.get('@@api/paymentInformations').then(function (res) {
				Cart.paymentInfo = res.data;
				return Cart.paymentInfo;
			});
		}
	};
});