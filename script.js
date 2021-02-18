require([
      "esri/Map",
      "esri/layers/CSVLayer",
      "esri/views/MapView",
      "esri/config",
      "esri/core/urlUtils",
      "dojo/domReady!"
    ], function(
      Map,
      CSVLayer,
      MapView,
      esriConfig,
      urlUtils
    ) {

     var url = "https://raw.githubusercontent.com/gbrunner/Advanced_Python_for_GIS_and_RS/master/Week%202/stl_crime_wgs_84.csv";
     esriConfig.request.corsEnabledServers.push('https://rawgit.com');

 
        const template = {
          title: "St. Louis Crime Heatmap",
          content: "Crime {Crime} {type} Neighboorhood {Neighborhood} on {ILEADSStreet}."
        };

        const csvLayer = new CSVLayer({
          url: url,
          copyright: "St. Louis Police Department",
          latitudeField:"Lat",
        longitudeField:"Lon",
          popupTemplate: template
        });

      csvLayer.renderer = {
        type: "heatmap", 
        colorStops: [
            { color: "rgba(63, 40, 102, 0)", ratio: 0 },
            { color: "#191970", ratio: 0.083 },
            { color: "#0000cd", ratio: 0.166 },
            { color: "#1e90ff",ratio: 0.249 },
            { color: "#00bfff", ratio: 0.332 },
            { color: "#ff6347", ratio: 0.415 },
            { color: "#ff4500", ratio: 0.498 },
            { color: "#ff0000", ratio: 0.581 },
            { color: "#c71585", ratio: 0.664 },
            { color: "#ff00ff", ratio: 0.747 },
            { color: "#ff1493", ratio: 0.83 },
            { color: "#ffd700", ratio: 0.913 },
            { color: "#adff2f", ratio: 1 }
          ],
          maxPixelIntensity: 400,
          minPixelIntensity: 0
      };

      var map = new Map({
        basemap: "dark-gray",
        layers: [csvLayer]
      });

      var view = new MapView({
        container: "viewDiv",
        center: [-90.1994, 38.6270],
        zoom: 12,
        map: map
      });

    });
