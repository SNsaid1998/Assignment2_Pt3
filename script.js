      require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], function(
        Map,
        CSVLayer,
        MapView,
        Legend
      ) {
        const url = "https://raw.githubusercontent.com/gbrunner/Advanced_Python_for_GIS_and_RS/master/Week%202/stl_crime_wgs_84.csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const template = {
          title: "Crime committed at {ILEADSStreet}",
          content: "Magnitude {mag} {type} hit {place} on {time}."
        };

        // The heatmap renderer assigns each pixel in the view with
        // an intensity value. The ratio of that intensity value
        // to the maxPixel intensity is used to assign a color
        // from the continuous color ramp in the colorStops property

        const renderer = {
          type: "heatmap",
          colorStops: [
            { color: "rgba(63, 40, 102, 0)", ratio: 0 },
            { color: "#18b3be", ratio: 0.083 },
            { color: "#28aab1", ratio: 0.166 },
            { color: "#39a1a4", ratio: 0.249 },
            { color: "#499989", ratio: 0.332 },
            { color: "#598f86", ratio: 0.415 },
            { color: "#7a7d71", ratio: 0.498 },
            { color: "#8a7465", ratio: 0.581 },
            { color: "#9b6b58", ratio: 0.664 },
            { color: "#ab624b", ratio: 0.747 },
            { color: "#bb593e", ratio: 0.83 },
            { color: "#cc5032", ratio: 0.922 },
            { color: "#dc4725", ratio: 1 }
          ],
          maxPixelIntensity: 25,
          minPixelIntensity: 0
        };

const layer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
		latitudeField:"Lat",
        longitudeField:"Lon",
		popupTemplate: template,
		renderer: renderer
});

        const map = new Map({
          basemap: "gray-vector",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-90.25, 38.62],
          zoom: 12,
          map: map
        });

        view.ui.add(
          new Legend({
            view: view
          }),
          "bottom-left"
        );
      });
