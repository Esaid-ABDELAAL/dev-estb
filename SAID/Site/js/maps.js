const estb = '3 place des Églantiers, 77183 Croissy-Beaubourg, France';
const bussy = '31 Av. Yitzhak Rabin, 77600 Bussy-Saint-Georges, France';
const neuilly = '7 rue Jacques Cartier, 93330 Neuilly-Sur-Marne, France';
const torcy = 'All. des Epinettes ZI Nord, Bâtiment 9, 77200 Torcy, France';

var icons = {
  start: new google.maps.MarkerImage(
   // URL
   'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png',
   // (width,height)
   new google.maps.Size( 44, 32 ),
   // The origin point (x,y)
   new google.maps.Point( 0, 0 ),
   // The anchor point (x,y)
   new google.maps.Point( 22, 32 )
  )
 };

// declaration du centre
const centreCarte = { lat: 48.846389, lng: 2.586121 };


// fonction pour l'affichage de la carte
function initMap() {

  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById('carte'), {
    zoom: 11,
    mapTypeId: 'roadmap',
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
    scaleControl: false,
    overviewMapControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    draggable: false,
    center: centreCarte // Remplacez par les coordonnées du centre de votre carte
  });

  var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  
  geocoder = new google.maps.Geocoder();
  codeAddress(estb);
  
  const renderer1 = new google.maps.DirectionsRenderer({suppressMarkers: true});
  renderer1.setMap(map);
  
  const renderer2 = new google.maps.DirectionsRenderer({suppressMarkers: true});
  renderer2.setMap(map);
  
  const renderer3 = new google.maps.DirectionsRenderer({suppressMarkers: true});
  renderer3.setMap(map);
  
  const request1 = {
    origin: estb,
    destination: bussy,
    drivingOptions: {
      departureTime: new Date(Date.now() + 10000), // for the time 10000 milliseconds from now.
      trafficModel: 'bestguess'
    },
    travelMode: 'DRIVING' // ou 'WALKING', 'BICYCLING', 'TRANSIT'
  };
  
  const request2 = {
    origin: estb,
    destination: neuilly,
    drivingOptions: {
      departureTime: new Date(Date.now() + 10000), // for the time 10000 milliseconds from now.
      trafficModel: 'bestguess'
    },
    travelMode: 'DRIVING' // ou 'WALKING', 'BICYCLING', 'TRANSIT'
  };
  
  const request3 = {
    origin: estb,
    destination: torcy,
    drivingOptions: {
      departureTime: new Date(Date.now() + 10000), // for the time 10000 milliseconds from now.
      trafficModel: 'bestguess'
    },
    travelMode: 'DRIVING' // ou 'WALKING', 'BICYCLING', 'TRANSIT'
  };
  
  
  directionsService.route(request1, function (response, status) {
    if (status == 'OK') {
      renderer1.setDirections(response);
      renderer1.setOptions({
        preserveViewport: true
      });
      var tempsTrajet1 = response.routes[0].legs[0].duration_in_traffic.text;
      document.getElementById('temps-trajet-1').innerHTML = "Temps de trajet vers bussy : " + tempsTrajet1;
      
      var leg = response.routes[ 0 ].legs[ 0 ];
      makeMarker( leg.end_location, 'end' );
    }
  });
  
  directionsService.route(request2, function (response, status) {
    if (status == 'OK') {
      renderer2.setDirections(response);
      renderer2.setOptions({
        preserveViewport: true
      });
      var tempsTrajet2 = response.routes[0].legs[0].duration_in_traffic.text;
      document.getElementById('temps-trajet-2').innerHTML = "Temps de trajet vers neuilly : " + tempsTrajet2;
      var leg = response.routes[ 0 ].legs[ 0 ];
      makeMarker( leg.end_location, 'end' );
    }
  });
  
  directionsService.route(request3, function (response, status) {
    if (status == 'OK') {
      renderer3.setDirections(response);
      renderer3.setOptions({
        preserveViewport: true
      });
      var tempsTrajet3 = response.routes[0].legs[0].duration_in_traffic.text;
      document.getElementById('temps-trajet-3').innerHTML = "Temps de trajet vers torcy : " + tempsTrajet3 ;
      var leg = response.routes[ 0 ].legs[ 0 ];
      makeMarker( leg.end_location, 'end' );
    }
  });
  
  function makeMarker( position, title ) {
    new google.maps.Marker({
      position: position,
     map: map,
     icon: icons,
     title: title
    });
  }
  function codeAddress(address) {
    
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == 'OK') {
        const estb_latlng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
        var marker_estb = new google.maps.Marker({
          position: estb_latlng,
          map: map,
          title: "ESTB",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/rangerstation.png"
          }
          
      });
      }});
      
    }
  }