import * as Autocomp from './autocomplete';
import * as Coords from './coordinates';
import * as Geocode from './geocode';
import * as LayerSwitch from './layer-switch';
import * as Location from './location';
import * as MenuDisplay from './menu-display';
import * as UpdateLegend from './update-legend';
import DOM from './dom';
import Globals from './globals';


function addEventListeners() {

  // Recherche du 1er résultat de l'autocomplétion si appui sur entrée
  DOM.$rech.addEventListener("keyup", (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      DOM.$resultDiv.hidden = true;
      DOM.$resultDiv.innerHTML = "";
      Geocode.rechercheEtPosition(DOM.$rech.value);
      MenuDisplay.searchScreenOff();
    } else if (DOM.$rech.value !== ""){
      let resultStr = "";
      Autocomp.suggest().then( () => {
        if (Globals.autocompletion_results.length > 0){
          for (let i = 0 ; i < Globals.autocompletion_results.length; i++) {
            resultStr += "<p class='autocompresult'>" + Globals.autocompletion_results[i] + "</p>" ;
          }
          DOM.$resultDiv.innerHTML = resultStr;
          DOM.$resultDiv.hidden = false;
        }
      });
    }
  });

  /* event listeners pour élément non existants au démarrage */
  document.querySelector('body').addEventListener('click', (evt) => {
    /* fermeture catalogue */
    if ( evt.target.id !== 'catalog') {
      MenuDisplay.closeCat();
    }
    /* Résultats autocompletion */
    if ( evt.target.classList.contains('autocompresult') ) {
      evt.target.style.backgroundColor = '#D9B26F';
      evt.target.style.color = 'white';
      DOM.$rech.value = evt.target.innerHTML;
      Geocode.rechercheEtPosition(DOM.$rech.value);
      setTimeout(MenuDisplay.searchScreenOff, 150)
    /* marqueur de recherche/position */
    } else if (evt.target.classList.contains("adressMarker")) {
      Geocode.cleanResults();
    } else if (evt.target.classList.contains("gpsMarker")) {
      Location.cleanGPS();
    }
  }, true);

  /* event listeners pour élément non existants au démarrage */
  document.querySelector('body').addEventListener('dblclick', (evt) => {
    /* Markers */
    if (evt.target.classList.contains("leaflet-editing-icon")) {
      evt.stopImmediatePropagation();
    }
  }, true);

  /* event listeners statiques */
  // Couches
  document.getElementById("layerRoutes").addEventListener('click', LayerSwitch.displayOrthoAndRoads);
  document.getElementById("layerPlan").addEventListener('click', LayerSwitch.displayPlan);
  document.getElementById("layerTopo").addEventListener('click', LayerSwitch.displayTopo);
  document.getElementById("layerOpenTopoMap").addEventListener('click', LayerSwitch.displayOpenTopoMap);
  document.getElementById("layerOpenStreetMapFrance").addEventListener('click', LayerSwitch.displayOpenStreetMapFrance);
  document.getElementById("layerCyclOSM").addEventListener('click', LayerSwitch.displayCyclOSM);

  // Ouverture-Fermeture
  document.getElementById("catalogBtn").addEventListener('click', MenuDisplay.openCat);
  DOM.$backTopLeft.addEventListener("click", onBackKeyDown);

  // Boutons on-off
  DOM.$geolocateBtn.addEventListener('click', Location.locationOnOff);
  DOM.$chkPrintCoordsReticule.addEventListener('change', Coords.reticuleOnOff);

  // Recherche
  DOM.$rech.addEventListener('focus', MenuDisplay.searchScreenOn);
  DOM.$closeSearch.addEventListener("click", onBackKeyDown);

  // Menu burger
  DOM.$menuBtn.addEventListener("click", MenuDisplay.openMenu);

  // Fermeture menu
  DOM.$menu.addEventListener('click', (evt) => {
    if (evt.target.id === 'menu') {
      MenuDisplay.closeMenu();
    }
  });

  document.getElementById('menuItemParams').addEventListener('click', MenuDisplay.openParamsScreen);
  document.getElementById('menuItemLegend').addEventListener('click', MenuDisplay.openLegend);
  document.getElementById('menuItemInfo').addEventListener('click', MenuDisplay.openInfos);

  document.getElementById("infoWindowClose").addEventListener('click', MenuDisplay.closeInfos);
  document.getElementById("legendWindowClose").addEventListener('click', MenuDisplay.closeLegend);
  document.getElementById("menuWindowClose").addEventListener('click', MenuDisplay.closeMenu);

  // Rotation du marqueur de position
  window.addEventListener("deviceorientationabsolute", Location.getOrientation, true);

  // Synchronisation des radio button pour le type de coordonnées
  Array.from(document.getElementsByName("coordRadio")).forEach( elem => {
    elem.addEventListener("change", () => {
      Coords.updateCenterCoords(Globals.map.getCenter());
      const radioCheckedId = document.querySelector('input[name="coordRadio"]:checked').id;
      document.getElementById("coordTypeDisplay").innerHTML = document.querySelector(`label[for="${radioCheckedId}"]`).innerHTML;
    });
  });
  /**/

  // Légende en fonction du zoom
  Globals.map.on("zoomend", UpdateLegend.updateLegend);

  // Coordonnées au déplacement de la carte
  Globals.map.on('move', () => {
    Coords.updateCenterCoords(Globals.map.getCenter());
  });

  // Action du backbutton
  document.addEventListener("backbutton", onBackKeyDown, false);

  function onBackKeyDown() {
    // Handle the back button
    if (Globals.backButtonState == 'default') {
      navigator.app.exitApp();
    }
    if (Globals.backButtonState === 'search') {
      MenuDisplay.closeSearchScreen();
    }
    if (Globals.backButtonState === 'mainMenu') {
      MenuDisplay.closeMenu();
    }
    if (Globals.backButtonState === 'params') {
      MenuDisplay.closeParamsScreen();
    }
    if (Globals.backButtonState === 'infos') {
      MenuDisplay.closeInfos();
    }
    if (Globals.backButtonState === 'legend') {
      MenuDisplay.closeLegend();
    }
    if (Globals.backButtonState === 'catalog') {
      MenuDisplay.closeCat();
      Globals.backButtonState = 'default';
    }
  }


  // Rotation de la carte avec le mutlitouch
  let hammertime = new Hammer.Manager(DOM.$map);

  const rotate = new Hammer.Rotate()
  hammertime.add(rotate)

  let lastRotation;
  let lastMarkerRotation;
  let startRotation;
  let rotationStarted = false;
  let disableRotation = false;

  hammertime.on('rotatemove', (e) => {
    if (DOM.$chkRotate.checked && !disableRotation) {
      let diff = startRotation - Math.round(e.rotation);
      Globals.currentRotation = lastRotation - diff;
      Globals.positionBearing = lastMarkerRotation - diff;

      if (rotationStarted) {
        Globals.map.setBearing(Globals.currentRotation);
        Location.positionMarker.setRotationAngle(Globals.positionBearing);
        DOM.$compassBtn.style.transform = "rotate(" + Globals.currentRotation + "deg)";
        DOM.$compassBtn.classList.remove("d-none");
      }
      if (Math.abs(diff) > 15 && !rotationStarted){
        rotationStarted = true;
        startRotation = Math.round(e.rotation);
      }
    }
  });

  hammertime.on('rotatestart', (e) => {
    if (DOM.$chkRotate.checked && !disableRotation) {
      lastRotation = Globals.currentRotation;
      lastMarkerRotation = Globals.positionBearing;
      startRotation = Math.round(e.rotation);
    }
  });

  hammertime.on('rotateend', () => {
    if (DOM.$chkRotate.checked) {
      if (!rotationStarted) {
        Globals.currentRotation = lastRotation;
        Globals.positionBearing = lastMarkerRotation;
      }
      rotationStarted = false;
      lastRotation = Globals.currentRotation;
      lastMarkerRotation = Globals.positionBearing;
    }
  });

  // Pas de rotation quand zoom
  let currentZoom = 0;
  Globals.map.on("zoomstart", () => {
    currentZoom = Globals.map.getZoom();
  });

  Globals.map.on("zoom", () => {
    if (Math.round(Globals.map.getZoom()) !== currentZoom && !rotationStarted) {
      disableRotation = true;
    }
  });

  Globals.map.on("zoomend", () => {
    disableRotation = false;
  });

  map.on('movestart', function (e) {
    if (Globals.movedFromCode) {
      return
    } else if (Location.tracking_active){
      // De tracking a simple suivi de position
      Location.locationOnOff();
      Location.locationOnOff();
    }
  });


  // Sauvegarde de l'état de l'application
  document.addEventListener('pause', () => {
    localStorage.setItem("lastMapLat", Globals.map.getCenter().lat);
    localStorage.setItem("lastMapLng", Globals.map.getCenter().lng);
    localStorage.setItem("lastMapZoom", Globals.map.getZoom());
    localStorage.setItem("lastLayerDisplayed", Globals.layerDisplayed);
  });

  // Rotation
  DOM.$compassBtn.addEventListener("click", () => {
    if (Location.tracking_active){
      // De tracking a simple suivi de position
      Location.locationOnOff();
      Location.locationOnOff();
    }
    Globals.currentRotation = Math.round((Globals.currentRotation % 360) + 360 ) % 360;

    let interval;

    function animateRotate() {
      if (Globals.currentRotation < 180) {
        Globals.currentRotation -= 1;
        Globals.positionBearing -= 1;

      } else {
        Globals.currentRotation += 1;
        Globals.positionBearing += 1;
      }
      map.setBearing(Globals.currentRotation);
      Location.positionMarker.setRotationAngle(Globals.positionBearing);
      DOM.$compassBtn.style.transform = "rotate(" + Globals.currentRotation + "deg)";
      if (Globals.currentRotation % 360 == 0) {
        clearInterval(interval);
        DOM.$compassBtn.style.pointerEvents = "";
        DOM.$compassBtn.classList.add("d-none");
      }
    }

    DOM.$compassBtn.style.pointerEvents = "none";
    interval = setInterval(animateRotate, 2);
  });

  // Import de fichiers
  document.getElementById("fileBtn").addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = "file";
    input.accept = ".geojson";

    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file,'UTF-8');
      reader.onload = readerEvent => {
         const content = readerEvent.target.result;
         const importedJson = L.geoJSON(JSON.parse(content), {
          "color": "#795c5f",
          "weight": 6,
          "opacity": 0.8
        }).addTo(Globals.map);

        Globals.map.fitBounds(importedJson.getBounds());
      }
    }
    input.click();
  });

}

export {
  addEventListeners
};
