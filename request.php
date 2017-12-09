<?php
$data = json_decode($_POST['data']);

//var_dump($data);
$string = implode("+", $data );

//var_dump($string);
$url = "https://api.github.com/search/repositories?q=$string";

//var_dump($url);
$ua = 'My User Agent/1.0';
// 1. инициализация
$ch = curl_init();

// 2. указываем параметры, включая url
curl_setopt($ch, CURLOPT_USERAGENT, $ua);
curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);

// 3. получаем HTML в качестве результата
$output = (array) json_decode(curl_exec($ch), true);

$result = [];
$i=0;
foreach ($output["items"] as $output_res){
    $result[$i]["name"] = $output_res["name"];
    $result[$i]["html_url"] = $output_res["html_url"];
    $result[$i]["size"] = $output_res["size"];
    $result[$i]["forks"] = $output_res["forks"];
    $result[$i]["stargazers_count"] = $output_res["stargazers_count"];
    $i++;
}
//var_dump($output);
//var_dump($result);
foreach ($result as $res){
    echo "<p><a href=".$res["html_url"].">".$res["name"]."</a>"." size = ".$res["size"]." forks = ".$res["forks"]." stargazers_count = ".$res["stargazers_count"]."</p>";
    //var_dump($res) ;
}
//echo json_encode($result);
// 4. закрываем соединение
curl_close($ch);
