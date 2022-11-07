(function( $ ) {
	'use strict';
	$(document.body).on('click', '#cf7cstmzr_frontend_togler', function() {
		var control = $(this);
		var settings = $('#cf7cstmzr_frontend');

		settings.toggleClass('active');
		control.hide();
	});

	$(document.body).on('click', '.cf7cstmzr_form_frontend_link', function(e) {
		event.preventDefault();

		var url = $(this).attr('href');
		var form = $(this).data('form');
		var data = {
			action: 'cf7cstmzr_cache_form',
			form: form
		};

		$.ajax({
			type: 'post',
			url: cf7cstmzrJsObj.ajaxurl,
			data: data,
			success: function (response) {
				var decoded;

				try {
					decoded = $.parseJSON(response);
				} catch(err) {
					console.log(err);
					decoded = false;
				}

				if (decoded) {
					if (decoded.success) {
						window.open(url, '_blank');
					} else {
						if (decoded.message) {
							alert(decoded.message);
						}
					}
				} else {
					alert('Something went wrong');
				}
			}
		});
	});

	$(document.body).on('click', '#cf7cstmzr_form_frontend_togler', function() {
		var control = $('#cf7cstmzr_frontend_togler');
		var settings = $('#cf7cstmzr_frontend');

		if (settings.hasClass('active')) {
			settings.removeClass('active');
			setTimeout(function() {
				control.show();
			}, 600);
		} else {
			settings.addClass('active');
			control.hide();
		}
	});
	$(document.body).on('click', '#cf7cstmzr_frontend_close', function() {
		var control = $(this);
		var open = $('#cf7cstmzr_frontend_togler');
		var settings = $('#cf7cstmzr_frontend');

		settings.toggleClass('active');

		setTimeout(function() {
			open.show();
		}, 600);
	});
	$(document.body).on('click', '#cf7cstmzr_frontend_save', function() {
		var control = $(this);
		var loadBodyTag = $('#cf7cstmzr_frontend_load-body-tag').is(':checked');
		var postId = control.data('post');
		var data = {
			action: 'cf7cstmzr_frontend_save',
			loadBodyTag: loadBodyTag,
			postId: postId
		};

		$.ajax({
			type: 'post',
			url: cf7cstmzrJsObj.ajaxurl,
			data: data,
			success: function (response) {
				var decoded;

				try {
					decoded = $.parseJSON(response);
				} catch(err) {
					console.log(err);
					decoded = false;
				}

				if (decoded) {
					if (decoded.success) {
						if (decoded.message) {
							alert(decoded.message);
						}

						window.location.reload();
					} else {
						if (decoded.message) {
							alert(decoded.message);
						}
					}
				} else {
					alert('Something went wrong');
				}
			}
		});
	});
})( jQuery );
