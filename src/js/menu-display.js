import DOM from './dom';
import Globals from './globals';

// Ouverture/fermeture catalogue
function openCat() {
  document.getElementById("catalog").classList.remove('d-none');
  Globals.backButtonState = 'catalog';
}

function closeCat() {
  document.getElementById("catalog").classList.add('d-none');
}

// Ouverture/fermeture de l'écran recherche
function searchScreenOn() {
  closeCat();
  document.getElementById("catalogBtn").classList.add('d-none');
  DOM.$menuBtn.classList.add('d-none');
  DOM.$closeSearch.classList.remove('d-none');
  Globals.backButtonState = 'search';
}

function searchScreenOff() {
  Globals.controller.abort();
  Globals.controller = new AbortController();
  Globals.signal = Globals.controller.signal;
  DOM.$resultDiv.hidden = true;
  DOM.$resultDiv.innerHTML = "";
  document.getElementById("catalogBtn").classList.remove('d-none');
  DOM.$menuBtn.classList.remove('d-none');
  DOM.$closeSearch.classList.add('d-none');
  DOM.$rech.blur()
  Globals.backButtonState = 'default';
}

function closeSearchScreen() {
  searchScreenOff();
  DOM.$rech.value = "";
}

// Ouverture/fermeture menu burger
function openMenu() {
  closeInfos();
  closeLegend();
  closeCat();
  DOM.$menu.classList.remove('d-none');
  Globals.backButtonState = 'mainMenu';
}

function closeMenu() {
  DOM.$menu.classList.add('d-none');
  Globals.backButtonState = 'default';
}

// Ouverture/fermeture des fentres infos et légende
function openLegend(){
  closeMenu();
  DOM.$legendWindow.classList.remove("d-none");
  Globals.backButtonState = 'legend';
}

function closeLegend(){
  DOM.$legendWindow.classList.add("d-none");
  scroll(0,0);
  Globals.backButtonState = 'default';
}

function openInfos(){
  closeMenu();
  DOM.$infoWindow.classList.remove("d-none");
  Globals.backButtonState = 'infos';
}

function closeInfos(){
  DOM.$infoWindow.classList.add("d-none");
  scroll(0,0);
  Globals.backButtonState = 'default';
}

// Ouverture/fermeture des écrans atlernatifs
function altScreenOn() {
  closeMenu();
  DOM.$rech.disabled = true;
  DOM.$rech.style.fontFamily = 'Open Sans Bold';
  DOM.$blueBg.classList.remove('d-none');
  DOM.$menuBtn.classList.add('d-none');
  DOM.$searchImage.classList.add('d-none');
  DOM.$backTopLeft.classList.remove('d-none');
  DOM.$closeSearch.classList.remove('d-none');
  DOM.$altMenuContainer.classList.remove('d-none');
  Globals.lastTextInSearch = DOM.$rech.value;

}

function altScreenOff() {
  DOM.$rech.disabled = false;
  DOM.$rech.value = Globals.lastTextInSearch;
  DOM.$rech.removeAttribute('style');
  DOM.$blueBg.classList.add('d-none');
  DOM.$menuBtn.classList.remove('d-none');
  DOM.$closeSearch.classList.add('d-none');
  DOM.$backTopLeft.classList.add('d-none');
  DOM.$searchImage.classList.remove('d-none');
  DOM.$parameterMenu.classList.add('d-none');
  DOM.$altMenuContainer.classList.add('d-none');
}

// Ouverture/fermeture de l'écran paramètres
function openParamsScreen() {
  altScreenOn();
  DOM.$parameterMenu.classList.remove('d-none');
  DOM.$rech.value = "Paramètres";
  Globals.backButtonState = 'params';
}

function closeParamsScreen() {
  altScreenOff();
  DOM.$parameterMenu.classList.add('d-none');
  Globals.backButtonState = 'default';
}

export {
  openCat,
  closeCat,
  searchScreenOn,
  searchScreenOff,
  closeSearchScreen,
  openMenu,
  closeMenu,
  openLegend,
  closeLegend,
  openInfos,
  closeInfos,
  altScreenOn,
  altScreenOff,
  openParamsScreen,
  closeParamsScreen,
};
