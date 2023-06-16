// Fonction pour charger le contenu du fichier XML
function loadXMLFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  
  // Fonction pour afficher les éléments XML
  function displayXML(xml) {
    var xmlElements = document.getElementById("xmlElements");
    xmlElements.innerHTML = ""; // Efface le contenu existant
  
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");
    var addresses = xmlDoc.getElementsByTagName("adresse");
  
    for (var i = 0; i < addresses.length; i++) {
      var address = addresses[i];
      var destination = address.querySelector("destination").textContent;
      var value = address.querySelector("valeur").textContent;
  
      var label = document.createElement("label");
      label.textContent = destination;
  
      var input = document.createElement("input");
      input.type = "text";
      input.value = value;
  
      // Ajoute un gestionnaire d'événement pour mettre à jour la valeur XML lors de la modification de l'input
      input.addEventListener("input", function (event) {
        var newValue = event.target.value;
        address.querySelector("valeur").textContent = newValue;
      });
  
      xmlElements.appendChild(label);
      xmlElements.appendChild(input);
      xmlElements.appendChild(document.createElement("br"));
    }
  }
  
  // Fonction pour enregistrer les modifications
  function saveXML() {
    var serializer = new XMLSerializer();
    var updatedXML = serializer.serializeToString(xmlDoc);
  
    // Envoie les données XML mises à jour au serveur
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_xml.php", true);
    xhr.setRequestHeader("Content-Type", "application/xml");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Les modifications ont été enregistrées avec succès !");
      }
    };
    xhr.send(updatedXML);
  }
  
  // Chargement du fichier XML et affichage des éléments au chargement de la page
  loadXMLFile("adresses.xml", function (xml) {
    displayXML(xml);
  });
  
  // Ajoute un gestionnaire d'événement pour le bouton d'enregistrement
  var saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveXML);
  