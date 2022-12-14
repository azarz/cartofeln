export default {  /* Object contenant les descriptions associées aux couches */
  informationTexts: {
    routes: 'Affichage du réseau routier français et européen avec en fond les proses de vues satellitaires ou aériennes des territoires. <p><a style="color: #A69658; text-decoration: none;" href="https://www.geoportail.gouv.fr/depot/fiches/donnees-vecteur/composition-donnees-vecteur.pdf" target="_blank" rel="noopener">»&nbsp;Consulter les dates de mise à jour des données</a></p><ul><li><a class="inner-link" title="Institut national de l’information géographique et forestière" target="_blank" href="http://www.ign.fr">Institut national de l’information géographique et forestière</a></li></ul>',
    plan_ign: 'Fond cartographique proposé par l’Institut national de l’information géographique et forestière (IGN). <ul><li><a class="inner-link" title="Institut national de l’information géographique et forestière" target="_blank" href="http://www.ign.fr">Institut national de l’information géographique et forestière</a></li></ul>',
    topo: "<p>La carte topographique représente avec précision le relief, symbolisé par des courbes de niveaux, ainsi que les détails du terrain : routes, sentiers, uctions:bois, arbres isolé, rivières, sources… </p><p>Cette carte présente également des parcours et des informations pour la randonnée fournies par la Fédération Française de la Randonnée Pédestre (FFRandonnée) et le Club Vosgien.</p><p></p><p><a style='color: #A69658; font-weight: bold; text-decoration: none;' href='https://edito.geoportail.rie.gouv.fr/donnees/graphe-de-mosaique-scan25' target='_blank'>»&nbsp;Consulter le zonage des mises à jour</a></p>",
    openTopoMap: "OpenTopoMap est un projet visant à créer un rendu de cartes topographiques à partir de données OSM et SRTM. Ce style de carte, au même titre que les cartes topographiques (carte 1/25'000) de l'IGN, est familier des randonneurs et tous ceux qui ont, en autre, besoin du relief.<ul><li>Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, <a href='http://viewfinderpanoramas.org'>SRTM</a> | Map style: &copy; <a href='https://opentopomap.org'>OpenTopoMap</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>)</li></ul>",
    openStreetMapFrance: "Version « francisée » du fond OSM international<ul><li>&copy; OpenStreetMap France | &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors</li></ul>",
    cyclOSM: "CyclOSM est un rendu des données OpenStreetmap, comme le standard tile layer, dont le but est d'afficher en priorité les informations utiles aux cyclistes, quelle que soit leur pratique. Dès le début, il a été conçu en pensant d'abord et avant tout aux cyclistes.<ul><li><a href='https://github.com/cyclosm/cyclosm-cartocss-style/releases' title='CyclOSM - Open Bicycle render'>CyclOSM</a> | Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors</li></ul>",
  },

  /* Object contenant les liens vers les légendes associées aux couches */
  legendImgs: {
    routes: '<img src="https://www.geoportail.gouv.fr/depot/layers/TRANSPORTNETWORKS.ROADS/legendes/TRANSPORTNETWORKS.ROADS-legend.png" alt="légende routes">',
    plan_ign: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_1-7-legend.png" alt="légende plan IGN">',
    topo: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR/legendes/GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR-legend.png" alt="légende carte topo">',
    openTopoMap: '<a href="https://www.geograph.org/leaflet/otm-legend.php">Légende en anglais</a>',
    openStreetMapFrance: '<a href="https://github.com/cquest/osmfr-cartocss">https://github.com/cquest/osmfr-cartocss</a>',
    cyclOSM: '<a href="https://www.cyclosm.org/legend.html">https://www.cyclosm.org/legend.html</a>',
  },

  planIGNLegendImgs: {
    seven: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_1-7-legend.png" alt="légende plan IGN">',
    eight: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_8-legend.png" alt="légende plan IGN">',
    nine: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_9-legend.png" alt="légende plan IGN">',
    ten: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_10-legend.png" alt="légende plan IGN">',
    eleven: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_11-legend.png" alt="légende plan IGN">',
    twelve: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_12-legend.png" alt="légende plan IGN">',
    thirteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_13-legend.png" alt="légende plan IGN">',
    fourteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_14-legend.png" alt="légende plan IGN">',
    fifteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_15-legend.png" alt="légende plan IGN">',
    sixteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_16-legend.png" alt="légende plan IGN">',
    eighteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_17-18-legend.png" alt="légende plan IGN">',
    nineteen: '<img src="https://www.geoportail.gouv.fr/depot/layers/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2/legendes/GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2_19-legend.png" alt="légende plan IGN">',
  },

}
