// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';

import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';
import { BaseOverlayModel, BaseOverlayView } from './baseoverlay';

export class PopupOverlayModel extends BaseOverlayModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: PopupOverlayModel.model_name,
      _model_module: PopupOverlayModel.model_module,
      _model_module_version: PopupOverlayModel.model_module_version,
      _view_name: PopupOverlayModel.view_name,
      _view_module: PopupOverlayModel.view_module,
      _view_module_version: PopupOverlayModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'PopupOverlayModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'PopupOverlayView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}
export class PopupOverlayView extends BaseOverlayView {
  render() {
    super.render();
    this.updatePopupElement();
  }
  createElement() {
    this.element = document.createElement('div');
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:popup_content', this.updatePopupElement);
  }

  updatePopupElement() {
    const popupContent = this.model.get('popup_content');
    if (popupContent) {
      this.element.innerHTML = popupContent;
    }
  }
}
