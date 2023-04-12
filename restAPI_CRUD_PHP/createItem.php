<?php

// creation de l'header de la response.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/Database.php';
include_once './class/ItemManager.php';


$database = new Database("shop");
$dbConnection = $database->getConnection();
$items = new ItemManager($dbConnection,"items");
    
// execution de l'insertion du ITEM dans le DB

if( isset($_POST['name']) && isset($_POST['description']) &&
!empty($_POST['name']) && !empty($_POST['description']))
{
    $name = $_POST['name'];
    $description = $_POST['description'];

    if($items->addItemToDb("bourse AAA", "bourse en cuir"))
    {     
        // ajoute des données à la response
        http_response_code(200);   
        echo(json_encode(array("message" => "Item ".$name." is added.")));
    }
    else
    {    
        // ajoute des données à la response en cas d'erreur
        http_response_code(503);     
        echo(json_encode(array("message" => "Item ".$name." not added.")));
    }

}
else
{
    http_response_code(400);  
    echo(json_encode(array("message" => "Item attributes not specified! ")));
}





?>