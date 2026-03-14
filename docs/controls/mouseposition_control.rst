Mouse Position Control
======================


The Mouse Position Control in `ipyopenlayers` shows the geographical coordinates of the mouse pointer on the map. This control is useful for users who need to know the precise location of their cursor within the map view.


Example
-------


.. jupyter-execute::


   from ipyopenlayers import Map, MousePosition, RasterTileLayer


   # Create a map with initial zoom level and center coordinates
   m = Map(center=[0, 0], zoom=2)

   # Add layer
   layer=RasterTileLayer()
   m.add_layer(layer)


   # Add a MousePositionControl to the map
   mouseposition_control = MousePosition()
   m.add_control(mouseposition_control)


   # Display the map
   m




Attributes
----------


.. autoclass:: ipyopenlayers.openlayers.MousePosition
  :members:
