'use strict';

(function($){
	$(document).ready(function() {
		var BASE_URL = 'http://localhost:3000',
			$preloader = $('.preload'),
			$list = $('.phones-list'),
			$createBtn = $('.create');

		$preloader.hide();
		loadPhones();

		// Events
		$('.load').click(function() {
			loadPhones();
		});

		$('.create').click(function() {
			var newPhone = {};

			$('.field').each(function() {
				newPhone[this.name] = this.value;

				this.value = '';
			});

			newPhone.age = Number($('.phones-list li').length);

			addPhone(newPhone);
		});

		$('.field').on('blur', function() {

			if (this.value !== '') {
				$createBtn.prop('disabled', false);
			} else {
				$createBtn.prop('disabled', true);
			}

		});

		// Functions

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
											<i class="delete" data-id="${data[i].id}">Delete</i>
										</div>
									</li>`;

						$list.append(elem);
					});

					$('.delete').click(function() {
						deletePhone($(this).data('id'));
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

		function deletePhone(id) {
			var answer = confirm('Are you sure?');

			if (answer) {

				$.ajax({
					type: 'DELETE',
					url: `${BASE_URL}/phones/${id}`,
					beforeSend: () => {
						$preloader.show();
					}
				}).then(() => {
					loadPhones();
				});

			}
		}

		function addPhone(data) {
			$.ajax({
				type: 'POST',
				url: `${BASE_URL}/phones`,
				data: data,
				beforeSend: () => {
					$preloader.show();
				}
			}).then(() => {
				loadPhones();
				$createBtn.prop('disabled', true);
			});
		}
	});
})(jQuery);
