<?php

/* #display all errors */
/* ini_set('display_errors', 1); */
/* ini_set('display_startup_errors', 1); */
/* error_reporting(E_ALL); */
/* assert_options(ASSERT_ACTIVE, 1); */

$URL='http://localhost:4000/';

function send_error($code, $msg){
    http_response_code(500);
    header('Content-type: text/json');
    print('{ "error : "'.$code.', "error_msg" : "'.$msg.'" }');
}

$query_data = array();

foreach ($_GET as $key => $val){
    /* if($key == "url"){ */
    /*     $query_data['url'] = urlencode($query_data['url']); */
    /* } */
    /* else{ */
        $query_data[$key] = $val;
    /* } */
}

if(array_key_exists('REMOTE_ADDR', $_SERVER)){
    $query_data['remote_addr'] = $_SERVER['REMOTE_ADDR'];
}

$query = http_build_query($query_data);

$headers = array('Content-type: text/json; charset=utf-8');

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $URL.'?'.$query);
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

    # if($info['content_type'] != 'text/json'){
    #     echo "Error, unexpected content type\n";
    # }
    # else{
        http_response_code($info['http_code']);
        header('Content-type: text/json; charset=utf-8');
        print($result); 
#    }

}

curl_close($ch);


?>
