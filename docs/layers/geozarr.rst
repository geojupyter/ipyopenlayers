GeoZarr Tile Layer
==================

The `GeoZarrTileLayer` class in `ipyopenlayers` provides a way to display GeoZarr datasets on your map. GeoZarr is a cloud-native raster data format that supports georeferenced multi-band data, making it useful for satellite imagery and other geospatial raster datasets.

The `GeoZarrTileLayer` class leverages WebGL for rendering, allowing for efficient handling of large raster datasets.

Key Features
------------

- **GeoZarr Support**: Easily integrate GeoZarr files into your map.
- **Multi-band Rendering**: Select bands such as Sentinel-2 ``b04``, ``b03``, and ``b02`` for true-color composites.
- **WebGL Rendering**: Utilizes WebGL for efficient rendering of large raster datasets.
- **Dynamic Updates**: Update the layer dynamically by changing the URL, bands.

Example
-------
Below is an example of how to use the `GeoZarrTileLayer` class to add a GeoZarr layer to your map:

.. code-block:: python

    from ipyopenlayers import Map, GeoZarrTileLayer,RasterTileLayer

    # Create a map centered at the specified coordinates with a zoom level of 7.5
    m = Map(center=[-20, 63.5], zoom=7.5)

    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)

    # Create and add a GeoZarrTileLayer to the map
    geo_zarr_layer = GeoZarrTileLayer(
        url="https://s3.explorer.eopf.copernicus.eu/esa-zarr-sentinel-explorer-fra/tests-output/sentinel-2-l2a/S2B_MSIL2A_20260120T125339_N0511_R138_T27VWL_20260120T131151.zarr/measurements/reflectance",
        bands=["b04", "b03", "b02"],
    )
    m.add_layer(geo_zarr_layer)

    # Display the map
    m

Notes
-----

For Sentinel-2 true-color rendering, use:

- ``b04`` for red
- ``b03`` for green
- ``b02`` for blue

The URL should include the GeoZarr group path, for example:

``store.zarr/measurements/reflectance``

Attributes
----------

.. autoclass:: ipyopenlayers.openlayers.GeoZarrTileLayer
   :members:
