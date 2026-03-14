RasterTileLayer
===============

The `RasterTileLayer` class in `ipyopenlayers` allows you to add raster tiles to your map. This class extends the `TileLayer` class, providing additional functionality and customization options for raster tile layers. The `RasterTileLayer` specifically uses WebGL tiles for efficient rendering and performance.

Key Features
------------

- **Custom Imagery**: Display custom raster tiles from various sources.
- **WebGL Rendering**: Utilize WebGL tiles for improved rendering performance.
- **Flexible Options**: Configure properties such as opacity, visibility, and zoom levels.
- **Attribution Control**: Add attributions for the tile sources used.

Example
-------

Below is an example of how to use the `RasterTileLayer` class to add raster tiles to your `ipyopenlayers` map:

.. jupyter-execute::

    from ipyopenlayers import Map, RasterTileLayer

    # Create a map centered at coordinates [0, 0] with zoom level 0
    m = Map(center=[0, 0], zoom=0)

    # Add a RasterTileLayer to the map
    layer = RasterTileLayer(url="https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png")
    m.add_layer(layer)

    # Display the map
    m



Attributes
----------

The `RasterTileLayer` inherits attributes from the `TileLayer` class and provides additional configuration options.

.. autoclass:: ipyopenlayers.openlayers.RasterTileLayer
   :members:
