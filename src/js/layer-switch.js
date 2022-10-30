import * as MenuDisplay from './menu-display';
import * as UpdateLegend from './update-legend';
import DOM from './dom';
import Globals from './globals';
import Layers from './layers';
import Texts from './texts';

// Fonctions de changements d'affichages de couches
function removeAllLayers() {
  Layers.orthoLyr.setOpacity(1);
  Globals.map.eachLayer( (layer) => {
    Globals.map.removeLayer(layer);
  });
  document.querySelectorAll("#menuC img").forEach(elem => {
    elem.classList.remove('selectedLayer');
  });
  UpdateLegend.updateLegend();
}


function displayOrthoAndRoads() {
  /**
   * Affiche la couche ortho + route
   */
  removeAllLayers();
  document.getElementById("routes").classList.add("selectedLayer");
  DOM.$infoText.innerHTML = Texts.informationTexts.routes;
  DOM.$legendImg.innerHTML = Texts.legendImgs.routes;
  Layers.orthoLyr.addTo(Globals.map);
  Layers.roadsLyr.addTo(Globals.map);
  Layers.namesLyr.addTo(Globals.map);
  if (Globals.gpsMarkerLayer) {
    Globals.gpsMarkerLayer.addTo(Globals.map);
  }
  if (Globals.adressMarkerLayer) {
    Globals.adressMarkerLayer.addTo(Globals.map);
  }
  Globals.layerDisplayed = 'routes';
  MenuDisplay.closeCat();
}

function displayPlan() {
  /**
   * Affiche la couche plan IGN
   */
  removeAllLayers();
  document.getElementById("plan-ign").classList.add("selectedLayer");
  DOM.$infoText.innerHTML = Texts.informationTexts.plan_ign;
  DOM.$legendImg.innerHTML = Texts.legendImgs.plan_ign;
  Layers.planLyr.addTo(Globals.map);
  if (Globals.gpsMarkerLayer) {
    Globals.gpsMarkerLayer.addTo(Globals.map);
  }
  if (Globals.adressMarkerLayer) {
    Globals.adressMarkerLayer.addTo(Globals.map);
  }
  Globals.layerDisplayed = 'plan-ign';
  MenuDisplay.closeCat();
}

function displayTopo() {
  /**
   * Affiche la couche carte topo
   */
  removeAllLayers();
  document.getElementById("topo").classList.add("selectedLayer");
  DOM.$infoText.innerHTML = Texts.informationTexts.topo;
  DOM.$legendImg.innerHTML = Texts.legendImgs.topo;
  Layers.topoLyr.addTo(Globals.map);
  if (Globals.gpsMarkerLayer) {
    Globals.gpsMarkerLayer.addTo(Globals.map);
  }
  if (Globals.adressMarkerLayer) {
    Globals.adressMarkerLayer.addTo(Globals.map);
  }
  Globals.layerDisplayed = 'topo';
  MenuDisplay.closeCat();
}

export {
  removeAllLayers,
  displayOrthoAndRoads,
  displayPlan,
  displayTopo,
};
