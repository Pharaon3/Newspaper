jQuery(document).ready(function() {
    wpcf7_redirect_mailsent_handler();
});

function wpcf7_redirect_mailsent_handler() {
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		form = wpcf7_redirect_forms [ event.detail.contactFormId ];

		// Script to run after sent.
		if ( form.after_sent_script ) {
			form.after_sent_script = htmlspecialchars_decode( form.after_sent_script );
			eval( form.after_sent_script );
		}

		// Set redirect URL
		if ( form.use_external_url && form.external_url ) {
			redirect_url = form.external_url;
		} else {
			redirect_url = form.thankyou_page_url;
		}

		// Build http query
		if ( form.http_build_query ) {
			temp_http_query 	 = jQuery.param( event.detail.inputs, true );
			http_query = temp_http_query.replace(new RegExp('\\+', 'g'), '%20');
			redirect_url = redirect_url + '?' + decodeURIComponent(http_query);
		} else if ( form.http_build_query_selectively ) {
			http_query = '?';
			selective_fields = form.http_build_query_selectively_fields.split(' ').join('');
			event.detail.inputs.forEach( function(element, index) {
				if ( selective_fields.indexOf( element.name ) != -1 ) {
					http_query += element.name + '=' + element.value + '&';
				}
			});

			http_query = http_query.slice(0, -1);
			redirect_url = redirect_url + decodeURIComponent(http_query);
		} 

		// Redirect
		if ( redirect_url ) {
			if ( ! form.open_in_new_tab ) {
				// Open in current tab
				if ( form.delay_redirect ) {
					setTimeout(function() {
						location.href = redirect_url;
					}, form.delay_redirect);
				} else {
					location.href = redirect_url;
				}
			} else {
				// Open in external tab
				if ( form.delay_redirect ) {
					setTimeout(function() {
						window.open( redirect_url );
					}, form.delay_redirect);
				} else {
					window.open( redirect_url );
				}
			}
		}

	}, false );
}

function htmlspecialchars_decode( string ) {
	var map = {
        '&amp;': '&',
        '&#038;': "&",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "’",
        '&#8216;': "‘",
        '&#8211;': "–",
        '&#8212;': "—",
        '&#8230;': "…",
        '&#8221;': '”'
    };

    return string.replace(/\&[\w\d\#]{2,5}\;/g, function(m) { return map[m]; });
}
