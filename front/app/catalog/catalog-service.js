/*
	In this service, i return some functions
	See cartService to see another possible implementation of services
*/
catalog.factory('CatalogService', function ($http, $state, Utils) {
	_categories = [];
	_products   = [];

	return {
		init: function () {
			return $http.get('@@api/categories').then(function (res) {
				_categories = res.data;
				return _categories;
			});
		},
		getCategories: function () { return _categories; },
		getProducts: function (categoryId) {
			// first, we look if we already have the category
			var products = _.find(_products, function (product) {
				return product.id == categoryId;
			});

			if (products) { // if yes, we return it
				return products.elements;
			} else {
				// if not, we try to fetch it from the server and handle the response
				return $http.get('@@api/category/' + categoryId + '/products').then(
					function (res) {
						_products.push({ id: categoryId, elements : res.data });
						return res.data;
					},
					function (res) {
						Utils.errorPopUp('Sorry, an error occured');
						$state.go('catalog');
					}
				);
			}
		},
		getProduct: function (categoryId, productId) {
			var product = false;

			// first, we look if we already have the product
			if (_products.length > 0) {
				var products = _.find(_products, function (product) {
					return product.id == categoryId;
				});
				product = _.find(products.elements, function (product) {
					return product.id == productId;
				});
			}

			if (product) { // if yes, we return it
				return product;
			} else {
				// if not, we try to fetch it from the server and handle the response
				return $http.get('@@api/product/' + productId).then(
					function (res) { return res.data; },
					function () {
						Utils.errorPopUp('Sorry, an error occured');
						$state.go('catalog');
					}
				);
			}
		}
	};
});