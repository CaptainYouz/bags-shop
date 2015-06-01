catalog.factory('Catalog', function ($http) {
	_categories = [];
	_products   = [];

	return {
		init: function () {
			return $http.get('@@api/categories').then(function (res) {
				_categories = res.data;
				return _categories;
			});
		},
		getCategories: function () {
			return _categories;
		},
		getProducts: function (categoryId) {
			var products = _.find(_products, function (product) {
				return product.id == categoryId;
			});

			if (products) {
				return products.elements;
			} else {
				return $http.get('@@api/products/' + categoryId).then(function (res) {
					_products.push({ id: categoryId, elements : res.data });
					return res.data;
				});
			}
		},
		getProduct: function (categoryId, productId) {
			if (_products.length > 0) {
				var products = _.find(_products, function (product) {
					return product.id == categoryId;
				});
				var product = _.find(products.elements, function (product) {
					return product.id == productId;
				});

				if (product) return product;
			} else {
				return $http.get('@@api/product/' + productId).then(function (res) {
					return res.data;
				});
			}
		}
	};
});