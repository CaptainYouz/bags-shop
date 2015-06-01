app.factory('Catalog', function ($http) {
	_categories = [];

	return {
		init: function () {
			_categories = [
				{ "id": 1, "name": "backpacks", "imgUrl" : "http://i2.cdscdn.com/pdt2/3/9/4/1/700x700/qua2009994898394/rw/sac-a-dos-toile-look-vintage-desert-canvas-ba.jpg" },
				{ "id": 2, "name": "travel bag", "imgUrl": "http://www.gandy.fr/media/catalog/product/cache/2/image/5e06319eda06f020e43594a9c230972d/s/a/sac-de-voyage-eastpak-trunk-dos_1_1.jpg" },
				{ "id": 3, "name": "shoulder bags", "imgUrl": "http://www.ecanvasbags.com/2579/canvas-shoulder-bags-for-women-13-inch-laptop-bag-coffee-black-.jpg"},
				{ "id": 2, "name": "travel bag", "imgUrl": "http://www.gandy.fr/media/catalog/product/cache/2/image/5e06319eda06f020e43594a9c230972d/s/a/sac-de-voyage-eastpak-trunk-dos_1_1.jpg" },
			];

			// @todo: fetch categories from server
			return _categories;
		},
		getProducts: function () {
		},
		getCategories: function () {
			return _categories;
		}
	};
});