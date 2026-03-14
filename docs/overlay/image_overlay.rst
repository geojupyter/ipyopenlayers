Image Overlay
=============

The `ImageOverlay` class in `ipyopenlayers` allows you to overlay images on your map. This can be useful for adding custom imagery, annotations, or other visual information to your map. The `ImageOverlay` provides a way to specify the bounds of the image in geographic coordinates and the URL of the image to be displayed.

The image bounds are defined by two sets of coordinates, typically representing the southwest and northeast corners of the image. These bounds determine where the image will be placed on the map, ensuring it scales and aligns correctly with the geographic area it represents.

Key Features
------------

- **Custom Imagery**: Overlay any image on the map, which can be useful for displaying custom data, annotations, or other visuals.
- **Flexible Position**: Precisely control where the image appears on the map by specifying its center.
- **Dynamic Updates**: The overlay can be updated dynamically, allowing for interactive and responsive map displays.

Example
-------

Below is an example of how to use the `ImageOverlay` class to add an image to your `ipyopenlayers` map:

.. jupyter-execute::

    from ipyopenlayers import Map, TileLayer, ImageOverlay,RasterTileLayer

    # Create a map centered at coordinates [0.0, 0.0] with zoom level 2
    m = Map(center=[0.0, 0.0], zoom=2)
    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)

    # Display the map
    display(m)

    # Create an ImageOverlay with specified bounds and image URL
    image = ImageOverlay(
        position=[0, 0],
        image_url="https://i.imgur.com/06Q1fSz.png"
    )

    # Add the ImageOverlay to the map
    m.add_overlay(image)

Attributes
----------

.. autoclass:: ipyopenlayers.openlayers.ImageOverlay
   :members:
