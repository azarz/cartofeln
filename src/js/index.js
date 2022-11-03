import * as Coords from './coordinates';
import * as EventListeners from './event-listeners';
import * as LayerSwitch from './layer-switch';
import * as Location from './location';
import Globals from './globals';

function app() {
  /**
   * Fonction définissant l'application
   */

  /* Demande d'autorisation au 1er lancement de l'appli */
  if (!localStorage.getItem("firstLocRequestDone")){
    Location.requestLocationAccuracy();
    localStorage.setItem("firstLocRequestDone", true);
  }
  /**/

  /* Définition des marker icons */
  Globals.markerIcon = L.divIcon({
    iconUrl: cordova.file.applicationDirectory + 'www/css/assets/position.svg',
    html: '<img class="gpsMarker" id="markerRotate" src="' + cordova.file.applicationDirectory + 'www/css/assets/position.svg"></img>',
    iconSize:     [51, 51], // size of the icon
    iconAnchor:   [26, 26], // point of the icon which will correspond to marker's location
    className:    'gpsMarker',
  });


  Globals.markerIcon2 = L.icon({
    iconUrl: cordova.file.applicationDirectory + 'www/css/assets/map-center.svg',
    iconSize:     [23, 23], // size of the icon
    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
    className:    'adressMarker',
  });
  /**/

  /* Récupération de la carte */
  Globals.map = new L.map('map', {
    zoomControl: false,
    rotate: true,
    contextmenu: true,
    contextmenuWidth: 180,
    // Map context menu
    contextmenuItems: [{
      text: 'Afficher les coordonnées',
      callback: _showCoordinates
    }, '-', {
        text: 'Itinéraire depuis ce lieu',
        callback: _routeFrom
    }, {
        text: 'Itinéraire vers lieu',
        callback: _routeTo
    }]
  }).setView([47.33, 2.0], 5);

  const map = Globals.map;
  // Ajout de l'échelle
  L.control.scale({
    imperial: false,
    maxWidth: 150,
    position: "bottomleft",
  }).addTo(map);

  L.Draw.Polyline.include({
    _updateFinishHandler:function(){
     var markerCount = this._markers.length;
     if (markerCount > 1) {
         this._markers[markerCount - 1].on('click', this._finishShape, this);
     }
     if (markerCount > 2) {
         this._markers[markerCount - 2].off('click', this._finishShape, this);
     }
    }
  });

  // Geoportail widget route
  const route = L.geoportalControl.Route({
    apiKey: "calcul",
    disableReverse: true,
    graphs: ["Pieton"],
    routeOptions: {
      onSuccess: computeRouteElevation,
      geometryInInstructions: false,
    },
  });
  map.addControl(route);

  // Geoportail widget elevationpath
  const elevationpath = L.geoportalControl.ElevationPath({
    apiKey: "calcul",
    elevationPathOptions: {
      httpMethod: "POST",
      api: "WPS",
    }
  });
  map.addControl(elevationpath);

  // Elevation path on route result
  function computeRouteElevation(routeResponse) {
    const geom = [];
    const routeGeom = routeResponse.routeGeometry.coordinates;
    for (var i = 0; i < routeGeom.length; i++) {
      geom.push({
        lon : routeGeom[i][0],
        lat : routeGeom[i][1]
      });
    }

    elevationpath._distance = parseFloat(routeResponse.totalDistance);
    elevationpath._geometry = geom;
    elevationpath.options.elevationPathOptions.sampling = 0;
    if (geom.length() < 200) {
      elevationpath.options.elevationPathOptions.sampling = 200;
    }
    elevationpath._pictoContainer.style.display = "none";
    elevationpath._panelContainer.style.display = "block";
    elevationpath._altiRequest();
  };

  // Context menu functions
  // Helper functions
  function _showCoordinates(e) {
    let coords = [e.latlng.lng, e.latlng.lat];
    let convertedCoords = Coords.convertCoords(coords);
    L.popup()
    .setLatLng(e.latlng)
    .setContent(convertedCoords[0] + ", " + convertedCoords[1])
    .openOn(map);
  }

  function _routeFrom(e) {
    if (!route._showRouteContainer.checked) {
      route._pictoRouteContainer.click();
    }
    route._start._inputShowPointerContainer.checked = true;
    route._start._inputAutoCompleteContainer.className = "GPlocationOriginHidden";
    route._start._inputCoordinateContainer.className = "GPlocationOriginVisible";
    route._start._setLabel();
    route._start._clearResults();
    route._start._setMarker(e.latlng, null, false);
    route._start._setCoordinate(e.latlng);
  }

  function _routeTo(e) {
    if (!route._showRouteContainer.checked) {
      route._pictoRouteContainer.click();
    }
    route._end._inputShowPointerContainer.checked = true;
    route._end._inputAutoCompleteContainer.className = "GPlocationOriginHidden";
    route._end._inputCoordinateContainer.className = "GPlocationOriginVisible";
    route._end._setLabel();
    route._end._clearResults();
    route._end._setMarker(e.latlng, null, false);
    route._end._setCoordinate(e.latlng);
  }

  // Chargement de la postition précédente
  if (localStorage.getItem("lastMapLat") && localStorage.getItem("lastMapLng") && localStorage.getItem("lastMapZoom")) {
    map.setView([localStorage.getItem("lastMapLat"), localStorage.getItem("lastMapLng")], localStorage.getItem("lastMapZoom"));
  }
  // Initialisation des coordonnées du centre
  Coords.updateCenterCoords(map.getCenter());

  // Chargement de la couche précédente
  switch (Globals.layerDisplayed) {
    case 'routes':
      LayerSwitch.displayOrthoAndRoads();
      break;
    case 'plan-ign':
      LayerSwitch.displayPlan();
      break;
    case 'topo':
      LayerSwitch.displayTopo();
      break;
  }
  /**/

  // Ajout des event listeners
  EventListeners.addEventListeners();
}

document.addEventListener('deviceready', () => {
  app();
});
