#!/usr/bin/env python
# coding: utf-8

# Copyright (c) QuantStack.
# Distributed under the terms of the Modified BSD License.

from ipywidgets import DOMWidget, Widget, widget_serialization, CallbackDispatcher
from traitlets import Unicode, List, Instance, CFloat, Bool, Dict, Int, Float
from ._frontend import module_name, module_version

def_loc = [0.0, 0.0]


class Layer(Widget):
    """Base class for all layers on the map.
    """

    _model_name = Unicode('LayerModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('LayerView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

class TileLayer(Layer):
    """The TileLayer class serves as the foundational class for both raster and vector tile layers.

    Attributes
    ----------
    url: str
        The URL template for the tile images.
    attribution: str, default ""
        Attribution text for the tile layer.
    opacity: float, default 1.0
        Opacity of the tile layer, between 0.0 and 1.0.
    visible: bool, default True
        Whether the layer is visible or not.
    min_zoom: int, default 0
        Minimum zoom level for the layer.
    max_zoom: int, default 18
        Maximum zoom level for the layer.
    source_format: dict
        Additional format options for the tile source.
    """

    url = Unicode('https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png').tag(sync=True)
    attribution = Unicode("").tag(sync=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)
    min_zoom = Int(0).tag(sync=True)
    max_zoom = Int(18).tag(sync=True)
    source_format = Dict().tag(sync=True)

class GeoTIFFTileLayer(Layer):
    """GeoTIFFTileLayer class for WebGL-based GeoTIFF raster tiles.

    Attributes
    ----------
    url: str, default ""
        The URL for the WebGL-based GeoTIFF tiles.
    """
    _model_name = Unicode('GeoTIFFTileLayerModel').tag(sync=True)
    _view_name = Unicode('GeoTIFFTileLayerView').tag(sync=True)
    url = Unicode('').tag(sync=True)


class RasterTileLayer(TileLayer):
    """RasterTileLayer class for WebGL-based raster tiles.

    Inherits from TileLayer and provides additional functionality for rendering
    raster tiles using WebGL.
    """

    _view_name = Unicode('RasterTileLayerView').tag(sync=True)
    _model_name = Unicode('RasterTileLayerModel').tag(sync=True)


class VectorTileLayer(TileLayer):
    """VectorTileLayer class for vector tiles.
    Inherits from TileLayer and provides additional functionality for vector tiles.

    Attributes
    ----------
    style: dict
        Style options for vector tiles.
    """

    _view_name = Unicode('VectorTileLayerView').tag(sync=True)
    _model_name = Unicode('VectorTileLayerModel').tag(sync=True)
    style = Dict({}).tag(sync=True)

class GeoJSON(Layer):
    """GeoJSON class for GeoJSON data layers.

    Attributes
    ----------
    data: dict
        The GeoJSON data for the layer.
    style: dict
        Style options for the GeoJSON data.
    visible: bool, default True
        Whether the layer is visible or not.
    """

    _view_name = Unicode('OpenLayersGeoJSONView').tag(sync=True)
    _model_name = Unicode('OpenLayersGeoJSONModel').tag(sync=True)
    data = Dict({}).tag(sync=True)
    style = Dict({}).tag(sync=True)
    visible = Bool(True).tag(sync=True)


class HeatmapLayer(Layer):
    """HeatmapLayer class for heatmap visualization.

    Attributes
    ----------
    points: list of lists [latitude, longitude, weight]
        A list of data points to be displayed on the heatmap, The weight determines the intensity of the heatmap at that point.
    blur: int, default 15
        Specifies the blur radius for the heatmap The blur controls the smoothness of the heatmap, with higher values creating more diffuse effects
    radius: int, default 8
        The radius of each point in the heatmap, affects how large each data point appears on the map
    """
    _view_name = Unicode('HeatmapLayerView').tag(sync=True)
    _model_name = Unicode('HeatmapLayerModel').tag(sync=True)
    points= List([]).tag(sync=True)
    blur =Int(15).tag(sync=True)
    radius = Int(8).tag(sync=True)


class BaseOverlay(DOMWidget):
    """Base class for overlays on the map.

    Attributes
    ----------
    position: list of float, default [0, 0]
        The position of the overlay on the map (it's center).
    """

    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    position = List([0, 0]).tag(sync=True)

class ImageOverlay (BaseOverlay):
    """ImageOverlay class.

     Image layer from a local or remote image file.

    Attributes
    ----------
    image_url: string, default ""
        Url to the local or remote image file.
    position: list, default [0., 0]
        center of the image.
    """
    _view_name = Unicode('ImageOverlayView').tag(sync=True)
    _model_name = Unicode('ImageOverlayModel').tag(sync=True)
    image_url = Unicode('').tag(sync=True)

class VideoOverlay (BaseOverlay):
    """VideoOverlay class.

     Video layer from a local or remote video file.

    Attributes
    ----------
    video_url: string, default ""
        Url to the local or remote image file.
    position: list, default [0., 0]
        center of the video.
    """
    _view_name = Unicode('VideoOverlayView').tag(sync=True)
    _model_name = Unicode('VideoOverlayModel').tag(sync=True)
    video_url = Unicode('').tag(sync=True)

class PopupOverlay (BaseOverlay):
    """PopupOverlay class.


    Attributes
    ----------
    popup_content: string, default ""
        Content to display.
    position: list, default [0., 0]
        position of the popup.
    """
    _view_name = Unicode('PopupOverlayView').tag(sync=True)
    _model_name = Unicode('PopupOverlayModel').tag(sync=True)
    popup_content = Unicode('').tag(sync=True)

class BaseControl(DOMWidget):
    """BaseControl abstract class.

    This is the base class for all ipyopenlayers controls. A control is additional
    UI components on top of the Map.

    """
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

class ZoomSlider(BaseControl):
    """ZoomSlider class for adding a zoom slider control to the map.
    """
    _view_name = Unicode('ZoomSliderView').tag(sync=True)
    _model_name = Unicode('ZoomSliderModel').tag(sync=True)

class FullScreen(BaseControl):
    """FullScreen class, with Control as parent class.

    A control which contains a button that will put the Map in
    full-screen when clicked.
    """
    _view_name = Unicode('FullScreenView').tag(sync=True)
    _model_name = Unicode('FullScreenModel').tag(sync=True)


class ScaleLine(BaseControl):
    """ScaleLine class for adding a scale line control to the map.
    """
    _view_name = Unicode('ScaleLineView').tag(sync=True)
    _model_name = Unicode('ScaleLineModel').tag(sync=True)



class MousePosition(BaseControl):
    """MousePosition class for displaying the mouse position on the map.
    """
    _view_name = Unicode('MousePositionView').tag(sync=True)
    _model_name = Unicode('MousePositionModel').tag(sync=True)


class Map(DOMWidget):
    """Map class.

    The Map class is the main widget in ipyopenlayers.

    Attributes
    ----------
    layers: list of Layer instances
        The list of layers that are currently on the map.
    controls: list of Control instances
        The list of controls that are currently on the map.
    overlays: list of Overlay instances
        The list of Overlays that are currently on the map.
    center: list, default [0, 0]
        The current center of the map.
    zoom: float, default 2
        The current zoom value of the map."""

    _model_name = Unicode('MapModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('MapView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    center = List(def_loc).tag(sync=True, o=True)
    zoom = CFloat(2).tag(sync=True, o=True)
    layers = List(Instance(Layer)).tag(sync=True, **widget_serialization)
    overlays=List(Instance(BaseOverlay)).tag(sync=True, **widget_serialization)
    controls=List(Instance(BaseControl)).tag(sync=True, **widget_serialization)
    _click_callbacks = Instance(CallbackDispatcher, ())




    def __init__(self, center=None, zoom=None, **kwargs):
        """Initialize the Map with optional center and zoom level.

        Parameters
        ----------
        center: list of float, optional
            The initial center of the map.
        zoom: float, optional
            The initial zoom level of the map.
        """
        super().__init__(**kwargs)
        self.on_msg(self._handle_mouse_events)
        if center is not None:
            self.center = center
        if zoom is not None:
            self.zoom = zoom

    def __repr__(self):
        """Return a string representation of the Map instance."""
        return f"Map(center={self.center}, zoom={self.zoom})"

    def add_layer(self, layer):
        """Add a layer on the map.

        Parameters
        ----------
        layer: Layer instance
            The new layer to add.
        """
        self.layers = self.layers + [layer]

    def add_overlay(self, overlay):
        """Add an overlay to the map.

        Parameters
        ----------
        overlay: BaseOverlay instance
            The overlay to add.
        """
        self.overlays = self.overlays + [overlay]

    def remove_layer(self, layer):
        """Remove a layer from the map.

        Parameters
        ----------
        layer: Layer instance
            The layer to remove.
        """
        self.layers = [x for x in self.layers if x != layer]

    def remove_overlay(self, overlay):
        """Remove an overlay from the map.

        Parameters
        ----------
        overlay: BaseOverlay instance
            The overlay to remove.
        """
        self.overlays = [x for x in self.overlays if x != overlay]

    def add_control(self, control):
        """Add a control on the map.

        Parameters
        ----------
        control: Control instance
            The new control to add.
        """
        self.controls = self.controls + [control]

    def remove_control(self, control):
        """Remove a control from the map.

        Parameters
        ----------
        control: Control instance
            The control to remove.
        """
        self.controls = [x for x in self.controls if x != control]


    def clear_layers(self):
        """Remove all layers from the map.

        """
        self.layers = []

    def _handle_mouse_events(self, _, content, buffers):
        """Handle mouse events and trigger click callbacks.
        """
        event_type = content.get("type", "")
        if event_type == "click":
            self._click_callbacks(**content)

    def on_click(self, callback, remove=False):
        """Add a click event listener.
        """
        self._click_callbacks.register_callback(callback, remove=remove)
