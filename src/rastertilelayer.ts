// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';
import { MODULE_NAME, MODULE_VERSION } from './version';
import { MapView } from './widget';
import { LayerModel, LayerView } from './layer';

export class RasterTileLayerModel extends LayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: RasterTileLayerModel.model_name,
      _model_module: RasterTileLayerModel.model_module,
      _model_module_version: RasterTileLayerModel.model_module_version,
      _view_name: RasterTileLayerModel.view_name,
      _view_module: RasterTileLayerModel.view_module,
      _view_module_version: RasterTileLayerModel.view_module_version,
      layers: [],
      url: '',
      attributions: [],
      tileSize: 256,
      max_zoom: 19,
      min_zoom: 0,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'RasterTileLayerModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'RasterTileLayerView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class RasterTileLayerView extends LayerView {
  map_view: MapView;

  render() {
    super.render();
    this.urlChanged();
    this.model.on('change:url', this.urlChanged, this);
  }

  create_obj() {
    this.obj = this.tileLayer = new TileLayer({
      source: new XYZ({
        url: this.model.get('url'),
        attributions: this.model.get('attributions'),
        tileSize: this.model.get('tileSize'),
        maxZoom: this.model.get('max_zoom'),
        minZoom: this.model.get('min_zoom'),
      }),
    });
  }

  urlChanged() {
    const newUrl = this.model.get('url');
    if (newUrl) {
      const newSource = new XYZ({
        url: newUrl,
        attributions: this.model.get('attributions'),
        tileSize: this.model.get('tileSize'),
        maxZoom: this.model.get('max_zoom'),
        minZoom: this.model.get('min_zoom'),
      });
      this.tileLayer.setSource(newSource);
    }
  }

  tileLayer: TileLayer<XYZ>;
}
