// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { BaseControlModel, BaseControlView } from './basecontrol';
import FullScreen from 'ol/control/FullScreen.js';

import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';

export class FullScreenModel extends BaseControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: FullScreenModel.model_name,
      _model_module: FullScreenModel.model_module,
      _model_module_version: FullScreenModel.model_module_version,
      _view_name: FullScreenModel.view_name,
      _view_module: FullScreenModel.view_module,
      _view_module_version: FullScreenModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'FullScreenModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'FullScreenView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}
export class FullScreenView extends BaseControlView {
  createObj() {
    this.obj = new FullScreen({
      className: 'ol-full-screen',
    });
  }
}
