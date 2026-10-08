import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const artifact = name => path.join(root, 'dental_flow_ap_clinic_SPC_preview_' + name.replaceAll('-', '_').replaceAll('odontograma', 'odontogram').replaceAll('procedimentos', 'procedures').replaceAll('painel', 'dashboard').replaceAll('resumo', 'summary').replaceAll('caixa', 'cash'));
const frontend=path.resolve(root,'../../../../frontend');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.woff2':'font/woff2','.svg':'image/svg+xml'};
const data=fs.readFileSync(artifact('scenario.json'),'utf8');
const bootstrap=`if (!localStorage.getItem('dental_flow_demo_v1')) localStorage.setItem('dental_flow_demo_v1', ${JSON.stringify(data)});`;
http.createServer((req,res)=>{
 try {
  const url=new URL(req.url,'http://127.0.0.1:4189');
  let file,buffer;
  if(url.pathname==='/favicon.ico') file=path.join(frontend,'public/favicon.svg');
  else if(url.pathname==='/scenario-bootstrap.js') buffer=Buffer.from(bootstrap);
  else if(url.pathname==='/brand.png') file=path.join(frontend,'src/asset/brand/dental_flow_logo.png');
  else if(url.pathname==='/font-semibold.woff2') file=path.join(frontend,'node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2');
  else if(url.pathname==='/font.woff2') file=path.join(frontend,'node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2');
  else if(url.pathname.startsWith('/frontend/')) {
   file=path.resolve(frontend,'dist',decodeURIComponent(url.pathname.slice('/frontend/'.length))||'index.html');
   if(!file.startsWith(path.resolve(frontend,'dist')+path.sep)) throw new Error('path');
   if(file.endsWith('index.html')) buffer=Buffer.from(fs.readFileSync(file,'utf8').replace('<head>','<head><script src="/scenario-bootstrap.js"></script>'));
  }else {
   file=path.resolve(artifact(decodeURIComponent(url.pathname.slice(1))||'index.html'));
   if(!file.startsWith(root+path.sep)) throw new Error('path');
  }
  buffer??=fs.readFileSync(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file||url.pathname)]||'application/octet-stream','Cache-Control':'no-store'});res.end(buffer);
 }catch {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Arquivo de prévia não encontrado.');}
}).listen(4189,'127.0.0.1',()=>console.log('Prévia isolada: http://127.0.0.1:4189/ — dados fictícios, sem alterar a origem 4178.'));
