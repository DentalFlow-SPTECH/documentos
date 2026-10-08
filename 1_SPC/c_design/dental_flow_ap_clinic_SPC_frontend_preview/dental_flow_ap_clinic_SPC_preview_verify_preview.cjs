const fs=require('node:fs'),path=require('node:path');
const frontend=path.resolve(__dirname,'../../../../frontend');
const { chromium, expect }=require(path.join(frontend,'node_modules/@playwright/test'));
const AxeBuilder=require(path.join(frontend,'node_modules/@axe-core/playwright')).default;
const root=__dirname;
const artifact = name => path.join(root, 'dental_flow_ap_clinic_SPC_preview_' + name.replaceAll('-', '_').replaceAll('odontograma', 'odontogram').replaceAll('procedimentos', 'procedures').replaceAll('painel', 'dashboard').replaceAll('resumo', 'summary').replaceAll('caixa', 'cash'));
const base='http://127.0.0.1:4189';
const key='dental_flow_demo_v1';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const findings=[];
 try{
  for(const [name,viewport] of [['desktop',{width:1440,height:960}],['mobile',{width:375,height:812}]]){
   const context=await browser.newContext({viewport});
   const errors=[];
   const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(`${m.text()} ${m.location().url}`);});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
   async function check(){await page.evaluate(()=>document.fonts.ready);const axe=await new AxeBuilder({page}).analyze();expect(axe.violations).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
   for(const version of ['a','b']){
    await page.goto(`${base}/odontograma-${version}.html`);await expect(page.locator('[data-tooth]')).toHaveCount(32);await check();
    await page.screenshot({path:artifact(`odontograma-${version}-${name}.png`),fullPage:true});
    await page.getByRole('button',{name:'Selecionar dente 36',exact:true}).click();await expect(page.locator('#selected_number')).toHaveText('36');
    await page.locator('#surface').fill('Face informada');await page.locator('#add_item').click();await expect(page.locator('#planned li')).toHaveCount(4);await expect(page.locator('#tooth_notice')).toHaveText('Item incluído no dente 36 nesta prévia.');
    await page.getByRole('button',{name:'Infantil',exact:true}).click();await expect(page.locator('[data-tooth]')).toHaveCount(20);await expect(page.locator('#selected_number')).toHaveText('55');await check();
    await page.setViewportSize({width:320,height:812});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize(viewport);
   }
   await page.goto(`${base}/procedimentos.html`);await expect(page.locator('#total_procedures')).toHaveText('24 procedimentos');await expect(page.locator('#procedure_list li')).toHaveCount(8);await check();
   await page.screenshot({path:artifact(`procedimentos-${name}.png`),fullPage:true});
   await page.locator('#next').click();await expect(page.locator('#page_count')).toHaveText('Página 2 de 3');
   await page.locator('#procedure_search').fill('radiografia');await expect(page.locator('#procedure_list li')).toHaveCount(2);
   await page.locator('#procedure_list [data-id]').first().click();await expect(page.getByRole('dialog')).toBeVisible();await check();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
   await page.locator('#procedure_name').fill('Procedimento de teste');await page.locator('#procedure_price').fill('245,50');await page.getByRole('button',{name:'Salvar procedimento',exact:true}).click();await expect(page.locator('#total_procedures')).toHaveText('25 procedimentos');await expect(page.locator('#procedure_list')).toContainText('R$ 245,50');await page.reload();await expect(page.locator('#total_procedures')).toHaveText('24 procedimentos');
   await page.setViewportSize({width:320,height:812});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize(viewport);
   await page.goto(`${base}/frontend/#/painel?date=2026-10-08`);await expect(page.getByLabel('Resumo da clínica').locator('dd > span')).toHaveText(['18','120','64','6']);
   await expect(page.getByLabel('Totais do caixa de outubro de 2026').locator('dd')).toHaveText(['R$ 12.560,00','R$ 4.280,00','R$ 8.280,00']);
   await expect(page.locator('[data-page-list="Consultas do painel"]').getByRole('status')).toBeVisible();
   await expect(page.locator('[data-page-list="Materiais do painel"]').getByRole('status')).toBeVisible();
   const week=page.getByRole('figure',{name:'Consultas registradas por dia',exact:true});await expect(week.locator('strong')).toHaveText(['8','11','14','18','12','5','2']);
   const original=await page.evaluate(key=>localStorage.getItem(key),key);await check();await page.getByText('Atendimentos do dia e movimentações do mês de referência.',{exact:true}).click();await page.screenshot({path:artifact(`painel-${name}.png`),fullPage:true});await page.screenshot({path:artifact(`painel-resumo-${name}.png`)});await page.getByRole('region',{name:'Caixa de outubro de 2026',exact:true}).screenshot({path:artifact(`painel-caixa-card-${name}.png`)});
   await page.getByText('Ver valores por mês',{exact:true}).click();await expect(page.getByRole('table')).toBeVisible();await expect(page.getByRole('table').locator('tbody tr')).toHaveCount(6);
   await page.screenshot({path:artifact(`painel-caixa-${name}.png`),fullPage:true});
   await page.getByRole('link',{name:'Ver caixa do mês',exact:true}).click();await expect(page).toHaveURL(/#\/caixa\?de=2026-10-01&ate=2026-10-31/);await expect(page.locator('main h1')).toHaveText('Caixa');
   await page.goto(`${base}/frontend/#/painel?date=2026-10-08`);await week.getByRole('link',{name:'Abrir agenda de 09/10/2026: 12 consultas registradas',exact:true}).click();await expect(page).toHaveURL(/#\/agenda\?date=2026-10-09/);await expect(page.locator('main h1')).toHaveText('Agenda');
   await page.goto(`${base}/frontend/#/painel?date=2026-10-08`);await page.getByRole('region',{name:'Orçamentos recentes',exact:true}).getByRole('link',{name:/ORC-/}).first().click();await expect(page.locator('main h1')).toContainText('Orçamento ORC-');
   await page.goto(`${base}/frontend/#/painel?date=2026-10-08`);await page.reload();await expect(page.getByLabel('Resumo da clínica').locator('dd > span')).toHaveText(['18','120','64','6']);expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(original);
   await page.setViewportSize({width:320,height:812});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   findings.push({project:name,axe:'zero violações nas propostas e no Painel',overflow:'ausente em 375/320 e desktop',consoleErrors:errors,links:'Agenda, Caixa, Orçamento e reload verificados',snapshot:'preservado na navegação'});expect(errors).toEqual([]);
   await context.close();
  }
 }finally{await browser.close();fs.writeFileSync(artifact('verification.json'),JSON.stringify(findings,null,2));}
 console.log(JSON.stringify(findings,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
