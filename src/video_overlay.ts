// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, ISerializers } from '@jupyter-widgets/base';
import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';
import { BaseOverlayModel, BaseOverlayView } from './baseoverlay';

export class VideoOverlayModel extends BaseOverlayModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: VideoOverlayModel.model_name,
      _model_module: VideoOverlayModel.model_module,
      _model_module_version: VideoOverlayModel.model_module_version,
      _view_name: VideoOverlayModel.view_name,
      _view_module: VideoOverlayModel.view_module,
      _view_module_version: VideoOverlayModel.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'VideoOverlayModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'VideoOverlayVIew';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}
export class VideoOverlayView extends BaseOverlayView {
  videoElement: HTMLVideoElement;

  render() {
    super.render();
    this.updateVideoElement();
  }
  createElement() {
    this.element = document.createElement('div');
    this.videoElement = document.createElement('video');
    this.videoElement.controls = true;
    this.element.appendChild(this.videoElement);
  }

  model_events() {
    super.model_events();
    this.listenTo(this.model, 'change:video_url', this.updateVideoElement);
  }

  updateVideoElement() {
    const videoUrl = this.model.get('video_url');
    if (videoUrl) {
      this.videoElement.src = videoUrl;
    }
  }
}
