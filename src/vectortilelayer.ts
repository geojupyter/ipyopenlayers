// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MODULE_NAME, MODULE_VERSION } from './version';
import { LayerModel, LayerView } from './layer';
import { createXYZ } from 'ol/tilegrid';
import MVT from 'ol/format/MVT';
import GeoJSON from 'ol/format/GeoJSON';
import TopoJSON from 'ol/format/TopoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { StyleFunction } from 'ol/style/Style';

export class VectorTileLayerModel extends LayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: VectorTileLayerModel.model_name,
      _model_module: VectorTileLayerModel.model_module,
      _model_module_version: VectorTileLayerModel.model_module_version,
      _view_name: VectorTileLayerModel.view_name,
      _view_module: VectorTileLayerModel.view_module,
      _view_module_version: VectorTileLayerModel.view_module_version,
      features: [],
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'VectorTileLayerModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'VectorTileLayerView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class VectorTileLayerView extends LayerView {
  obj: VectorTileLayer<any>;
  render() {
    super.render();
    this.model.on('change:url', this.urlChanged, this);
    this.model.on('change:style', this.styleChanged, this);
    this.model.on('change:visible', this.visibilityChanged, this);
    this.model.on('change:opacity', this.opacityChanged, this);
    this.model.on('change:attribution', this.attributionChanged, this);
    this.model.on('change:max_zoom', this.maxZoomChanged, this);
    this.model.on('change:min_zoom', this.minZoomChanged, this);
  }
  create_obj() {
    this.urlChanged();
    this.styleChanged();
    this.visibilityChanged();
    this.opacityChanged();
    this.attributionChanged();
    this.maxZoomChanged();
    this.minZoomChanged();
  }

  urlChanged() {
    const newUrl = this.model.get('url');

    if (newUrl) {
      const sourceFormat = this.model.get('source_format') || { type: 'MVT' };
      let format: any;

      switch (sourceFormat.type) {
        case 'MVT':
          format = new MVT({
            layerName: sourceFormat.layer_name,
            layers: sourceFormat.layers,
          });
          break;
        case 'GeoJSON':
          format = new GeoJSON({
            dataProjection: sourceFormat.dataProjection || 'EPSG:4326',
            featureProjection: sourceFormat.featureProjection,
            geometryName: sourceFormat.geometry_name,
            extractGeometryName: sourceFormat.extractGeometryName || false,
          });
          break;
        case 'TopoJSON':
          format = new TopoJSON({
            dataProjection: sourceFormat.dataProjection || 'EPSG:4326',
            layerName: sourceFormat.layer_name,
            layers: sourceFormat.layers,
          });
          break;
        default:
          format = new MVT({
            layerName: sourceFormat.layer_name,
            layers: sourceFormat.layers,
          });
          break;
      }

      const vectorTileSource: VectorTileSource<any> = new VectorTileSource({
        format: format,
        url: newUrl,
        tileGrid: createXYZ({ maxZoom: 19 }),
        attributions: this.model.get('attribution'),
        maxZoom: this.model.get('max_zoom'),
        minZoom: this.model.get('min_zoom'),
      });

      if (this.obj) {
        this.obj.setSource(vectorTileSource);
      } else {
        this.obj = new VectorTileLayer({
          source: vectorTileSource,
          visible: this.model.get('visible'),
          opacity: this.model.get('opacity'),
          style: this.createStyleFunction(),
        });
      }
    }
  }

  visibilityChanged() {
    const visible = this.model.get('visible');
    if (this.obj) {
      this.obj.setVisible(visible);
    }
  }

  opacityChanged() {
    const opacity = this.model.get('opacity');
    if (this.obj) {
      this.obj.setOpacity(opacity);
    }
  }

  attributionChanged() {
    const attribution = this.model.get('attribution');
    if (this.obj) {
      const source = this.obj.getSource();
      if (source) {
        source.setAttributions(attribution);
      }
    }
  }

  maxZoomChanged() {
    const maxZoom = this.model.get('max_zoom');
    if (this.obj) {
      const source = this.obj.getSource();
      if (source) {
        source.set('maxZoom', maxZoom);
      }
    }
  }

  minZoomChanged() {
    const minZoom = this.model.get('min_zoom');
    if (this.obj) {
      const source = this.obj.getSource();
      if (source) {
        source.set('minZoom', minZoom);
      }
    }
  }

  styleChanged() {
    if (this.obj) {
      const styleFunction = this.createStyleFunction();
      this.obj.setStyle(styleFunction);
    }
  }

  createStyleFunction(): StyleFunction {
    const modelStyle = this.model.get('style') || {};

    return (feature) => {
      return new Style({
        stroke: new Stroke({
          color: modelStyle.strokeColor || '#3399CC',
          width: modelStyle.strokeWidth || 1.25,
        }),
        fill: new Fill({
          color: modelStyle.fillColor || 'rgba(255, 255, 255, 0.4)',
        }),
        image: new CircleStyle({
          radius: modelStyle.pointRadius || 5,
          fill: new Fill({
            color: modelStyle.pointFillColor || '#0000FF',
          }),
          stroke: new Stroke({
            color: modelStyle.pointStrokeColor || '#000000',
            width: modelStyle.pointStrokeWidth || 1,
          }),
        }),
      });
    };
  }
}
