
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

function examples(){
    examples = [ "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg", 
		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg"   ]

    str = '' 
    for (i in examples){
	str += '<li class="slide all-30 small-100 tiny-100">'
	str += '<a onclick="predict(\'' + examples[i] + '\')"><img class="quarter-bottom-space" src="' + examples[i] + '"></a>'
	str += '</li>'
    }

    $("#example-li").append(str); 

}

function setForm(){
    $("#getstyle-url-button").click(function(){
	imageurl = $('#getstyle-url').val();
	predict(imageurl); 
    });
}
    

