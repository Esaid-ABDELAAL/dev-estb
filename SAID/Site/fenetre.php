<?php
$serveur = "192.168.0.166";
$port = 33061;
$utilisateur = "root";
$motDePasse = "Bassem01!";
$baseDeDonnees = "doorsensors";

// Connexion à la base de données MySQL
$connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees, $port);

// Vérification de la connexion
if ($connexion->connect_error) {
    die("Erreur de connexion à la base de données: " . $connexion->connect_error);
}

// Requête SQL pour récupérer les données de la table "devices"
$sql = "SELECT * FROM devices";
$resultat = $connexion->query($sql);

// Variable pour suivre si une fenêtre est ouverte
$fenetreOuverte = false;

while ($row = mysqli_fetch_assoc($resultat)) {
    if ($row["status"] == "ouvert") {
        $fenetreOuverte = true;
        echo '<div class="nom-fenetre">Fenêtre ouverte : </div>';
        echo '<div class="fond-white">';
        echo $row["name"] . '<br>';
    }
}




if ($fenetreOuverte) {
    echo '</div>';
    echo "<script>document.querySelector('.container').style.display = 'none' ;</script>";
} else {
    echo "<script>document.querySelector('.container_small').style.display = 'none' ;</script>";
    echo '<div class="fond-white""></div>';
}

// Fermeture de la connexion à la base de données
$connexion->close();
?>
