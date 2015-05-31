app.factory('Menu', function ($http) {
	_categories = [];

	return {
		init: function () {
			_categories = [
				{ "id": 1, "name": "backpacks" },
				{ "id": 2, "name": "travel bag" },
				{ "id": 3, "name": "shoulder bags"}
			];

			// @todo: fetch categories from server
			return _categories;
		},
		getCategories: function () {
			return _categories;
		}
	};
});