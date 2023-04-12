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
$itemsmanager = new ItemManager($dbConnection,"items");
    
// execution de l'insertion du ITEM dans le DB
    echo($itemsmanager->getAllItems());
?>