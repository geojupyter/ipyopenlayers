GeoJSON Layer
=============

The `GeoJSON` class in `ipyopenlayers` allows you to display GeoJSON data on your map. GeoJSON is a widely-used format for encoding a variety of geographic data structures, including points, lines, and polygons.

The `GeoJSON` layer can be styled dynamically and its visibility can be controlled. This makes it a powerful tool for visualizing geographic data in a web map.

Key Features
------------

- **GeoJSON Support**: Integrate and display GeoJSON data on your map.
- **Custom Styling**: Style features based on their type with flexible options.
- **Visibility Control**: Show or hide the layer as needed.

Example
-------

`Example 1`

Below is an example of how to use the `GeoJSON` class to add a GeoJSON layer to your map:

.. jupyter-execute::

    from ipyopenlayers import Map, GeoJSON,RasterTileLayer

    # Create a map centered at the specified coordinates with a zoom level of 4
    m = Map(center=[-75.05936205186516, 41.214094701931344], zoom=4)

    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)

    # Define GeoJSON data and style
    geojson_data = {
        'type': 'FeatureCollection',
        'features': [
            # Point feature
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-74.006, 40.7128],  # Longitude, Latitude for New York City
                },
                'properties': {
                    'name': 'New York City',
                    'population': 8419000,
                    'description': 'The largest city in the United States by population.',
                },
            },
            # LineString feature
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [-74.006, 40.7128],  # Start point (New York City)
                        [-118.2437, 34.0522]  # End point (Los Angeles)
                    ],
                },
                'properties': {
                    'name': 'Route from NYC to LA',
                    'distance_km': 3940,
                },
            },
            # Polygon feature
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [-73.935242, 40.730610],  # Point A
                            [-73.935242, 40.800610],  # Point B
                            [-73.865242, 40.800610],  # Point C
                            [-73.865242, 40.730610],  # Point D
                            [-73.935242, 40.730610],  # Point A (closed loop)
                        ]
                    ],
                },
                'properties': {
                    'name': 'Sample Polygon Area',
                    'type': 'Park',
                    'description': 'A polygon representing a park area.',
                },
            },
            # MultiPolygon feature
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'MultiPolygon',
                    'coordinates': [
                        [
                            [
                                [-73.945242, 40.710610],  # Polygon 1
                                [-73.945242, 40.780610],
                                [-73.875242, 40.780610],
                                [-73.875242, 40.710610],
                                [-73.945242, 40.710610],
                            ]
                        ],
                        [
                            [
                                [-74.015242, 40.710610],  # Polygon 2
                                [-74.015242, 40.780610],
                                [-73.945242, 40.780610],
                                [-73.945242, 40.710610],
                                [-74.015242, 40.710610],
                            ]
                        ],
                    ],
                },
                'properties': {
                    'name': 'MultiPolygon Example',
                    'description': 'An example of a MultiPolygon feature.',
                },
            },
        ],
    }


    geojson_style = {
        'Point': {
            'radius': 8,
            'fillColor': '#ff7800',
            'color': '#000',
            'weight': 2,
            'opacity': 1,
            'fillOpacity': 0.8,
        },
        'LineString': {
            'color': '#00f',
            'weight': 3,
            'opacity': 0.8,
        },
        'Polygon': {
            'strokeColor': '#00f',
            'strokeWidth': 2,
            'strokeOpacity': 0.8,
            'fillColor': '#ff7800',
            'fillOpacity': 0.5,
        },
        'MultiPolygon': {
            'strokeColor': '#f00',
            'strokeWidth': 2,
            'strokeOpacity': 0.8,
            'fillColor': '#0f0',
            'fillOpacity': 0.4,
        },
    }

    # Create and add a GeoJSON layer to the map
    widget = GeoJSON(
        data=geojson_data,
        style=geojson_style,
        visible=True
    )
    m.add_layer(widget)

    # Display the map
    m

`Example 2`

Below is second example of how to use the `GeoJSON` class to add a Json file data to your map:


.. jupyter-execute::

    import requests
    import os
    import json
    from ipyopenlayers import Map, GeoJSON,RasterTileLayer

    # the GeoJSON file
    if not os.path.exists('europe_110.geo.json'):
        url = 'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/europe_110.geo.json'
        r = requests.get(url)
        with open('europe_110.geo.json', 'w') as f:
            f.write(r.content.decode("utf-8"))

    # Read the GeoJSON file
    with open('europe_110.geo.json', 'r') as f:
        data = json.load(f)

    # Create a map with coordinates centered on Europe
    m = Map(center=[2.292993630573249, 49.62376705148722], zoom=0)  # Note the coordinate order: [latitude, longitude]

    # Add the GeoJSON layer with the defined style
    geo_json = GeoJSON(
        data=data
    )

    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)


    # Add the GeoJSON layer to the map
    m.add_layer(geo_json)

    m



Attributes
----------

.. autoclass:: ipyopenlayers.openlayers.GeoJSON
   :members:
