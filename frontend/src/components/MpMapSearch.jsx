import React from 'react';

var MpMapSearch = React.createClass({

  componentDidMount: function(){

      mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA';
        var map = new mapboxgl.Map({
            container: 'map',
            
            maxBounds: [
                [-141.8521455, 41.68392799015035], // Southwest coordinates
                [-52.0792153, 83.7630545]  // Northeast coordinates
            ],
            style: 'mapbox://styles/brianbancroft/cio5y4bf10001afnmjjdelbzf',
            zoom: 6,
            center: [-73.8574963,46.363789],
        });

        map.on('load', function() {
            map.addSource('ridings-canada', {
                type: 'vector',
                url: 'mapbox://brianbancroft.1sf4w5x6'

            },'water');
            map.addLayer({
                "id": "ridings-canada",
                "type": "fill",
                "source": "ridings-canada",
                "source-layer": "electboundaries1",
                'paint': {
                  'fill-color': '#334455',
                  'fill-opacity': 0.5,
                  'fill-outline-color': 'rgba(200,100,240,1)',
                }

            },'water');
            map.addLayer({
              'id': 'whig-riding',
              'type': 'fill',
              "source": "ridings-canada",
              "source-layer": "electboundaries1",
              'paint': {
                'fill-color': '#f00',
                'fill-opacity': 0.4
              },
              filter: ['==', 'Party', 'Liberal']
            },'water');
            map.addLayer({
              'id': 'tory-riding',
              'type': 'fill',
              "source": "ridings-canada",
              "source-layer": "electboundaries1",
              'paint': {
                'fill-color': '#00F',
                'fill-opacity': 0.4
              },
              filter: ['==', 'Party', 'Conservative']
            },'water');
            map.addLayer({
              'id': 'dipper-riding',
              'type': 'fill',
              "source": "ridings-canada",
              "source-layer": "electboundaries1",
              'paint': {
                'fill-color': '#ffa500',
                'fill-opacity': 0.4
              },
              filter: ['==', 'Party', 'NDP']
            },'water');
            map.addLayer({
              'id': 'green-riding',
              'type': 'fill',
              "source": "ridings-canada",
              "source-layer": "electboundaries1",
              'paint': {
                'fill-color': '#0F0',
                'fill-opacity': 0.4
              },
              filter: ['==', 'Party', 'Green Party']
            });
            map.addLayer({
              'id': 'bloc-riding',
              'type': 'fill',
              "source": "ridings-canada",
              "source-layer": "electboundaries1",
              'paint': {
                'fill-color': '#88F',
                'fill-opacity': 0.4
              },
              filter: ['==', 'Party', 'Bloc Quebecois']
            },'water');

            map.addLayer({
                "id": "ridings-canada",
                "type": "line",
                "source": "ridings-canada",
                "source-layer": "electboundaries1",
                'paint': {
                  "line-color": "#330033",
                  "line-width": 8
                }

            },'water');

        });


        map.on('click', function(e) {

            var features = map.queryRenderedFeatures(e.point, {
                layers: ['whig-riding','tory-riding','dipper-riding','bloc-riding','green-riding']

            });

            if (!features.length) {
                return;
            }

            var feature = features[0];
            console.log("constit id: " + feature.properties.constit_id);


            // Populate the popup and set its coordinates
            // based on the feature found.
            var popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML("<p> " + feature.properties.ENNAME + " </p>")
                .addTo(map);
        });

        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
   
  },
 
  render: function() {
    return (
        <div id='map' className="big-map"></div>
    )
  }
});



export default MpMapSearch;