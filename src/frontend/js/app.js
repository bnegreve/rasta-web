
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

    // examples = [ "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg", 
    // 		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
    // 		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
    // 		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
    // 		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg",
    // 		 "http://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg"   ]


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
	url: '../backend/php/ajax.php',
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

function setForm(){
    $("#getstyle-url-button").click(function(){
	imageurl = $('#getstyle-url').val();
	predict(imageurl); 
    });
}
    

