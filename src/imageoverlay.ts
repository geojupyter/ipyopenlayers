// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import { BaseOverlayModel, BaseOverlayView } from './baseoverlay';

import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';

export class ImageOverlayModel extends BaseOverlayModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ImageOverlayModel.model_name,
      _model_module: ImageOverlayModel.model_module,
      _model_module_version: ImageOverlayModel.model_module_version,
      _view_name: ImageOverlayModel.view_name,
      _view_module: ImageOverlayModel.view_module,
      _view_module_version: ImageOverlayModel.view_module_version,
      image_url: '',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ImageOverlayModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ImageOverlayView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class ImageOverlayView extends BaseOverlayView {
  render() {
    super.render();
    this.updateImageElement();
  }
  createElement() {
    this.element = document.createElement('img');
  }
  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:image_url', this.updateImageElement);
  }

  updateImageElement() {
    const imageUrl = this.model.get('image_url');
    if (imageUrl) {
      (this.element as HTMLImageElement).src = imageUrl;
    }
  }
}
