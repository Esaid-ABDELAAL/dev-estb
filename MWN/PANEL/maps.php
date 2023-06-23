<?php
  // Connexion à la base de données
  $servername = '192.168.0.166:33061';
  $username = 'root';
  $password = 'Bassem01!';
  $dbname = 'adresses';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Vérification de la connexion
  if ($conn->connect_error) {
    die('Erreur de connexion à la base de données : ' . $conn->connect_error);
  }

  // Récupération des adresses depuis la base de données
  $sql = 'SELECT * FROM destinations';
  $result = $conn->query($sql);

  $adresses = [];
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $destination = $row['nom'];
      $valeur = $row['valeur'];
      if ($destination !== 'depart') {
        $adresses[$destination] = $valeur;
      } else {
        $depart = $valeur;
      }
    }
  }

  $conn->close();
?>

<script>
  // Passer les adresses depuis PHP à JavaScript
  const adresses = <?php echo json_encode($adresses); ?>;
  const depart = <?php echo json_encode($depart); ?>;
  const centreCarte = { lat: 48.8566, lng: 2.3522 };

  // Inclure le script JavaScript principal
  const script = document.createElement('script');
  script.src = 'js/commutes.js';
  document.head.appendChild(script);
</script>
