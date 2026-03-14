VectorTileLayer
===============

The `VectorTileLayer` class in `ipyopenlayers` allows you to add vector tiles to your map. This class is designed to handle vector data in various formats, such as TopoJSON, GeoJSON, and Mapbox Vector Tile (MVT). Vector tiles provide a scalable way to render complex vector data on a map, allowing for dynamic styling and interaction.

Key Features
------------

- **Custom Vector Data**: Display custom vector tiles from various sources.
- **Flexible Data Formats**: Supports multiple vector data formats including TopoJSON, GeoJSON, and MVT.
- **Dynamic Styling**: Apply and update styles dynamically based on feature properties.
- **Attribution Control**: Add attributions for the tile sources used.

Example
-------

Below is an example of how to use the `VectorTileLayer` class to add vector tiles to your `ipyopenlayers` map:

.. jupyter-execute::

    from ipyopenlayers import Map, VectorTileLayer

    # Create a map centered at coordinates [0, 0] with zoom level 0
    m = Map(center=[0, 0], zoom=0)

    # Add a VectorTileLayer to the map
    vector_layer =  VectorTileLayer(
    url='https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf',
    source_format={
        'type': 'MVT',
    }
    )
    m.add_layer(vector_layer)

    # Display the map
    m


Attributes
----------

The `VectorTileLayer` provides several attributes to configure the layer:

.. autoclass:: ipyopenlayers.openlayers.VectorTileLayer
   :members:
