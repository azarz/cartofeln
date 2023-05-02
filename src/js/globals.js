// Leaflet map
let map;

/* global: layer display state */
let layerDisplayed = localStorage.getItem("lastLayerDisplayed") || 'plan-ign';

/* global: back button state */
let backButtonState = 'default';

/* global: last text in search bar */
let lastTextInSearch = '';

/* global: current map rotation */
let currentRotation = 0;

/* global: flag to check if map move fired by code */
let movedFromCode = false;

let gpsMarkerLayer;
let adressMarkerLayer;

// Pour l'annulation de fetch
let controller = new AbortController();
let signal = controller.signal;

// Autocompletion
let autocompletion_results = []

// Markers
let markerIcon;
let markerIcon2;
let positionBearing = 0;

export default {
  map,
  layerDisplayed,
  backButtonState,
  lastTextInSearch,
  currentRotation,
  gpsMarkerLayer,
  adressMarkerLayer,
  controller,
  signal,
  markerIcon,
  markerIcon2,
  autocompletion_results,
  positionBearing,
  movedFromCode,
};
