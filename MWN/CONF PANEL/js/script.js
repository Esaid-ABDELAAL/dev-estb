// Chemin du fichier XML
var xmlFilePath = "/data-panel/adresses.xml";

// Fonction pour charger le contenu du fichier XML
function loadXMLFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
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
    input.addEventListener("input", function(event) {
      var newValue = event.target.value;
      address.querySelector("valeur").textContent = newValue;
    });

    xmlElements.appendChild(label);
    xmlElements.appendChild(input);
    xmlElements.appendChild(document.createTextNode("\n  "));
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
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Les modifications ont été enregistrées avec succès !");
    }
  };
  xhr.send(updatedXML);
}

// Fonction pour ajouter une nouvelle adresse
function addAddress() {
  var destinationInput = document.getElementById("destinationInput");
  var valueInput = document.getElementById("valueInput");

  var newAddress = xmlDoc.createElement("adresse");
  var newDestination = xmlDoc.createElement("destination");
  newDestination.textContent = destinationInput.value;
  var newValue = xmlDoc.createElement("valeur");
  newValue.textContent = valueInput.value;

  newAddress.appendChild(newDestination);
  newAddress.appendChild(newValue);

  var xmlElements = document.getElementById("xmlElements");
  var lineBreak = xmlDoc.createTextNode("\n  ");
  xmlElements.appendChild(lineBreak);
  var label = document.createElement("label");
  label.textContent = newDestination.textContent;
  xmlElements.appendChild(label);
  var input = document.createElement("input");
  input.type = "text";
  input.value = newValue.textContent;
  input.addEventListener("input", function(event) {
    var newValue = event.target.value;
    newAddress.querySelector("valeur").textContent = newValue;
  });
  xmlElements.appendChild(input);

  xmlDoc.getElementsByTagName("adresses")[0].appendChild(newAddress);

  destinationInput.value = "";
  valueInput.value = "";
}

// Chargement du fichier XML et affichage des éléments au chargement de la page
loadXMLFile(xmlFilePath, function(xml) {
  var parser = new DOMParser();
  xmlDoc = parser.parseFromString(xml, "text/xml");
  displayXML(xml);
});

// Ajoute un gestionnaire d'événement pour le bouton d'enregistrement
var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveXML);

// Ajoute un gestionnaire d'événement pour le bouton d'ajout
var addButton = document.getElementById("addButton");
addButton.addEventListener("click", addAddress);
