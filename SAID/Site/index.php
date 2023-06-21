<html>
<head>
  <title>panneau info</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAihZVAGDDEJNemwTWXvP7DTfnWYr4le4E&libraries=places"></script>
  <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAihZVAGDDEJNemwTWXvP7DTfnWYr4le4E&callback=initMap"></script>
  <link rel="stylesheet" type="text/css" href="css/style.css" />
  <script type="" src="/js/maps.js"></script>
</head>

<body>

  <main>

    <div>
      <div id="carte"></div>
      <div id="temps-trajets"></div>
    </div>

    <div class="meteo">
      <div id="ww_2e9fa8b41da1e" v='1.3' loc='id'a='{"t":"horizontal","lang":"fr","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'><a href="https://meteolabs.fr/widgets/" id="ww_2e9fa8b41da1e_u" target="_blank">Widget météo gratuit</a></div>
      <script async src="https://app1.weatherwidget.org/js/?id=ww_2e9fa8b41da1e"></script>
      </div>



      <div class="fond-white">
        
      </div>

      <h2 class="titre-fenetre">Information fenêtres </h2>

      <div class="news"></div>



  </main>

</body>
<?php include 'fenetre.php';
include 'news.php';

?>


 <script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAihZVAGDDEJNemwTWXvP7DTfnWYr4le4E&callback=initMap&v=weekly"
  defer></script> 
  <script async src="https://app1.weatherwidget.org/js/?id=ww_2e9fa8b41da1e"></script>

</body>
</html>