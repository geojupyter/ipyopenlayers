// Copyright (c) QuantStack
// Distributed under the terms of the Modified BSD License.
import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
  unpack_models,
  ViewList,
} from '@jupyter-widgets/base';
import { LayerModel, LayerView } from './layer';
import { BaseOverlayModel, BaseOverlayView } from './baseoverlay';
import { BaseControlModel, BaseControlView } from './basecontrol';
import { ViewObjectEventTypes } from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { Map } from 'ol';
import View from 'ol/View';
import 'ol/ol.css';
import { MODULE_NAME, MODULE_VERSION } from './version';
import '../css/widget.css';
import { useGeographic } from 'ol/proj';
import { ObjectEvent } from 'ol/Object';
import { OSM } from 'ol/source';
export * from './imageoverlay';
export * from './geojson';
export * from './vector';
export * from './video_overlay';
export * from './popupoverlay';
export * from './zoomslider';
export * from './fullscreen';
export * from './scaleline';
export * from './mouseposition';
export * from './heatmap';
export * from './rastertilelayer';
export * from './geotifflayer';
export * from './vectortilelayer';

const DEFAULT_LOCATION = [0.0, 0.0];

export class MapModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: MapModel.model_name,
      _model_module: MapModel.model_module,
      _model_module_version: MapModel.model_module_version,
      _view_name: MapModel.view_name,
      _view_module: MapModel.view_module,
      _view_module_version: MapModel.view_module_version,
      layers: [],
      controls: [],
      overlays: [],
      zoom: 2,
      center: DEFAULT_LOCATION,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    layers: { deserialize: unpack_models },
    overlays: { deserialize: unpack_models },
    controls: { deserialize: unpack_models },

    // Add any extra serializers here
  };

  static model_name = 'MapModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'MapView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class MapView extends DOMWidgetView {
  render() {
    useGeographic();
    this.el.classList.add('jupyter-widgets');
    this.el.classList.add('ipyopenlayer-widgets');

    this.map_container = document.createElement('div');
    this.map_container.classList.add('ol-container');
    requestAnimationFrame(() => {
      const parentElement = this.el.parentElement;
      if (parentElement) {
        parentElement.classList.add('ipyopenlayer-map-container-wrapper');
        const grandParentElement = parentElement.parentElement;
        if (grandParentElement) {
          grandParentElement.classList.add(
            'ipyopenlayer-map-container-wrapper-parent',
          );
        }
      }
    });
    this.el.appendChild(this.map_container);

    this.layerViews = new ViewList(
      this.addLayerModel,
      this.removeLayerView,
      this,
    );

    this.overlayViews = new ViewList<BaseOverlayView>(
      this.addOverlayModel,
      this.removeOverlayView,
      this,
    );

    this.controlViews = new ViewList<BaseControlView>(
      this.addControlModel,
      this.removeControlView,
      this,
    );
    this.map = new Map({
      target: this.map_container,
      view: new View({
        center: this.model.get('center'),
        zoom: this.model.get('zoom'),
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    this.map.on('click', (event: MapBrowserEvent<MouseEvent>) => {
      this.handleMapClick(event);
    });

    this.map.getView().on('change:center', () => {
      this.model.set('center', this.map.getView().getCenter());
      this.model.save_changes();
    });

    this.map
      .getView()
      .on('change:resolution' as ViewObjectEventTypes, (event: ObjectEvent) => {
        this.model.set('zoom', this.map.getView().getZoom());
        this.model.save_changes();
      });

    this.layersChanged();
    this.overlayChanged();
    this.controlChanged();
    this.model.on('change:layers', this.layersChanged, this);
    this.model.on('change:overlays', this.overlayChanged, this);
    this.model.on('change:controls', this.controlChanged, this);
    this.model.on('change:zoom', this.zoomChanged, this);
    this.model.on('change:center', this.centerChanged, this);
  }

  handleMapClick(event: MapBrowserEvent<MouseEvent>) {
    const coordinate = event.coordinate;
    const [lon, lat] = coordinate;
    this.send({ type: 'click', lon, lat });
  }
  layersChanged() {
    const layers = this.model.get('layers') as LayerModel[];
    this.layerViews.update(layers);
  }

  overlayChanged() {
    const overlay = this.model.get('overlays') as BaseOverlayModel[];
    this.overlayViews.update(overlay);
  }

  controlChanged() {
    const control = this.model.get('controls') as BaseOverlayModel[];
    this.controlViews.update(control);
  }

  zoomChanged() {
    const newZoom = this.model.get('zoom');
    if (newZoom !== undefined && newZoom !== null) {
      this.map.getView().setZoom(newZoom);
    }
  }

  centerChanged() {
    const newCenter = this.model.get('center');
    if (newCenter !== undefined && newCenter !== null) {
      this.map.getView().setCenter(newCenter);
    }
  }

  removeLayerView(child_view: LayerView) {
    this.map.removeLayer(child_view.obj);
    child_view.remove();
  }

  removeOverlayView(child_view: BaseOverlayView) {
    if (child_view.overlay) {
      this.map.removeOverlay(child_view.overlay);
    }
    child_view.remove();
  }

  removeControlView(child_view: BaseControlView) {
    this.map.removeControl(child_view.obj);
    child_view.remove();
  }

  async addLayerModel(child_model: LayerModel) {
    const view = await this.create_child_view<LayerView>(child_model, {
      map_view: this,
    });
    this.map.addLayer(view.obj);
    this.displayed.then(() => {
      view.trigger('displayed', this);
    });
    return view;
  }

  async addOverlayModel(child_model: BaseOverlayModel) {
    const view = await this.create_child_view<BaseOverlayView>(child_model, {
      map_view: this,
    });
    this.map.addOverlay(view.overlay);
    this.displayed.then(() => {
      view.trigger('displayed', this);
    });
    return view;
  }

  async addControlModel(child_model: BaseControlModel) {
    const view = await this.create_child_view<BaseControlView>(child_model, {
      map_view: this,
    });
    if (view.obj) {
      this.map.addControl(view.obj);

      this.displayed.then(() => {
        view.trigger('displayed', this);
      });
    }

    return view;
  }

  imageElement: HTMLImageElement;
  map_container: HTMLDivElement;
  map: Map;
  layerViews: ViewList<LayerView>;
  overlayViews: ViewList<BaseOverlayView>;
  controlViews: ViewList<BaseControlView>;
}
