let myMap = L.map("mapdiv"); // http://leafletjs.com/reference-1.3.0.html#map-l-map
const spazierwege = L.featureGroup().addTo(myMap); // neue Gruppe fuer marker
let myLayers = {
    osm : L.tileLayer( // http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
        // subdomains: ['a', 'b', 'c'], // subdomains hinzugefügt
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>OpenStreetMap"
        }
    ),
    //* {s} steht sämtliche subdomain - maps,1,2,3,4
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],  //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" // http://leafletjs.com/reference-1.3.0.html#tilelayer-attribution
    }
    // attribution = Datenquelle (Vorgegeben wie man es angeben muss )
    ),
    bmapoverlay :  L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
        subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
    }
    ),
   
}
myMap.addLayer(myLayers.geolandbasemap); // http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "OpenStreetMap" : myLayers.osm,
    "basemap.at Grundkarte" : myLayers.geolandbasemap,
   
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at highdpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" : myLayers.bmaporthofoto30cm,
},{
    "basemap.at Overlay" : myLayers.bmapoverlay,
    "Stadspazierwege" : spazierwege,

});
myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol

myMapControl.expand() // Methode um My Controll Feld automatisch auszuklappen

// Einstellungen 11 = Zoomfaktor
myMap.setView([47.267,11.383],9); //http://leafletjs.com/reference-1.3.0.html#map-setview



// Massstab einfuegen
L.control.scale({       // http://leafletjs.com/reference-1.3.0.html#control-scale
    maxWidth: 200,      // http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    metric: true,       // http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    imperial: false     // http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
}).addTo(myMap);

// alle Stationen einfügen
console.log("Spazierwege: ", wege);

let geojson = L.geoJSON(wege).addTo(spazierwege);
// Daten aus geojson auslesen
geojson.bindPopup(function(layer) {

    const props = layer.feature.properties; 
    const popupText = `<h1>${layer.feature.properties.NAME}</h1>
    <p> ${layer.feature.properties.BEMERKUNG}</p>`;
    return popupText;
   // console.log("Layer for popup:", layer); // wurde ersetzt
});

myMap.fitBounds(spazierwege.getBounds());