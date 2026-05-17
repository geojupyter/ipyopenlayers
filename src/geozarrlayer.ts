// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import WebGLTileLayer from 'ol/layer/WebGLTile.js';
import GeoZarr from 'ol/source/GeoZarr.js';
import { MODULE_NAME, MODULE_VERSION } from './version';
import { LayerModel, LayerView } from './layer';

export class GeoZarrTileLayerModel extends LayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: GeoZarrTileLayerModel.model_name,
      _model_module: GeoZarrTileLayerModel.model_module,
      _model_module_version: GeoZarrTileLayerModel.model_module_version,
      _view_name: GeoZarrTileLayerModel.view_name,
      _view_module: GeoZarrTileLayerModel.view_module,
      _view_module_version: GeoZarrTileLayerModel.view_module_version,
      url: '',
      bands: [],
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'GeoZarrTileLayerModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'GeoZarrTileLayerView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class GeoZarrTileLayerView extends LayerView {
  render() {
    super.render();
    this.sourcesChanged();
    this.model.on('change:url', this.sourcesChanged, this);
    this.model.on('change:bands', this.sourcesChanged, this);
  }

  create_obj(): void {
    this.obj = new WebGLTileLayer({
      source: this.createSource(),
    });
  }

  createSource() {
    const url = this.model.get('url');
    const bands = this.model.get('bands');
    if (url) {
      return new GeoZarr({
        url: url,
        bands: bands,
      });
    }
  }

  sourcesChanged() {
    const newSource = this.createSource();
    if (newSource && this.obj) {
      this.obj.setSource(newSource);
    }
  }

  obj: WebGLTileLayer;
}
