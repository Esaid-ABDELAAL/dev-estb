<?php
// Connexion à la base de données
$servername = '192.168.0.166:33061';
$username = 'root';
$password = 'Bassem01!';
$dbname = 'adresses';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Récupération des adresses depuis la base de données
$query = "SELECT * FROM destinations";
$result = $conn->query($query);
if (!$result) {
    die("Erreur lors de l'exécution de la requête : " . $conn->error);
}

$adresses = [];
while ($row = $result->fetch_assoc()) {
    $adresses[] = [
        'nom' => $row['nom'],
        'valeur' => $row['valeur']
    ];
}

$conn->close();

// Envoi des adresses au format JSON
header('Content-Type: application/json');
echo json_encode($adresses);
?>
