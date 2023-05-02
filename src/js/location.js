import DOM from './dom';
import Globals from './globals';

/* Géolocalisation */
// Positionnement du mobile
let location_active = false;
// Suivi de la carte
let tracking_active = false;
let watch_id;
// Orientation du marqueur de position
let positionMarker;
let oldPositionBearing;


function cleanGPS() {
  /**
   * Enlève le marqueur GPS
   */
  if (Globals.gpsMarkerLayer != null) {
    Globals.map.removeLayer(Globals.gpsMarkerLayer);
    Globals.gpsMarkerLayer = null;
  }
}

function _goToGPSCoords(coords, zoom=Globals.map.getZoom(), panTo=true) {
  /**
   * Ajoute un marqueur de type GPS à la position définie par le coods, et déplace la carte au zoom demandé
   * si panTo est True
   */
  cleanGPS();
  Globals.gpsMarkerLayer = L.featureGroup().addTo(Globals.map);
  positionMarker = L.rotatedMarker(
    [coords.lat, coords.lon],
    {
      icon:	Globals.markerIcon,
    }
  )
  positionMarker.setRotationAngle(Globals.positionBearing);
  let markerLayer = L.featureGroup([positionMarker]);
  Globals.gpsMarkerLayer.addLayer(markerLayer);
  if (panTo) {
    Globals.movedFromCode = true;
    if (Globals.currentRotation !== 0){
      Globals.map.setBearing(0);
      Globals.map.setView(new L.LatLng(coords.lat, coords.lon), zoom, {animate: false});
      Globals.map.setBearing(Globals.currentRotation);
    } else {
      Globals.map.setView(new L.LatLng(coords.lat, coords.lon), zoom);
    }
    Globals.movedFromCode = false;
  }
}

function _trackLocation() {
  /**
   * Suit la position de l'utilisateur
   */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      _goToGPSCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }, Math.max(Globals.map.getZoom(), 14));
    },
    (err) => {
      console.warn(`ERROR(DOM.${err.code}): DOM.${err.message}`);
    },
    {
      maximumAge: 1500000,
      timeout: 100000,
      enableHighAccuracy: true
    });

    watch_id = navigator.geolocation.watchPosition((position) => {
      _goToGPSCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }, Globals.map.getZoom(), tracking_active);
    },
    (err) => {
      console.warn(`ERROR(DOM.${err.code}): DOM.${err.message}`);
    },
    {
      maximumAge: 1500000,
      timeout: 100000,
      enableHighAccuracy: true
    });
  }
}

// Modification du statut de localisation
function locationOnOff() {
  if (!location_active) {
    DOM.$geolocateBtn.style.backgroundImage = 'url("css/assets/location-fixed.svg")';
    requestLocationAccuracy();
    _trackLocation();
    location_active = true;
    window.plugins.toast.hide();
    window.plugins.toast.showLongBottom("Suivi de position activé");
  } else if (!tracking_active) {
    DOM.$geolocateBtn.style.backgroundImage = 'url("css/assets/location-follow.svg")';
    tracking_active = true;
    window.plugins.toast.hide();
    window.plugins.toast.showLongBottom("Mode navigation activé");
  } else {
    cleanGPS();
    DOM.$geolocateBtn.style.backgroundImage = 'url("css/assets/localisation.svg")';
    navigator.geolocation.clearWatch(watch_id);
    location_active = false;
    tracking_active = false;
    window.plugins.toast.hide();
    window.plugins.toast.showLongBottom("Navigation et suivi de position désactivés");
  }
}

/* Code pour l'activation de la localisation de l'appareil */
// https://github.com/dpa99c/cordova-plugin-request-location-accuracy
const platform = cordova.platformId;

function _onError(error) {
  console.error("The following error occurred: " + error);
}

function _handleSuccess(msg) {
  console.log(msg);
}

function _handleLocationAuthorizationStatus(status) {
  switch (status) {
    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
      _makeRequest();
      break;
    case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
      _requestLocationAuthorization();
      break;
    case cordova.plugins.diagnostic.permissionStatus.DENIED:
      _onError("User denied permission to use location");
      break;
    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
      // Android only
      _onError("User denied permission to use location");
      break;
    case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
      _makeRequest();
      break;
  }
}

function _requestLocationAuthorization() {
  cordova.plugins.diagnostic.requestLocationAuthorization(_handleLocationAuthorizationStatus, _onError);
}

function requestLocationAccuracy() {
  if (platform != "browser") {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(_handleLocationAuthorizationStatus, _onError);
  }
}

function _makeRequest(){
  cordova.plugins.locationAccuracy.canRequest(function(canRequest){
    if (canRequest) {
      cordova.plugins.locationAccuracy.request(function () {
          _handleSuccess("Location accuracy request successful");
        }, function (error) {
          _onError("Error requesting location accuracy: " + JSON.stringify(error));
          if (error) {
            // Android only
            _onError("error code=" + error.code + "; error message=" + error.message);
            if (platform === "android" && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
              if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                cordova.plugins.diagnostic.switchToLocationSettings();
              }
            }
          }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
      );
    } else {
      // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
      // On Android, this will occur if the app doesn't have authorization to use location.
      _onError("Cannot request location accuracy");
    }
  });
}

function getOrientation(event) {
  if (tracking_active) {
    Globals.currentRotation = event.alpha;
    Globals.map.setBearing(event.alpha);
    DOM.$compassBtn.classList.remove("d-none");
    DOM.$compassBtn.style.transform = "rotate(" + event.alpha + "deg)";
  }
  Globals.positionBearing = Number(Number(360 - event.alpha).toFixed(1)) + Globals.currentRotation;
  if (positionMarker) {
    positionMarker.setRotationAngle(Globals.positionBearing);
  }
}

export {
  cleanGPS,
  locationOnOff,
  requestLocationAccuracy,
  getOrientation,
  tracking_active,
}
