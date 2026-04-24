import { StyleFunction } from 'ol/style/Style';
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { MODULE_NAME, MODULE_VERSION } from './version';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer  } from 'ol/layer.js';
import { LayerModel, LayerView  } from './layer';
import 'ol/ol.css';
import '../css/widget.css';

// -------------------------------------
import Point    from 'ol/geom/Point.js';
import Icon     from 'ol/style/Icon.js';
import Feature  from 'ol/Feature.js';
import Geometry from 'ol/geom/Geometry';
// -------------------------------------

export class OpenLayersVectorModel extends LayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name:           OpenLayersVectorModel.model_name,
      _model_module:         OpenLayersVectorModel.model_module,
      _model_module_version: OpenLayersVectorModel.model_module_version,
      _view_name:            OpenLayersVectorModel.view_name,
      _view_module:          OpenLayersVectorModel.view_module,
      _view_module_version:  OpenLayersVectorModel.view_module_version,
      layers: [],
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name           = 'OpenLayersVectorModel';
  static model_module         = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name            = 'OpenLayersVectorView';
  static view_module          = MODULE_NAME;
  static view_module_version  = MODULE_VERSION;
}

export class OpenLayersVectorView extends LayerView {
  obj: VectorLayer<any>;
  render() {
    this.initVectorLayer();
    this.create_obj();
    this.modelEvents();
  }
  create_obj() {
    this.obj = this.vectorLayer;
  }
  initVectorLayer() {

    let model_data = this.model.get('data');

    let my_iconFeature = new Feature({
          geometry: new Point(model_data['geom']),
          name: 'SPI',
          population: 4000,
        });

    // my_iconFeature.setStyle(iconStyle);

    this.vectorSource = new VectorSource({
       features: [ new Feature<Geometry>(my_iconFeature.getGeometry()) ],
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: this.createStyleFunction(),
    });
  }

  createStyleFunction(): StyleFunction {

    const modelStyle = this.model.get('style') || {};

        let imageStyle = modelStyle.image;

        let my_image: Icon | CircleStyle;

        if (imageStyle !== undefined) {
            // console.log('createStyleFunction.d');
            // console.log('modelStyle=', modelStyle);
            // console.log('image:    =', modelStyle.image);
            // console.log('image.src:   =', imageStyle.src);
            // console.log('image.anchor:=', imageStyle.anchor);

          my_image =  new Icon({
              width       : imageStyle.width,       || 100,
              height      : imageStyle.height,      || 100,
              size        : imageStyle.size         || 100,
              offset      : imageStyle.offset       || [0,0],
              scale       : imageStyle.scale        || 1,
              opacity     : imageStyle.opacity      || 1,

              anchor      : imageStyle.anchor       || [0.5, 46],
              anchorXUnits: imageStyle.anchorXUnits || 'fraction',
              anchorYUnits: imageStyle.anchorYUnits || 'pixels',
              src         : imageStyle.src          || 'https://openlayers.org/en/latest/examples/data/icon.png',
           })
        } else {
          my_image = new CircleStyle({
            radius: modelStyle.pointRadius || 5,
            fill: new Fill({
              color: modelStyle.pointFillColor || '#0000ff',
            }),
            stroke: new Stroke({
              color: modelStyle.pointStrokeColor || '#ffff00',
              width: modelStyle.pointStrokeWidth || 1,
            }),
          })
        }
        // ===========================================
    return (feature) => {
      return new Style({
        stroke: new Stroke({
          color: modelStyle.strokeColor || '#3399CC',
          width: modelStyle.strokeWidth || 1.25,
        }),
        fill: new Fill({
          color: modelStyle.fillColor || 'rgba(127, 255, 127, 0.4)',
        }),
        image: my_image
      });
    };
  }

  updateStyle() {
    this.vectorLayer.setStyle(this.createStyleFunction());
  }

  invisibleStyle = new Style({
    fill:   new Fill(  { color: 'rgba(0, 0, 0, 0)' }),
    stroke: new Stroke({ color: 'rgba(0, 0, 0, 0)', width: 0 }),
  });
  updateVisibility() {
    const visibility = this.model.get('visible');
    this.vectorSource.getFeatures().forEach((feature) => {
      feature.setStyle(visibility ? undefined : this.invisibleStyle);
    });
  }
  updateData() {
    this.vectorSource.clear();

    let model_data = this.model.get('data');
    // shouldn't this just change the geometry of the existing element???
    let my_iconFeature = new Feature({
          geometry: new Point(model_data['geom']),
        });

    this.vectorSource.addFeatures(
       [ new Feature<Geometry>(my_iconFeature.getGeometry()) ],
    );
  }

  modelEvents() {
    this.listenTo(this.model, 'change:style',   this.updateStyle);
    this.listenTo(this.model, 'change:data',    this.updateData);
    this.listenTo(this.model, 'change:visible', this.updateVisibility);
  }
  vectorLayer: VectorLayer<any>;
  vectorSource: VectorSource;
}

