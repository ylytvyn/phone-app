'use strict';

(function($){
	$(document).ready(function() {
		var BASE_URL = 'http://localhost:3000',
			$preloader = $('.preload'),
			$list = $('.phones-list');

		$preloader.hide();
		loadPhones();

		// Code
		$('.load').click(function() {
			loadPhones();
		});

		function loadPhones() {
			$list.html('');

			$.ajax({
				type: 'GET',
				url: `${BASE_URL}/phones`,
				beforeSend: () => {
					$preloader.show();
				},
				success: (data) => {
					$.each(data, (i) => {
						var elem = `<li class="col">
										<img src="${data[i].imageUrl}" alt="${data[i].name}">
										<div>
											<h2>${data[i].name}</h2>
											<p>${data[i].snippet}</p>
										</div>
									</li>`;

						$list.append(elem);
					});
				},
				statusCode: {
					404: () => {
						$preloader.hide();
						window.location.href = '../404/index.html';
					}
				}
			}).then(() => {

				setTimeout(() => {
					$preloader.hide();
				}, 500);

			});
		}
	});
})(jQuery);
