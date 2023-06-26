// refresh.js

function rafraichirCarte() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("carte").innerHTML = this.responseText;
  
        // Réinitialiser la carte en appelant initMap()
        initMap();
      }
    };
    xmlhttp.open("GET", "carte.php", true);
    xmlhttp.send();
  }
  
  // Appelez la fonction rafraichirCarte() toutes les 10 secondes
  setInterval(rafraichirCarte, 10000); // 10000 ms = 10 secondes
  