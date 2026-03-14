Popup Overlay
=============

The `PopupOverlay` class in `ipyopenlayers` allows you to create and manage popups on your map. Popups are useful for displaying additional information, annotations, or interactive elements when a specific point on the map is clicked or hovered over. The `PopupOverlay` class provides options to specify the position of the popup and its content.

Key Features
------------

- **Informative**: Display additional information or annotations at specific points on the map.
- **Interactive**: Popups can contain HTML content, making them highly customizable and interactive.
- **Dynamic Updates**: The content and position of the popup can be updated dynamically, allowing for interactive and responsive map displays.

Example
-------

Below is an example of how to use the `PopupOverlay` class to add a popup to your `ipyopenlayers` map:

.. jupyter-execute::

    from ipyopenlayers import Map, PopupOverlay,RasterTileLayer

    # Create a map centered at coordinates [0.0, 0.0] with zoom level 2
    m = Map(center=[-11.844178003179724, 37.31477334221525], zoom=0)

    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)

    # Display the map
    display(m)

    # Create a PopupOverlay and set its position and content
    popup = PopupOverlay(position=[-120.06694821433305, 40.70520249808547], popup_content = 'United States of America')

    # Add the PopupOverlay to the map
    m.add_overlay(popup)

Attributes
----------

.. autoclass:: ipyopenlayers.openlayers.PopupOverlay
   :members:
