
var URL='../backend/php/ajax.php'
//var URL='http://localhost:4000/' use this if the server is running locally (and on port 4000)

var example_base_url = "http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/"
var example_list = [
    "Abstract_Art/ad-reinhardt_study-for-a-painting-1938-2.jpg", 
    "Abstract_Expressionism/ad-reinhardt_number-107-1950.jpg", 
    "Art_Informel/afro_torneo-1965.jpg", 
    "Art_Nouveau_(Modern)/akseli-gallen-kallela_kullervos-curse-1899.jpg", 
    "Baroque/adriaen-brouwer_father-s-of-unpleasant-duties-1631.jpg", 
    "Color_Field_Painting/alma-woodsey-thomas_air-view-of-a-spring-nursery-1966.jpg", 
    "Cubism/albert-gleizes_on-a-sailboat.jpg", 
    "Early_Renaissance/andrea-del-castagno_crucifixion.jpg", 
    "Expressionism/adam-baltatu_towards-the-noon.jpg", 
    "High_Renaissance/andrea-del-sarto_archangel-raphael-with-tobias-st-lawrence-and-the-donor-leonardo-di-lorenzo-morelli-1512.jpg", 
    "Impressionism/abdullah-suriosubroto_indonesian-landscape-6.jpg", 
    "Magic_Realism/avigdor-arikha_bare-breasts-1989.jpg", 
    "Mannerism_(Late_Renaissance)/agnolo-bronzino_eleonora-da-toledo-1543.jpg", 
    "Minimalism/agnes-martin_untitled-1963.jpg", 
    "Naïve_Art_(Primitivism)/adolf-dietrich_herbst-am-untersee-1952.jpg", 
    "Neoclassicism/abraham-van-strij_interior-of-wool-and-sheetshop.jpg", 
    "Northern_Renaissance/albrecht-altdorfer_birth-of-mary.jpg", 
    "Pop_Art/andy-warhol_botticelli-dettaglio.jpg", 
    "Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg", 
    "Realism/adolf-hitler_alter-werderthor-wien.jpg", 
    "Rococo/allan-ramsay_miss-craigie-1741.jpg", 
    "Romanticism/adolphe-joseph-thomas-monticelli_an-evening-at-the-paiva.jpg", 
    "Surrealism/abidin-dino_madenci.jpg", 
    "Symbolism/akseli-gallen-kallela_ad-astra-1907.jpg", 
    "Ukiyo-e/hiroshige_a-bridge-across-a-deep-gorge.jpg" ]

function url_is_image(img){
    return(img.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function reset_image_area(){
    $("#the-image").css('opacity', 1)
    str = '<img src="img/what.jpeg">'
    $("#the-image").html(str)
}

function predict(img){

    str  = '<img src="' + img + '">'
    str += '<figcaption class="over-top" id="the-image-caption">'
    str += "Please wait ... "
    str += '</figcaption>'
    $("#message-area").empty()
    $("#progress-bar-area").empty()
    $("#the-image").html(str)
    $("#the-image").css('opacity', 0.5)

    if( ! url_is_image( img ) ){
	show_user_error("Url does not point to a supported image file")
	reset_image_area()
    }
    else{
	
	$.ajax({
	    type: 'GET',
	    url: URL,
	    crossDomain: true,
	    data: { type: "predict",
		    url: img},
	    cache: false,  
    	    success: function( data ) {

		if( ! ('error' in data) || data['error'] != 200){
		    show_server_error(data)
		    reset_image_area()
		}
		else if( 'user_error' in data && data['user_error'] != 0 ){
		    show_user_error(get_user_error_msg(data))
		    reset_image_area()
		}
		else{
		    show_results(data)
		}

	    }
	});
    }
}

function show_results(data){
    show_best_guess(data)
    show_progress_bars(data)
}

function show_server_error(error_msg){

    str  = '<div class="ink-alert basic" role="error" id="message">'
    str += '<button class="ink-dismiss">&times;</button>'
    str += '<p><b>Server error:</b> Please try again later</p>'
    str += '</div>'

    $("#message-area").html(str)

}

function get_user_error_msg(data){
    var error_msg
    if( 'user_error_msg' in data )
	error_msg = data['user_error_msg']
    else
	error_msg = 'Unknown user error'

    return error_msg
}

function show_user_error(error_msg){


    str  = '<div class="ink-alert basic" role="alert" id="message">'
    str += '<button class="ink-dismiss">&times;</button>'
    str += '<p><b>Warning:</b> ' + error_msg + '</p>'
    str += '</div>'

    $("#message-area").html(str)

}

function show_best_guess(data){
    str = 'Best guess: ' + '<em>' + data.pred[0] + '</em>'
    
    for (i in data.pred){
	if(i > 0 && data.pcts[i] > 0.39){
	    str += ' or '
	    str += '<em>' + data.pred[i] + '</em>'
	}
    }

    str = str.replace(/_/g , '&nbsp;');
    $("#the-image-caption").html(str); 
    $("#the-image").css('opacity', 1)

}

function show_progress_bars(data){

    str = '';


    for (i in data.pcts){
	var val = Math.round(data.pcts[i] * 100)
	if(val >= 1){

	    
	    var name = data.pred[i].replace(/_/g , '&nbsp;');
	    // str += '<div class="ink-progress-bar" data-start-value="' + val + '" id="progress-bar-' + i + '">';

	    str += '<div class="w3-light-grey">'
	    str += '<div class="w3-grey" style="height:24px;width:' + val + '%;white-space:nowrap;">' + name + ': ' + val + '%</div>'
	    str += '</div><br>'
	    
	    // str += '<span class="caption">' + name + ': ' + val + '</span>'
	    // str += '<div class="bar blue"></div>'
	    // str += '</div>'
	}
    }


    $("#progress-bar-area").html(str);
}


function examples(){

    str = '' 
    for (i in example_list){
	str += '<li class="slide all-30 small-100 tiny-100">'
	str += '<div class="example-image-container"><a onclick="predict(\'' + example_base_url + example_list[i] + '\')">'
	str += '<img class="quarter-bottom-space example-img" src="' + example_base_url + example_list[i] + '">'
	str += '</a></div>'
	str += '</li>'
    }

    $("#example-li").append(str); 

}


function submitForm(){
    imageurl = $('#getstyle-url').val();
    predict(imageurl); 
}


function setForm(){
    $("#getstyle-url-button").click(function(){
	submitForm()
    });
}
    

