let depart;
const adresses = [];

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
      icon: icons.start,
      title: title
    });
  }

  function loadAddresses() {
    // Récupération des adresses depuis PHP
    const adressesFromPHP = <?php echo json_encode($adresses); ?>;
    depart = adressesFromPHP.find(a => a.nom === 'depart').valeur;

    // Stockage des adresses dans le tableau adresses
    adressesFromPHP.forEach(a => {
      if (a.nom !== 'depart') {
        adresses.push(a.valeur);
      }
    });

    // Calcul des temps de trajet
    calculerTempsTrajet(depart);
  }

  function calculerTempsTrajet(adresseDepart) {
    adresses.forEach(destination => {
      const request = {
        origin: adresseDepart,
        destination: destination,
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
    });
  }

  // Appeler la fonction pour charger les adresses depuis PHP
  loadAddresses();
}
