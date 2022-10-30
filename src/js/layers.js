export default {
  orthoLyr: L.tileLayer.fallback(
    "https://wxs.ign.fr/ortho/geoportail/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/jpeg"+
    "&LAYER=ORTHOIMAGERY.ORTHOPHOTOS"+
    "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
    {
    minZoom : 0,
    maxZoom : 19,
    maxNativeZoom : 19,
    attribution : '<a target="_blank" href="http://www.ign.fr"><img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière"></a>',
    tileSize : 256, // les tuiles du Géooportail font 256x256px
    useCache: true,
    }
  ),

  roadsLyr: L.tileLayer.fallback(
    "https://wxs.ign.fr/topographie/geoportail/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/png"+
    "&LAYER=TRANSPORTNETWORKS.ROADS"+
    "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
    {
    minZoom : 0,
    minNativeZoom : 6,
    maxZoom : 19,
    maxNativeZoom : 18,
    attribution : '<a target="_blank" href="http://www.ign.fr"><img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière"></a>',
    tileSize : 256, // les tuiles du Géooportail font 256x256px
    useCache: true,
    }
  ),

  namesLyr: L.tileLayer.fallback(
    "https://wxs.ign.fr/topographie/geoportail/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/png"+
    "&LAYER=GEOGRAPHICALNAMES.NAMES"+
    "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
    {
    minZoom : 0,
    minNativeZoom : 6,
    maxZoom : 19,
    maxNativeZoom : 18,
    attribution : '<a target="_blank" href="http://www.ign.fr"><img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière"></a>',
    tileSize : 256, // les tuiles du Géooportail font 256x256px
    useCache: true,
    }
  ),

  planLyr: L.tileLayer.fallback(
    "https://wxs.ign.fr/cartes/geoportail/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/png"+
    "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2"+
    "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
    {
    minZoom : 0,
    minNativeZoom : 3,
    maxZoom : 19,
    maxNativeZoom : 19,
    attribution : '<a target="_blank" href="http://www.ign.fr"><img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière"></a>',
    tileSize : 256, // les tuiles du Géooportail font 256x256px
    useCache: true,
    }
  ),

  topoLyr: L.tileLayer.fallback(
    "https://wxs.ign.fr/" + process.env.GP_TOKEN + "/geoportail/wmts?" +
    "&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0" +
    "&STYLE=normal" +
    "&TILEMATRIXSET=PM" +
    "&FORMAT=image/jpeg"+
    "&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR"+
    "&TILEMATRIX={z}" +
      "&TILEROW={y}" +
      "&TILECOL={x}",
    {
    minZoom : 0,
    minNativeZoom : 6,
    maxZoom : 19,
    maxNativeZoom : 16,
    attribution : '<a target="_blank" href="http://www.ign.fr"><img src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière"></a>',
    tileSize : 256, // les tuiles du Géooportail font 256x256px
    useCache: true,
    }
  ),

}
