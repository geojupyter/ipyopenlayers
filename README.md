This is only a test
# ipyopenlayers

[![Documentation](http://readthedocs.org/projects/ipyopenlayers/badge/?version=latest)](https://ipyopenlayers.readthedocs.io/en/latest/?badge=latest)
[![JupyterLite Badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://ipyopenlayers.readthedocs.io/en/latest/lite/lab/index.html)

A Jupyter / Openlayers bridge enabling interactive maps in the Jupyter notebook.

## Usage

### Adding Raster Tile Layers and Controlling Zoom on the Map

![Zoom Raster](https://github.com/Nour-Cheour10/Ipy-openlayers/blob/Readme/media/RasterZoom.gif)

This GIF demonstrates how to add Raster Tile layers to the map and control the zoom functionality.

### Adding Vector Tile Layers and Changing Their Style

![Exemple de Vecteur](https://github.com/Nour-Cheour10/Ipy-openlayers/blob/Readme/media/Vector.gif)

This GIF shows how to add Vector Tile layers to the map and modify their style.

### GeoJSON Layer

![Exemple GeoJson](https://github.com/Nour-Cheour10/Ipy-openlayers/blob/Readme/media/GeoJson.png)

This image illustrates how to add a GeoJSON layer to the map.


## Example Repository

For a real-world example of how to use `ipyopenlayers`, check out this [electricity dashboard project](https://github.com/Nour-Cheour10/electricitymap_dashboard.git).

This project showcases the integration of `ipyopenlayers` in an electricity dashboard application, demonstrating a use case of the library.

## Installation

You can install using `pip`:

```bash
pip install ipyopenlayers
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:

```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] ipyopenlayers
```

## Development Installation

Create a dev environment:

```bash
conda create -n ipyopenlayers-dev -c conda-forge nodejs python jupyterlab=4.0.11
conda activate ipyopenlayers-dev
```

Install the python. This will also build the TS package.

```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
jlpm run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py ipyopenlayers
jupyter nbextension enable --sys-prefix --py ipyopenlayers
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Typescript:

If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## Documentation

To get started with using `ipyopenlayers`, check out the full documentation

https://ipyopenlayers.readthedocs.io/

## Try it Online

You can try ipyopenlayers below, or open many other live examples in a new browser tab with JupyterLite.

- [JupyterLite](https://ipyopenlayers.readthedocs.io/en/latest/lite/lab/index.html)

[![JupyterLite Badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://ipyopenlayers.readthedocs.io/en/latest/lite/lab/index.html)



## Updating the version

To update the version, install tbump and use it to bump the version.
By default it will also create a tag.

```bash
pip install tbump
tbump <new-version>
```
