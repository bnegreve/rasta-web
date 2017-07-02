
function predict(img){
    $.ajax({
	type: 'GET',
	url: 'http://localhost:4000/ajax',
	crossDomain: true,
	data: { type: "predict",
		imageurl: img},
	cache: false,  
    	success: function( data ) {

	    $("#the-image").css('visibility', 'visible')

	    str  = "<img src=\"" + img + "\">";
	    str += '<figcaption class="over-top">';

	    for (var i in data.pred){
	    	str += data.pred[i] + ", ";
	    }

	    str += '</figcaption>';

	    $("#the-image").html(str); 

	}
    });
}

function setForm(){
    $("#getstyle-url-button").click(function(){
	imageurl = $('#getstyle-url').val();
	predict(imageurl); 
    });
}
    

