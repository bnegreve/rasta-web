
function predict(img){
    $.ajax({
	type: 'GET',
	url: 'http://localhost:4002/',
	crossDomain: true,
	data: { type: "predict",
		imageurl: img},
	cache: false,  
    	success: function( data ) {
	    $("#the-image").css('visibility', 'visible')

	    str  = "<img src=\"" + img + "\">";
	    str += '<figcaption class="over-top">';
	    str += data;
	    str += '</figcaption>';

	    alert(str);
	    $("#the-image").html(str); 

	}
    });
}

function setForm(){
    $("#getstyle-url-button").click(function(){
	imageurl = $('#getstyle-url').val();
	alert(imageurl);
	predict(imageurl); 
    });
}
    

