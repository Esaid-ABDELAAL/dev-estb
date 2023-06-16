let depart;

const adresses = {};

const centreCarte = { lat: 48.846389, lng: 2.586121 };

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById('carte'), {
    center: centreCarte,
    zoom: 11,
    mapTypeId: 'roadmap',
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
    scaleControl: false,
    overviewMapControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    draggable: false
  });

  function makeMarker(position, title) {
    const icons = {
      start: new google.maps.MarkerImage(
        'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png',
        new google.maps.Size(44, 32),
        new google.maps.Point(0, 0),
        new google.maps.Point(22, 32)
      )
    };

    new google.maps.Marker({
      position: position,
      map: map,
      icon: icons,
      title: title
    });
  }

  function codeAddress() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': depart }, function (results, status) {
      if (status == 'OK') {
        const depart_latlng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
        const marker_depart = new google.maps.Marker({
          position: depart_latlng,
          map: map,
          title: "depart",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/rangerstation.png"
          }
        });
      }
    });
  }
  
  let isFirstAdresse = true; // Variable pour suivre si c'est la première adresse

  function loadAddresses() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const xmlDoc = xhr.responseXML;
          const adresseElements = xmlDoc.getElementsByTagName("adresse");
          const container = document.getElementById('temps-trajets');
          
          for (let i = 0; i < adresseElements.length; i++) {
            const destination = adresseElements[i].getElementsByTagName("destination")[0].textContent;
            const valeur = adresseElements[i].getElementsByTagName("valeur")[0].textContent;
            
            adresses[destination] = valeur;
            


            if (destination !== 'depart') {
              const divTempsTrajet = document.createElement('div');
              divTempsTrajet.id = 'temps-trajet-' + destination;
              container.appendChild(divTempsTrajet);
              if (i === adresseElements.length - 1) {
                divTempsTrajet.classList.add('last-temps-trajet');
              }
              if (isFirstAdresse) {
                divTempsTrajet.classList.add('first-temps-trajet');
                isFirstAdresse = false; // Met à jour le flag après la première adresse
              }  
            }
            else{
              depart = valeur;
            }
          }
          codeAddress();
          calculerTempsTrajet(depart);
        }
      }
    };
    xhr.open("GET", "adresses.xml", true);
    xhr.send();
  }

  function calculerTempsTrajet(adresseDepart) {
    for (const destination in adresses) {
      if (destination !== 'depart') {
        const request = {
          origin: adresseDepart,
          destination: adresses[destination],
          drivingOptions: {
            departureTime: new Date(Date.now() + 10000),
            trafficModel: 'bestguess'
          },
          travelMode: 'DRIVING'
        };

        const renderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        renderer.setMap(map);

        directionsService.route(request, function (response, status) {
          if (status === 'OK') {
            renderer.setDirections(response);
            renderer.setOptions({
              preserveViewport: true
            });
            const tempsTrajet = response.routes[0].legs[0].duration_in_traffic.text;
            const destinationId = 'temps-trajet-' + destination;
            const destinationElement = document.getElementById(destinationId);
            if (destinationElement) {
              destinationElement.innerHTML = "Temps de trajet vers " + destination + " : " + tempsTrajet;
            }
            const leg = response.routes[0].legs[0].end_location;
            makeMarker(leg, destination);
          }
        });
      }
    }
  }

  // Appeler la fonction pour charger les adresses depuis le fichier XML
  loadAddresses();

  // Appeler la fonction pour afficher le marqueur de l'adresse de départ
  
}
