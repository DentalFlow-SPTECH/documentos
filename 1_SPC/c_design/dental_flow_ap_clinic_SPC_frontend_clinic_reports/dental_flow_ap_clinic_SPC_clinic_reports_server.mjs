// Serve o build de Pages em outra origem com o cenário fictício. A chave só é criada quando ainda não existe nessa origem.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(process.env.DENTAL_FLOW_FRONTEND ?? path.resolve(here, '../../../../frontend'), 'dist');
const port = Number(process.env.PORT ?? 4190);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
http.createServer((request, response) => {
    try {
        const url = new URL(request.url, `http://127.0.0.1:${port}`);
        if (url.pathname === '/scenario-bootstrap.js') {
            const data = fs.readFileSync(path.join(here, 'dental_flow_ap_clinic_SPC_clinic_reports_scenario.json'), 'utf8');
            response.writeHead(200, { 'Content-Type': types['.js'], 'Cache-Control': 'no-store' });
            return response.end(`if (!localStorage.getItem('dental_flow_demo_v1')) localStorage.setItem('dental_flow_demo_v1', ${JSON.stringify(data)});`);
        }
        if (!url.pathname.startsWith('/frontend/'))
            throw new Error('path');
        const file = path.resolve(dist, decodeURIComponent(url.pathname.slice('/frontend/'.length)) || 'index.html');
        if (file !== path.join(dist, 'index.html') && !file.startsWith(dist + path.sep))
            throw new Error('path');
        const body = file.endsWith('index.html') ? Buffer.from(fs.readFileSync(file, 'utf8').replace('<head>', '<head><script src="/scenario-bootstrap.js"></script>')) : fs.readFileSync(file);
        response.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
        response.end(body);
    }
    catch {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Arquivo de prévia não encontrado.');
    }
}).listen(port, '127.0.0.1', () => console.log(`Prévia isolada: http://127.0.0.1:${port}/frontend/ — dados fictícios, sem alterar outras origens.`));
