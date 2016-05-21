var STYLES = {
  simple: {
    "version": 7,
    "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
    "constants": {
      "@sans": "Open Sans Regular, Arial Unicode MS Regular",
      "@medium-label": "#f27a87",
      "@small-label": "#384646",
      "@label-halo": "rgba(255,255,255,0.5)",
      "@label-halo-dark": "rgba(0,0,0,0.2)",
      "@land": "#ededed",
      "@water": "#7acad0",
      "@province": "#FF6600"
    },
    "sources": {
      "cartodb": {
        "type": "vector",
        "tiles": [
          "http://rochoa.cartodb.com/api/v1/map/named/tpl_1adb092a_6b52_11e5_bc85_0e3ff518bd15/mapnik/{z}/{x}/{y}.mvt"
        ],
        "maxzoom": 18
      }
    },
    "layers": [
      {
        "id": "layer0",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "paint": {
          "fill-color": "#FF6600",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-borders",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "line",
        "paint": {
          "line-width": 1,
          "line-color": '#FFF',
          "line-opacity": 1
        }
      }
    ]
  },
	labels: {
    "version": 7,
    "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
    "constants": {
      "@sans": "Open Sans Regular, Arial Unicode MS Regular",
      "@medium-label": "#f27a87",
      "@small-label": "#384646",
      "@label-halo": "rgba(255,255,255,0.5)",
      "@label-halo-dark": "rgba(0,0,0,0.2)",
      "@land": "#ededed",
      "@water": "#7acad0",
      "@province": "#FF6600"
    },
    "sources": {

      "cartodb-light_nolabels": {
        "type": "raster",
        "tiles": [
          "http://all.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        ],
        "tileSize": 256
      },

      "cartodb": {
        "type": "vector",
        "tiles": [
          "http://rochoa.cartodb.com/api/v1/map/named/tpl_1adb092a_6b52_11e5_bc85_0e3ff518bd15/mapnik/{z}/{x}/{y}.mvt"
        ],
        "maxzoom": 12
      }

    },
    "layers": [
      {
        "id": "simple-tiles",
        "type": "raster",
        "source": "cartodb-light_nolabels",
        "minzoom": 0,
        "maxzoom": 22
      },
      {
        "id": "world_borders",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "paint": {
          "fill-color": "@province",
          "fill-outline-color": "#FFF",
          "fill-opacity": 0.2
        }
      },
      {
        "id": "populated-places-labels",
        "source": "cartodb",
        "source-layer": "layer1",
        "min-zoom": 2,
        "max-zoom": 12,
        "type": "symbol",
        "layout": {
          "text-field": "{name}",
          "text-font": "@sans",
          "text-max-size": 28,
          "text-max-width": 8
        },
        "paint": {
          "text-color": "black",
          "text-halo-color": "@label-halo",
          "text-size": {
          "stops": [[7, 18], [10, 30]]
          }
        }
      }
    ]
  },
  category: {
    "version": 7,
    "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
    "constants": {
      "@sans": "Open Sans Regular, Arial Unicode MS Regular",
      "@medium-label": "#f27a87",
      "@small-label": "#384646",
      "@label-halo": "rgba(255,255,255,0.5)",
      "@label-halo-dark": "rgba(0,0,0,0.2)",
      "@land": "#ededed",
      "@water": "#7acad0",
      "@province": "#FF6600"
    },
    "sources": {
      "cartodb": {
        "type": "vector",
        "tiles": [
          "http://rochoa.cartodb.com/api/v1/map/named/tpl_1adb092a_6b52_11e5_bc85_0e3ff518bd15/mapnik/{z}/{x}/{y}.mvt"
        ],
        "maxzoom": 18
      }
    },
    "layers": [
      {
        "id": "layer0-cat0",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 0],
        "paint": {
          "fill-color": "#A6CEE3",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat1",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 142],
        "paint": {
          "fill-color": "#1F78B4",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat2",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 150],
        "paint": {
          "fill-color": "#B2DF8A",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat3",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 19],
        "paint": {
          "fill-color": "#33A02C",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat4",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 2],
        "paint": {
          "fill-color": "#FB9A99",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat5",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["==", "region", 9],
        "paint": {
          "fill-color": "#E31A1C",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-borders",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "line",
        "paint": {
          "line-width": 0.5,
          "line-color": '#FFF',
          "line-opacity": 1
        }
      }
    ]
  },
  choropleth: {
    "version": 7,
    "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
    "constants": {
      "@sans": "Open Sans Regular, Arial Unicode MS Regular",
      "@medium-label": "#f27a87",
      "@small-label": "#384646",
      "@label-halo": "rgba(255,255,255,0.5)",
      "@label-halo-dark": "rgba(0,0,0,0.2)",
      "@land": "#ededed",
      "@water": "#7acad0",
      "@province": "#FF6600"
    },
    "sources": {
      "cartodb": {
        "type": "vector",
        "tiles": [
          "http://rochoa.cartodb.com/api/v1/map/named/tpl_1adb092a_6b52_11e5_bc85_0e3ff518bd15/mapnik/{z}/{x}/{y}.mvt"
        ],
        "maxzoom": 18
      }
    },
    "layers": [
      {
        "id": "layer0-cat0",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 1638094],
        "paint": {
          "fill-color": "#B10026",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat1",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 91077],
        "paint": {
          "fill-color": "#E31A1C",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat2",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 39730],
        "paint": {
          "fill-color": "#FC4E2A",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat3",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 17652],
        "paint": {
          "fill-color": "#FD8D3C",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat4",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 7162],
        "paint": {
          "fill-color": "#FD8D3C",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat5",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 2281],
        "paint": {
          "fill-color": "#FED976",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-cat6",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "filter": ["<=", "area", 80],
        "paint": {
          "fill-color": "#FFFFB2",
          "fill-opacity": 0.7
        }
      },
      {
        "id": "layer0-borders",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "line",
        "paint": {
          "line-width": 0.5,
          "line-color": '#FFF',
          "line-opacity": 1
        }
      }
    ]
  },
  raster: {
    "version": 7,
    "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
    "constants": {
      "@sans": "Open Sans Regular, Arial Unicode MS Regular",
      "@medium-label": "#f27a87",
      "@small-label": "#384646",
      "@label-halo": "rgba(255,255,255,0.5)",
      "@label-halo-dark": "rgba(0,0,0,0.2)",
      "@land": "#ededed",
      "@water": "#7acad0",
      "@province": "#FF6600"
    },
    "sources": {
      "cartodb-light_nolabels": {
        "type": "raster",
        "tiles": [
          "http://all.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        ],
        "tileSize": 256
      },

      "cartodb-light_labels": {
        "type": "raster",
        "tiles": [
          "http://all.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
        ],
        "tileSize": 256
      },

      "cartodb": {
        "type": "vector",
        "tiles": [
          "http://rochoa.cartodb.com/api/v1/map/named/tpl_1adb092a_6b52_11e5_bc85_0e3ff518bd15/mapnik/{z}/{x}/{y}.mvt"
        ],
        "maxzoom": 18
      }
    },
    "layers": [
      {
        "id": "basemap",
        "type": "raster",
        "source": "cartodb-light_nolabels",
        "minzoom": 0,
        "maxzoom": 22
      },
      {
        "id": "layer0",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "fill",
        "paint": {
          "fill-color": "#FF6600",
          "fill-opacity": 0.4
        }
      },
      {
        "id": "layer0-borders",
        "source": "cartodb",
        "source-layer": "layer0",
        "type": "line",
        "paint": {
          "line-width": 1,
          "line-color": '#FFF',
          "line-opacity": 1
        }
      },
      {
        "id": "labels",
        "type": "raster",
        "source": "cartodb-light_labels",
        "minzoom": 0,
        "maxzoom": 22
      }
    ]
  }
};
