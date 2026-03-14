Fullscreen Control
==================


The Fullscreen Control in `ipyopenlayers` allows users to toggle the map view between fullscreen and windowed modes. This control enhances the user experience by providing an easy way to expand the map to occupy the entire screen.


Example
-------


.. jupyter-execute::


   from ipyopenlayers import Map, FullScreen, RasterTileLayer


   # Create a map with initial zoom level and center coordinates
   m = Map(center=[0, 0], zoom=2)

   # Add layer
   layer=RasterTileLayer()
   m.add_layer(layer)

   # Add a FullscreenControl to the map
   fullscreen_control = FullScreen()
   m.add_control(fullscreen_control)


   # Display the map
   m




Attributes
----------


.. autoclass:: ipyopenlayers.openlayers.FullScreen
  :members:
