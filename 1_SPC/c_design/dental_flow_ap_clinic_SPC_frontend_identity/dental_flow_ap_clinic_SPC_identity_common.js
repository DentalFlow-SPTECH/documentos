// Conteúdo fictício compartilhado pelas três direções. Os campos seguem o contrato da API
// (Appointment, Patient, Dentist, Procedure e Dashboard); nomes e números são ilustrativos.
(function () {
  const dentists = [
    { id: 3, name: 'Dra. Ana Lima', short: 'Dra. Ana', specialty: 'Ortodontia' },
    { id: 4, name: 'Dr. Bruno Reis', short: 'Dr. Bruno', specialty: 'Clínico geral' },
    { id: 5, name: 'Dra. Júlia Costa', short: 'Dra. Júlia', specialty: 'Endodontia' },
  ];

  const appointments = [
    { id: 101, time: '08:00', end: '09:00', min: 60, patient: 'Maria Oliveira', procedure: 'Limpeza', dentist: 3, status: 'CONCLUIDO' },
    { id: 102, time: '08:30', end: '09:00', min: 30, patient: 'João Pedro Santos', procedure: 'Avaliação', dentist: 4, status: 'CONCLUIDO' },
    { id: 103, time: '09:00', end: '09:30', min: 30, patient: 'Fernanda Alves', procedure: 'Manutenção do aparelho', dentist: 3, status: 'FALTOU' },
    { id: 104, time: '09:15', end: '10:00', min: 45, patient: 'Lucas Ferreira', procedure: 'Restauração', dentist: 4, status: 'EM_ATENDIMENTO' },
    { id: 105, time: '09:30', end: '11:00', min: 90, patient: 'Beatriz Rocha', procedure: 'Tratamento de canal', dentist: 5, status: 'EM_ATENDIMENTO' },
    { id: 106, time: '10:00', end: '10:30', min: 30, patient: 'Ana Clara Mendes', procedure: 'Manutenção do aparelho', dentist: 3, status: 'CONFIRMADO', next: true, notes: 'Prefere atendimento pela manhã. Vem com a mãe.' },
    { id: 107, time: '10:15', end: '11:15', min: 60, patient: 'Roberto Nunes', procedure: 'Limpeza', dentist: 4, status: 'AGENDADO' },
    { id: 108, time: '10:30', end: '11:00', min: 30, patient: 'Gabriel Souza', procedure: 'Avaliação', dentist: 3, status: 'AGENDADO' },
    { id: 109, time: '11:15', end: '12:15', min: 60, patient: 'Patrícia Gomes', procedure: 'Clareamento', dentist: 5, status: 'CONFIRMADO' },
    { id: 110, time: '11:30', end: '12:15', min: 45, patient: 'Vinícius Prado', procedure: 'Restauração', dentist: 4, status: 'CONFIRMADO' },
    { id: 111, time: '14:00', end: '14:45', min: 45, patient: 'Sônia Martins', procedure: 'Restauração', dentist: 4, status: 'CANCELADO' },
    { id: 112, time: '14:00', end: '14:30', min: 30, patient: 'Thiago Lima', procedure: 'Avaliação', dentist: 3, status: 'AGENDADO' },
    { id: 113, time: '14:30', end: '16:00', min: 90, patient: 'Camila Duarte', procedure: 'Tratamento de canal', dentist: 5, status: 'CONFIRMADO' },
    { id: 114, time: '15:00', end: '16:00', min: 60, patient: 'Renata Barros', procedure: 'Limpeza', dentist: 3, status: 'AGENDADO' },
  ];

  const status = {
    AGENDADO: { label: 'Agendado', icon: 'clock', key: 'agendado' },
    CONFIRMADO: { label: 'Confirmado', icon: 'check', key: 'confirmado' },
    EM_ATENDIMENTO: { label: 'Em atendimento', icon: 'stethoscope', key: 'atendimento' },
    CONCLUIDO: { label: 'Concluído', icon: 'check-check', key: 'concluido' },
    CANCELADO: { label: 'Cancelado', icon: 'x', key: 'cancelado' },
    FALTOU: { label: 'Faltou', icon: 'user-x', key: 'faltou' },
  };

  const patients = [
    { name: 'Ana Clara Mendes', phone: '(11) 99812-3344', neighborhood: 'Centro', age: 16 },
    { name: 'Beatriz Rocha', phone: '(11) 98450-1120', neighborhood: 'Vila Mariana', age: 41 },
    { name: 'Camila Duarte', phone: '(11) 97733-0981', neighborhood: 'Pinheiros', age: 29 },
    { name: 'Fernanda Alves', phone: '(11) 99120-4471', neighborhood: 'Centro', age: 23 },
    { name: 'Gabriel Souza', phone: '(11) 98001-7765', neighborhood: 'Mooca', age: 37 },
    { name: 'João Pedro Santos', phone: '(11) 97650-2289', neighborhood: 'Tatuapé', age: 52 },
    { name: 'Lucas Ferreira', phone: '(11) 99344-8810', neighborhood: 'Centro', age: 31 },
    { name: 'Maria Oliveira', phone: '(11) 98765-4321', neighborhood: 'Bela Vista', age: 36 },
    { name: 'Patrícia Gomes', phone: '(11) 99901-3355', neighborhood: 'Moema', age: 45 },
    { name: 'Renata Barros', phone: '(11) 98230-6614', neighborhood: 'Santana', age: 33 },
  ];

  // Dias de outubro/2026 até hoje (28), sem domingos; valores escalados para o total do mês.
  function dailyEvolution() {
    const points = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let day = 1; day <= 28; day += 1) {
      const weekday = new Date(2026, 9, day).getDay();
      if (weekday === 0) continue;
      const base = weekday === 6 ? 0.45 : 1;
      points.push({ day, gross: base * (0.7 + rand() * 0.6), out: base * (0.25 + rand() * 0.35) });
    }
    const grossTotal = points.reduce((sum, p) => sum + p.gross, 0);
    const outTotal = points.reduce((sum, p) => sum + p.out, 0);
    return points.map(p => ({ day: p.day, gross: p.gross / grossTotal * 48320, out: p.out / outTotal * 17950.4 }));
  }

  const dashboard = {
    summary: { generalGross: 48320, totalOutflows: 17950.4, finalBalance: 30369.6, patientCount: 212 },
    kpis: { averageTicket: 227.92, netMargin: 62.85, noShowRate: 12.3, completionRate: 71.6 },
    funnel: { total: 236, scheduled: 9, confirmed: 6, inProgress: 0, completed: 169, cancelled: 23, noShow: 29 },
    alert: { severity: 'WARNING', title: 'Faltas acima do esperado', value: 12.3, threshold: 10 },
    breakdown: [
      { name: 'Dra. Ana Lima', gross: 21480, out: 7420, balance: 14060 },
      { name: 'Dr. Bruno Reis', gross: 15840, out: 6210.4, balance: 9629.6 },
      { name: 'Dra. Júlia Costa', gross: 11000, out: 4320, balance: 6680 },
    ],
    daily: dailyEvolution(),
  };

  const week = [
    { wd: 'Seg', d: 26, count: 12 }, { wd: 'Ter', d: 27, count: 15 }, { wd: 'Qua', d: 28, count: 14, today: true },
    { wd: 'Qui', d: 29, count: 11 }, { wd: 'Sex', d: 30, count: 9 }, { wd: 'Sáb', d: 31, count: 4 }, { wd: 'Dom', d: 1, count: 0 },
  ];

  function initials(name) {
    return name.replace(/^Dr[a]?\.\s+/, '').split(' ').filter(Boolean).filter((_, i, all) => i === 0 || i === all.length - 1).map(s => s[0]).join('').toUpperCase();
  }
  function pick(name, list) {
    let hash = 0;
    for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return list[hash % list.length];
  }
  const brl = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const brlShort = value => value >= 1000 ? `R$ ${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil` : brl(value);
  const pct = value => `${value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  const dentist = id => dentists.find(d => d.id === id);
  const minutes = time => { const [h, m] = time.split(':').map(Number); return h * 60 + m; };

  // Gráfico de colunas (entradas) com linha (saídas) em SVG simples.
  function barsWithLine({ width, height, data, bar, line, grid, label, radius = 3, font }) {
    const pad = { top: 12, right: 8, bottom: 26, left: 44 };
    const w = width - pad.left - pad.right;
    const h = height - pad.top - pad.bottom;
    const max = Math.ceil(Math.max(...data.map(p => p.gross)) / 1000) * 1000;
    const step = w / data.length;
    const bw = Math.min(16, step * 0.56);
    const y = v => pad.top + h - v / max * h;
    let svg = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="${font}" font-size="11">`;
    for (let i = 0; i <= 3; i += 1) {
      const v = max / 3 * i;
      svg += `<line x1="${pad.left}" x2="${width - pad.right}" y1="${y(v)}" y2="${y(v)}" stroke="${grid}" stroke-width="1"/>`;
      svg += `<text x="${pad.left - 8}" y="${y(v) + 4}" text-anchor="end" fill="${label}">${v ? `${(v / 1000).toLocaleString('pt-BR')} mil` : '0'}</text>`;
    }
    data.forEach((p, i) => {
      const x = pad.left + step * i + (step - bw) / 2;
      svg += `<rect x="${x}" y="${y(p.gross)}" width="${bw}" height="${pad.top + h - y(p.gross)}" rx="${radius}" fill="${bar}"/>`;
      if (i % 4 === 0 || i === data.length - 1) svg += `<text x="${x + bw / 2}" y="${height - 8}" text-anchor="middle" fill="${label}">${p.day}</text>`;
    });
    const points = data.map((p, i) => `${pad.left + step * i + step / 2},${y(p.out)}`).join(' ');
    svg += `<polyline points="${points}" fill="none" stroke="${line}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    return `${svg}</svg>`;
  }

  function donut({ size, stroke, parts, gap = 2, track = 'transparent' }) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const total = parts.reduce((sum, p) => sum + p.value, 0);
    let offset = 0;
    let svg = `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="transform:rotate(-90deg)"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/>`;
    parts.forEach(p => {
      const len = Math.max(0, p.value / total * c - gap);
      svg += `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${p.color}" stroke-width="${stroke}" stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-offset}"/>`;
      offset += p.value / total * c;
    });
    return `${svg}</svg>`;
  }

  const statusBar = `<div class="statusbar"><span>9:40</span><span class="statusbar-icons"><i data-lucide="signal"></i><i data-lucide="wifi"></i><i data-lucide="battery-full"></i></span></div>`;

  window.DF = { dentists, appointments, status, patients, dashboard, week, initials, pick, brl, brlShort, pct, dentist, minutes, barsWithLine, donut, statusBar,
    today: { label: 'Quarta, 28 de outubro', short: 'Qua, 28 out', now: '09:40' }, clinic: 'DentalFlow Centro', user: { name: 'Carla Souza', first: 'Carla' } };
})();
