Video Overlay
=============

The `VideoOverlay` class in `ipyopenlayers` allows you to overlay videos on your map. This feature is useful for adding dynamic visual content, such as animated data visualizations, real-time footage, or other video elements to your map. The `VideoOverlay` provides options to specify the geographic position and the URL of the video to be displayed.

Key Features
------------

- **Dynamic Content**: Overlay videos on the map to display animated data, real-time footage, or any other video content.
- **Flexible Positioning**: Specify the geographic position where the video should be displayed.
- **Interactive Updates**: The video overlay can be updated dynamically, allowing for interactive and responsive map displays.

Example
-------

Below is an example of how to use the `VideoOverlay` class to add a video to your `ipyopenlayers` map:

.. jupyter-execute::

    from ipyopenlayers import Map, RasterTileLayer, VideoOverlay

    # Create a map centered at coordinates [0.0, 0.0] with zoom level 2
    m = Map(center=[0.0, 0.0], zoom=2)
    # Add layer
    layer=RasterTileLayer()
    m.add_layer(layer)

    # Display the map
    display(m)

    # Create a VideoOverlay and set its position and video URL
    video = VideoOverlay(
        position=[0, 0],
        video_url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
    )

    # Add the VideoOverlay to the map
    m.add_overlay(video)

Attributes
----------

.. autoclass:: ipyopenlayers.openlayers.VideoOverlay
   :members:
