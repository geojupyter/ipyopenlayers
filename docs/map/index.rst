Map
===
The `Map` class in `ipyopenlayers` serves as the primary widget for rendering interactive maps in Jupyter notebooks. It allows users to visualize and interact with geographic data by adding various layers, overlays, and controls. With support for custom basemaps and dynamic updates, the `Map` widget provides a powerful tool for geographic data analysis and visualization.


Example
-------

.. jupyter-execute::

    from ipyopenlayers import Map,RasterTileLayer

    m = Map(
        center=[0, 0],
        zoom=2
    )
    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)


    # Display the map
    m

Usage
-----

You can add multiple layers, overlays, and controls to the map using the `add` methods. All of these components are widgets themselves, allowing you to dynamically update their attributes from Python or by interacting with the map on the page.

As a Jupyter interactive widget, the layout of the Map object is specified by its `Layout` attribute. For more details, see the section on Layout and Styling of Jupyter widgets.

You can use multiple basemaps by manually creating `TileLayer` objects and passing them to the `Map` constructor.

Attributes and methods
----------------------

.. autoclass:: ipyopenlayers.openlayers.Map
   :members:
