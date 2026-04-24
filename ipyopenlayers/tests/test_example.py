#!/usr/bin/env python

# Copyright (c) QuantStack.
# Distributed under the terms of the Modified BSD License.

import pytest
from traitlets import TraitError

from ..openlayers import (
    FullScreen,
    GeoTIFFTileLayer,
    ImageOverlay,
    Map,
    MousePosition,
    RasterTileLayer,
    ScaleLine,
    VectorTileLayer,
    ZoomSlider,
)


def test_example_creation_blank():
    w = Map()
    assert w.zoom == 0
    assert w.center == [0, 0]  # Add assertion for center if needed


def test_add_layer():
    m = Map()
    m.add_layer(RasterTileLayer())
    assert m.zoom == 0
    assert len(m.layers) == 1
    assert isinstance(m.layers[0], RasterTileLayer)


def test_add_multiple_layers():
    m = Map()
    m.add_layer(RasterTileLayer())
    m.add_layer(GeoTIFFTileLayer())
    m.add_layer(VectorTileLayer())
    assert len(m.layers) == 3
    assert isinstance(m.layers[0], RasterTileLayer)
    assert isinstance(m.layers[1], GeoTIFFTileLayer)
    assert isinstance(m.layers[2], VectorTileLayer)


def test_remove_layer():
    m = Map()
    layer = RasterTileLayer()
    m.add_layer(layer)
    assert len(m.layers) == 1
    m.remove_layer(layer)
    assert len(m.layers) == 0


def test_clear_layers():
    m = Map()
    m.add_layer(RasterTileLayer())
    m.add_layer(GeoTIFFTileLayer())
    m.add_layer(VectorTileLayer())
    assert len(m.layers) == 3
    m.clear_layers()
    assert len(m.layers) == 0


def test_add_overlay():
    m = Map()
    overlay = ImageOverlay()
    m.add_overlay(overlay)
    assert len(m.overlays) == 1
    assert isinstance(m.overlays[0], ImageOverlay)  # Ensure correct overlay type


def test_remove_overlay():
    m = Map()
    overlay = ImageOverlay()
    m.add_overlay(overlay)
    assert len(m.overlays) == 1
    m.remove_overlay(overlay)
    assert len(m.overlays) == 0


def test_add_control():
    m = Map()
    control = ZoomSlider()
    m.add_control(control)
    assert len(m.controls) == 1
    assert isinstance(m.controls[0], ZoomSlider)  # Ensure correct control type


def test_remove_control():
    m = Map()
    control = ZoomSlider()
    m.add_control(control)
    assert len(m.controls) == 1
    m.remove_control(control)
    assert len(m.controls) == 0


def test_add_multiple_controls():
    m = Map()
    m.add_control(ZoomSlider())
    m.add_control(FullScreen())
    m.add_control(ScaleLine())
    m.add_control(MousePosition())
    assert len(m.controls) == 4
    assert isinstance(m.controls[0], ZoomSlider)
    assert isinstance(m.controls[1], FullScreen)
    assert isinstance(m.controls[2], ScaleLine)
    assert isinstance(m.controls[3], MousePosition)


def test_update_center():
    m = Map()
    new_center = [30.0, 40.0]
    m.center = new_center
    assert m.center == new_center


def test_update_zoom():
    m = Map()
    new_zoom = 10
    m.zoom = new_zoom
    assert m.zoom == new_zoom


def test_adding_invalid_layer_raises_error():
    m = Map()
    with pytest.raises(TraitError):
        m.add_layer("invalid layer")


def test_adding_invalid_overlay_raises_error():
    m = Map()
    with pytest.raises(TraitError):
        m.add_overlay("invalid overlay")


def test_adding_invalid_control_raises_error():
    m = Map()
    with pytest.raises(TraitError):
        m.add_control("invalid control")
