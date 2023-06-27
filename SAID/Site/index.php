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
  <div class="container">
      <div  class="search-box">
          <i class="fa-solid fa-location-dot"></i>
          <div id="cityOutput"></div>
      </div>

      <div class="not-found">
          <img src="images/404.png">
          <p>Oops! Invalid location :/</p>
      </div>

      <div class="weather-box">
          <img src="">
          <p class="temperature"></p>
          <p class="description"></p>
      </div>

      <div class="weather-details">
            <div class="humidity">
                <i class="fa-solid fa-water"></i>
                <div class="text">
                    <span></span>
                    <p>Humidité</p>
                </div>
            </div>
            <div class="wind">
                <i class="fa-solid fa-wind"></i>
                <div class="text">
                    <span></span>
                    <p>Vitesse du vent</p>
                </div>
            </div>
        </div>

    </div>


 <div class="container_small">
      <div  class="search-box_small">
          <i class="fa-solid fa-location-dot"></i>
          <div id="cityOutput_small"></div>
      </div>

      <div class="not-found_small">
          <img src="images/404.png">
          <p>Oops! Invalid location :/</p>
      </div>

      <div class="weather-box_small">
          <img src="">
          <p class="temperature_small"></p>
          <p class="description_small"></p>
      </div>

      <div class="weather-details_small"></div>
          
</div> 


    <div>
      <div id="carte"></div>
      <div id="temps-trajets"></div>
    </div>



        
      </div>
      <div class="news"></div>



  </main>

</body>
<?php 
include 'news.php';

include 'fenetre.php';

?>


 <script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAihZVAGDDEJNemwTWXvP7DTfnWYr4le4E&callback=initMap&v=weekly"defer></script> 
  <script src="https://kit.fontawesome.com/7c8801c017.js" crossorigin="anonymous"></script>
  
  
  <script src="js/weather-small.js"></script>

  <script src="js/weather.js"></script>

</body>
</html>