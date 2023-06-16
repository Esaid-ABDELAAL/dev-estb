
<?php


$fichier = 'data.xml';
$contenu = simplexml_load_file($fichier);

$portesOuvertes = array();
foreach ($contenu as $device) {
  'ID: ' . $device->dev_id . ' | IP: ' . $device->ip . ' | Local Key: ' . $device->local_key . ' | Version: ' . $device->version . ' | Status: ' . $device->status . '<br>';

  if ($device->status == 'ouvert') {
    $portesOuvertes[] = $device->dev_id;
  }
}

if (!empty($portesOuvertes)) {
  echo '<div class="list-container">';
  echo '<ul>';
  foreach ($portesOuvertes as $fenetre) {
    echo '<li>' . str_replace('"', '', $fenetre) . '</li>';
  }
  echo '</ul>';
  echo '</div>';
  echo '<div class="nom-fenetre-ouvert">Fenêtre ouverte : </div>';
  echo '<div class="led-box-rouge"><div class="led-red"></div></div>';

} else {
  echo '<div class="nom-fenetre">Aucune fenêtre n\'est ouverte.</div>';
  echo '<div class="led-box-vert"><div class="led-green"></div></div>';
}
?>