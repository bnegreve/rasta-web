
function predict(img){

    str  = '<img src="' + img + '">';
    str += '<figcaption class="over-top" id="the-image-caption">';
    str += "Please wait ... ";
    str += '</figcaption>';
    $("#the-image").html(str); 
    $("#the-image").css('opacity', 0.5)
    $("#the-image").css('visibility', 'visible')

    $.ajax({
	type: 'GET',
	url: 'http://localhost:4000/ajax',
	crossDomain: true,
	data: { type: "predict",
		url: img},
	cache: false,  
    	success: function( data ) {
	    str = '';
	    for (i in data.pred){
	    	str += '<em>' + data.pred[i] + '</em>'
		if(i < data.pred.length - 1){
		    str += " or ";
		}
	    }
	    $("#the-image-caption").html(str); 
	    $("#the-image").css('opacity', 1)
	}
    });
}

function setForm(){
    $("#getstyle-url-button").click(function(){
	imageurl = $('#getstyle-url').val();
	predict(imageurl); 
    });
}
    

