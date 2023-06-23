// JavaScript code here
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
    streetViewControl: false
  });

  codeAddress();
  calculerTempsTrajet(adresses.depart);
}
