// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { expect, IJupyterLabPageFixture, test } from '@jupyterlab/galata';
import * as path from 'path';
const klaw = require('klaw-sync');


const filterUpdateNotebooks = item => {
  const basename = path.basename(item.path);
  return basename.includes('_update');
}

const testCellOutputs = async (page: IJupyterLabPageFixture, tmpPath: string, theme: 'JupyterLab Light' | 'JupyterLab Dark') => {
  const paths = klaw(path.resolve(__dirname, './notebooks'), {filter: item => !filterUpdateNotebooks(item), nodir: true});
  const notebooks = paths.map(item => path.basename(item.path));

  const contextPrefix = theme == 'JupyterLab Dark' ? 'light' : 'dark';
  if (theme == 'JupyterLab Dark') {
    page.theme.setTheme(theme);
  }

  for (const notebook of notebooks) {
    let results = [];

    await page.notebook.openByPath(`${tmpPath}/${notebook}`);
    await page.notebook.activate(notebook);

    let numCellImages = 0;

    const getCaptureImageName = (contextPrefix: string, notebook: string, id: number): string => {
      return `${contextPrefix}-${notebook}-cell-${id}.png`;
    };

    await page.notebook.runCellByCell({
      onAfterCellRun: async (cellIndex: number) => {
        const cell = await page.notebook.getCellOutput(cellIndex);
        if (cell) {
          const map = await cell.$("div.ol-container");

          if (map) {
            await new Promise((_) => setTimeout(_, 1000));
          }
          results.push(await cell.screenshot());
          numCellImages++;
        }
      }
    });

    await page.notebook.save();

    for (let c = 0; c < numCellImages; ++c) {
      expect(results[c]).toMatchSnapshot(getCaptureImageName(contextPrefix, notebook, c), {threshold: 0.3, maxDiffPixels: 0.03});
    }

    await page.notebook.close(true);
  }
}

const testPlotUpdates = async (page: IJupyterLabPageFixture, tmpPath: string, theme: 'JupyterLab Light' | 'JupyterLab Dark') => {
  const paths = klaw(path.resolve(__dirname, './notebooks'), {filter: item => filterUpdateNotebooks(item), nodir: true});
  const notebooks = paths.map(item => path.basename(item.path));

  const contextPrefix = theme == 'JupyterLab Light' ? 'light' : 'dark';
  if (theme == 'JupyterLab Dark') {
    page.theme.setTheme(theme);
  }

  for (const notebook of notebooks) {
    let results = [];

    await page.notebook.openByPath(`${tmpPath}/${notebook}`);
    await page.notebook.activate(notebook);

    const getCaptureImageName = (contextPrefix: string, notebook: string, id: number): string => {
      return `${contextPrefix}-${notebook}-cell-${id}.png`;
    };

    let cellCount = 0;
    await page.notebook.runCellByCell({
      onAfterCellRun: async (cellIndex: number) => {
        // Always get first cell output which must contain the plot
        const cell = await page.notebook.getCellOutput(0);
        if (cell) {
          results.push(await cell.screenshot());
          cellCount++;
        }
      }
    });

    await page.notebook.save();

    for (let i = 0; i < cellCount; i++) {
      expect(results[i]).toMatchSnapshot(getCaptureImageName(contextPrefix, notebook, i), {threshold: 0.3, maxDiffPixels: 0.03});
    }

    await page.notebook.close(true);
  }
};

test.describe('ipyopenlayers Visual Regression', () => {
  test.beforeEach(async ({ page, tmpPath }) => {
    page.on("console", (message) => {
      console.log('CONSOLE MSG ---', message.text());
    });

    await page.contents.uploadDirectory(
      path.resolve(__dirname, './notebooks'),
      tmpPath
    );
    await page.filebrowser.openDirectory(tmpPath);
  });

  test('Light theme: Check ipyopenlayers first renders', async ({
    page,
    tmpPath,
  }) => {
    await testCellOutputs(page, tmpPath, 'JupyterLab Light');
  });

  // test('Dark theme: Check ipyopenlayers first renders', async ({
  //   page,
  //   tmpPath,
  // }) => {
  //   await testCellOutputs(page, tmpPath, 'JupyterLab Dark');
  // });

  test('Light theme: Check ipyopenlayers update plot properties', async ({
    page,
    tmpPath,
  }) => {
    await testPlotUpdates(page, tmpPath, 'JupyterLab Light');
  });

  // test('Dark theme: Check ipyopenlayers update plot properties', async ({
  //   page,
  //   tmpPath,
  // }) => {
  //   await testPlotUpdates(page, tmpPath, 'JupyterLab Dark');
  // });
});
