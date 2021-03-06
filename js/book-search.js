$(function(){

	$('#search-term').focus(function() {
		$(this).val('');
		$('main').empty();
	});

	$('#search-button').click(function(){

		$('main').empty();

		var term = $('#search-term').val();
		var url = 'https://www.googleapis.com/books/v1/volumes?q='+term;

		$.ajax({
			type: 'GET', 
			url: url,
			success: function (returnedData){
				// console.log(returnedData);


			$.each(returnedData.items, function(i, book) {

						if (book.volumeInfo.imageLinks) {
							var imageLink = book.volumeInfo.imageLinks.thumbnail;
						} else {
							var imageLink = 'http://fillmurray.com/100/100';
						}

						if (book.volumeInfo.authors) {
							var author = book.volumeInfo.authors[0];
						} else {
							var author = 'unknown';
						}

						if (book.volumeInfo.title) {
							var title = book.volumeInfo.title;
						} else {
							var title = 'unknown';
						}


					var ele = '<div>'+
							  '<a href="'+book.volumeInfo.previewlink+'">'+
								'<img src="'+imageLink+'">'+
								'<p>'+book.volumeInfo.title+'<br>'+
								book.volumeInfo.authors[0]+'</p>'+
							 '</a>'+
							  '</div>';  
					$('main').append(ele);
				});




			},
			error: function(jqXHR, textStatus, error) {
				console.log(jqXHR, textStatus, error);
			}
		});


	});


});