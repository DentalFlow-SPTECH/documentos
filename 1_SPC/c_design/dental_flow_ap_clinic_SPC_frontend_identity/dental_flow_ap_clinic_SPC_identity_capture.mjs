// Captura cada quadro dos protótipos de identidade em PNG.
// Uso: node dental_flow_ap_clinic_SPC_identity_capture.mjs [a|b|c|agenda ...]
// Usa o Playwright instalado no checkout irmão `frontend` (canal msedge).
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.resolve(here, '../../../../frontend/package.json'));
const { chromium } = require('@playwright/test');

const directions = process.argv.slice(2).length ? process.argv.slice(2) : ['a', 'b', 'c'];
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1800, height: 1200 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));

for (const direction of directions) {
  const file = path.join(here, direction === 'agenda' ? 'dental_flow_ap_clinic_SPC_identity_agenda.html' : `dental_flow_ap_clinic_SPC_identity_direction_${direction}.html`);
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const boards = await page.locator('.board').all();
  const names = direction === 'agenda' ? ['semana_desktop', 'semana_filtro_desktop', 'celular'] : ['agenda_desktop', 'painel_desktop', 'celular'];
  for (const [index, board] of boards.entries()) {
    const out = path.join(here, `dental_flow_ap_clinic_SPC_identity_${direction}_${names[index]}.png`);
    await board.screenshot({ path: out });
    console.log(out);
  }
}
if (errors.length) console.log('Console:', [...new Set(errors)].join('\n'));
await browser.close();
