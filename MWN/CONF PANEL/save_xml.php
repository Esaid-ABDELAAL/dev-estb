<?php
// Récupère les données XML envoyées depuis le client
$xmlData = file_get_contents('php://input');

// Chemin du fichier XML à modifier
$xmlFile = 'adresses.xml';

// Écrit les données XML dans le fichier
file_put_contents($xmlFile, $xmlData);
?>