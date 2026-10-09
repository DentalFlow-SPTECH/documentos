// Capturas da aplicação real na origem isolada, com medidas de altura e largura. Contextos descartados ao final.
// Uso: node dental_flow_ap_clinic_SPC_clinic_reports_capture.cjs [--mobile] [trecho do nome da tela…]
const path = require('node:path');
const fs = require('node:fs');
const frontend = process.env.DENTAL_FLOW_FRONTEND ?? path.resolve(__dirname, '../../../../frontend');
const { chromium } = require(path.join(frontend, 'node_modules/playwright-core'));
const base = process.env.BASE ?? 'http://127.0.0.1:4190/frontend/';
const prefix = 'dental_flow_ap_clinic_SPC_clinic_reports_';
const routes = [
    ['agenda_week', '/agenda?date=2026-10-08'],
    ['agenda_slot', '/agenda?date=2026-10-08&view=week&faixa=480-540'],
    ['agenda_doctor', '/agenda?date=2026-10-08&doutor=d1'],
    ['agenda_month', '/agenda?date=2026-10-08&view=month'],
    ['dashboard_overview', '/painel?date=2026-10-08'],
    ['dashboard_production', '/painel?date=2026-10-08&aba=producao'],
    ['dashboard_finance', '/painel?date=2026-10-08&aba=financeiro'],
    ['patient_list', '/pacientes'],
    ['patient_form', '/pacientes/novo'],
    ['doctor_list', '/doutores'],
    ['inventory_list', '/estoque'],
    ['cash', '/caixa?de=2026-10-01&ate=2026-10-31'],
    ['admin', '/administracao'],
    ['clinic_link', '/administracao/vinculos'],
    ['appointment_form', '/agenda/nova?date=2026-10-09'],
    ['finalization', '/agenda/teste-a-3-3/finalizar'],
    ['appointment_finalized', '/agenda/teste-a-0-0'],
    ['daily_report', '/relatorios/diario?data=2026-10-06&doutor=d1'],
    ['report_review', '/relatorios/conferencia'],
    ['monthly_report', '/relatorios/mensal?mes=2026-10&atendimento=Conv%C3%AAnio'],
];
(async () => {
    const only = process.argv.slice(2).filter(value => !value.startsWith('--'));
    const [width, height, tag] = process.argv.includes('--mobile') ? [375, 812, 'mobile'] : [1366, 768, 'desktop'];
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const measurements = [];
    for (const [name, route] of routes.filter(([key]) => !only.length || only.some(term => key.includes(term)))) {
        await page.goto(`${base}#${route}`);
        await page.waitForSelector('main h1');
        await page.waitForFunction(() => !document.body.innerText.includes('Carregando registros…'), null, { timeout: 15000 });
        await page.waitForTimeout(250);
        const metrics = await page.evaluate(() => ({ pageHeight: document.documentElement.scrollHeight, viewportHeight: innerHeight, withoutHorizontalScroll: document.documentElement.scrollWidth <= innerWidth }));
        await page.screenshot({ path: path.join(__dirname, `${prefix}screen_${name}_${tag}.png`) });
        measurements.push({ screen: name, route, ...metrics, fitsFirstScreen: metrics.pageHeight <= metrics.viewportHeight, errors: errors.splice(0) });
    }
    await context.close();
    await browser.close();
    if (!only.length)
        fs.writeFileSync(path.join(__dirname, `${prefix}screen_measurements_${tag}.json`), JSON.stringify({ base, viewport: { width, height }, measurements }, null, 2) + '\n');
    console.table(measurements.map(({ screen, pageHeight, viewportHeight, fitsFirstScreen, withoutHorizontalScroll, errors: found }) => ({ screen, pageHeight, viewportHeight, fitsFirstScreen, withoutHorizontalScroll, errors: found.length })));
})();
