<?php

/* #display all errors */
/* ini_set('display_errors', 1); */
/* ini_set('display_startup_errors', 1); */
/* error_reporting(E_ALL); */
/* assert_options(ASSERT_ACTIVE, 1); */

#$test_queries = array("blah", "{");


/*     '{', */
/* '{ "poulet":"balh"}', */
/* '{ dqdkj&é "j&ékl"& é"', */
/* '{ "type":"predict"}', */
/* '{ "type":"predict", "url":"qsd"}', */
/* '{ "type":"predict", "url":"http://thisdomaindoesnotexistihopeqsdqsd.com"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}', */
/* '{ "type":"predict", "url":"http://www.lamsade.dauphine.fr/~bnegrevergne/webpage/software/rasta/rasta-project/data/wikipaintings_10/wikipaintings_test/Post-Impressionism/adam-baltatu_olt-river-at-cozia.jpg"}'); */


function send_error($code, $msg){
    http_response_code(500);
    header('Content-type: text/json');
    print('{ "error : "'.$code.', "error_msg" : "'.$msg.'" }');
}

$query_data = array();

foreach ($_GET as $key => $val){
    $query_data[$key] = $val; 
}
$query = http_build_query($query_data);

$headers = array('Content-type: text/json');

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://10.1.3.203:4000/?'.$query);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
$error = curl_error($ch);

if (curl_errno($ch)) {
    send_error(500, "Rasta sever is not responding");
}
else{
    $info = curl_getinfo($ch);

    if($info['content_type'] != 'text/json'){
        echo "Error, unexpected content type\n";
    }
    else{
        http_response_code($info['http_code']);
        header('Content-type: text/json');
        print($result); 
    }

}

curl_close($ch);


?>
