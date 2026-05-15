// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { BaseControlModel, BaseControlView } from './basecontrol';
import ScaleLine from 'ol/control/ScaleLine.js';
import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';

export class ScaleLineModel extends BaseControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ScaleLineModel.model_name,
      _model_module: ScaleLineModel.model_module,
      _model_module_version: ScaleLineModel.model_module_version,
      _view_name: ScaleLineModel.view_name,
      _view_module: ScaleLineModel.view_module,
      _view_module_version: ScaleLineModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ScaleLineModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ScaleLineView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}
export class ScaleLineView extends BaseControlView {
  createObj() {
    this.obj = new ScaleLine({
      className: 'ol-scale-line',
    });
  }
}
