// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { BaseControlModel, BaseControlView } from './basecontrol';
import ZoomSlider from 'ol/control/ZoomSlider';

import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';

export class ZoomSliderModel extends BaseControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ZoomSliderModel.model_name,
      _model_module: ZoomSliderModel.model_module,
      _model_module_version: ZoomSliderModel.model_module_version,
      _view_name: ZoomSliderModel.view_name,
      _view_module: ZoomSliderModel.view_module,
      _view_module_version: ZoomSliderModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ZoomSliderModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ZoomSliderView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}
export class ZoomSliderView extends BaseControlView {
  createObj() {
    this.obj = new ZoomSlider({
      className: 'ol-zoomslider',
    });
  }
}
