// Cenário fictício para validar clínicas, finalização, relatórios e glosas em origem isolada.
// Usa os Models do frontend para que cada registro siga as mesmas regras da aplicação. Não lê nem grava localStorage.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const frontend = process.env.DENTAL_FLOW_FRONTEND ?? path.resolve(here, '../../../../frontend');
const source = process.env.DENTAL_FLOW_BASE_SCENARIO ?? path.resolve(here, '../dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_scenario.json');
const load = file => import(pathToFileURL(`${frontend}/src/${file}`));
const { saveClinicModel } = await load('feature/admin/model/admin_model.js');
const { finalizeAppointmentModel } = await load('feature/agenda/model/agenda_model.js');
const { saveDailyReportModel, reviewDailyReportModel, saveClaimModel, reportSlots, monthlyItems, monthlyTotals } = await load('feature/report/model/report_model.js');
const { performedItems } = await load('demo/clinic.js');
const { overviewMetrics } = await load('feature/dashboard/model/dashboard_model.js');

let data = JSON.parse(fs.readFileSync(source, 'utf8'));
const today = '2026-10-08';
data.clinics = [];
data.dailyReports = [];
for (const name of ['Unidade Centro', 'Unidade Jardim América', 'Unidade Vila Nova'])
    data = saveClinicModel(data, { name }).data;
const clinics = data.clinics.map(clinic => clinic.id);

// Nomes longos e convênios fictícios.
data.doctors.find(doctor => doctor.name === 'Dra. Lívia Barros').name = 'Dra. Lívia Barros de Albuquerque Vasconcelos';
data.patients[16].name = 'Francisco de Assis Cavalcanti de Albuquerque Neto';
data.patients[60].name = 'Maria Cecília Pereira de Vasconcelos';
const plans = ['Odonto Aurora', 'Dental Prisma', 'Sorria Saúde'];
data.patients.forEach((patient, index) => { if (index % 5 < 2) Object.assign(patient, { insurance: plans[index % 3], insuranceNumber: `00${98 + index} ${4400 + index} ${10 + index % 80}` }); });

// Catálogo grande para a busca de procedimentos: 124 itens.
const families = ['Restauração em resina composta', 'Restauração em amálgama', 'Restauração provisória', 'Faceta direta', 'Faceta cerâmica', 'Coroa metalocerâmica', 'Núcleo de preenchimento', 'Pino de fibra', 'Gengivoplastia', 'Enxerto gengival', 'Frenectomia', 'Implante unitário', 'Prótese total', 'Moldagem', 'Tomada radiográfica panorâmica', 'Aplicação tópica', 'Dessensibilização', 'Remoção de sutura', 'Controle pós-operatório', 'Ajuste de prótese'];
const variants = ['uma face', 'duas faces', 'três ou mais faces, com reconstrução de cúspide', 'arcada superior', 'arcada inferior'];
families.forEach((family, f) => variants.forEach((variant, v) => data.procedures.push({ id: `cat-${f}-${v}`, name: `${family} — ${variant}`, referencePriceCents: 9000 + f * 2500 + v * 1500 })));
assert.equal(data.procedures.length, 124);

// Consultas de 1º e 2 de outubro, para o mês ter mais de uma semana com produção.
['2026-10-01', '2026-10-02'].forEach((date, day) => {
    for (let index = 0; index < 14; index++)
        data.appointments.push({ id: `teste-b-${day}-${index}`, patientId: data.patients[(day * 31 + index * 3) % 120].id, doctorId: data.doctors[index % 6].id, procedure: data.procedures[(index * 2 + day) % 24].name, date, time: `${String(8 + Math.floor(index / 6)).padStart(2, '0')}:${index % 2 ? '30' : '00'}`, duration: 30, status: index % 7 === 6 ? 'Faltou' : 'Concluída', observation: '', attendance: '', budgetId: '', cancelReason: '', history: [] });
});
// Sobreposição parcial para o mesmo doutor: a consulta cancelada não bloqueia o horário.
data.appointments.push({ id: 'teste-sobreposta', patientId: data.patients[16].id, doctorId: 'd1', procedure: 'Coroa cerâmica', date: today, time: '10:30', duration: 45, status: 'Cancelada', observation: '', attendance: '', budgetId: '', cancelReason: 'Paciente pediu nova data.', history: [] });

// Vínculo com clínicas: doze consultas antigas ficam sem clínica, como pendência de vinculação.
const unlinked = new Set(data.appointments.filter(value => value.date === '2026-10-01').slice(0, 12).map(value => value.id));
data.appointments.forEach((appointment, index) => {
    const doctor = data.doctors.findIndex(value => value.id === appointment.doctorId);
    Object.assign(appointment, { clinicId: unlinked.has(appointment.id) ? '' : clinics[(doctor + Number(appointment.date.slice(-2))) % 3], procedureId: '', insurance: '' });
    if (appointment.date >= today && index % 4 === 0) {
        const patient = data.patients.find(value => value.id === appointment.patientId);
        Object.assign(appointment, patient.insurance ? { attendance: 'Convênio', insurance: patient.insurance } : { attendance: 'Particular' });
    }
});
data.appointments.find(value => value.id === 'teste-a-4-1').attendance = 'convênio — conferir carteirinha';
data.cashMovements.forEach((movement, index) => { movement.clinicId = movement.date.startsWith('2026-10') && index % 4 !== 3 ? clinics[index % 3] : ''; });

// Quatro consultas de 07/10 seguem confirmadas: aparecem como pendência de finalização.
data.appointments.filter(value => value.date === '2026-10-07' && value.status === 'Concluída').slice(0, 4).forEach(value => { value.status = 'Confirmada'; });
// Finalização: consultas concluídas até a data de referência recebem os procedimentos realizados. Três ficam como estavam.
const concluded = data.appointments.filter(value => value.status === 'Concluída' && value.date <= today);
const legacy = concluded.filter(value => value.date === '2026-10-06').slice(0, 3).map(value => value.id);
concluded.filter(value => !legacy.includes(value.id)).forEach((appointment, index) => {
    const patient = data.patients.find(value => value.id === appointment.patientId);
    const scheduled = data.procedures.find(value => value.name === appointment.procedure);
    const items = [{ procedureId: scheduled.id, quantity: 1, tooth: index % 3 === 0 ? ['16', '26', '36', '46'][index % 4] : '', region: index % 5 === 0 ? 'Oclusal' : '', origin: 'Agendado' }];
    if (index % 4 === 1)
        items.push({ procedureId: data.procedures[(index * 5) % 24].id, quantity: 1 + index % 2, tooth: '', region: '', origin: 'No atendimento' });
    const attendance = index % 11 === 10 ? '' : patient.insurance ? 'Convênio' : 'Particular';
    data = finalizeAppointmentModel(data, appointment.id, { items, attendance, insurance: patient.insurance, observation: index % 9 === 0 ? 'Paciente orientado a retornar em 15 dias.' : '', pendingGuide: index % 6 === 0 }).data;
});

// Relatórios diários: enviados até 07/10, validados até 06/10, um devolvido e alguns sem envio.
const slots = reportSlots(data, { from: '2026-10-01', until: today });
slots.forEach((slot, index) => {
    if (slot.key.date === today || index % 9 === 8)
        return index % 2 ? undefined : (data = saveDailyReportModel(data, slot.key, 'Rascunho em preparação.').data);
    data = saveDailyReportModel(data, slot.key, index % 4 === 0 ? 'Autoclave em manutenção das 13h às 14h; dois atendimentos remarcados.' : '', true).data;
    const report = data.dailyReports.find(value => value.date === slot.key.date && value.doctorId === slot.key.doctorId && value.clinicId === slot.key.clinicId);
    if (slot.key.date <= '2026-10-06' && index % 7 !== 3)
        data = reviewDailyReportModel(data, report.id, 'validar').data;
    else if (index % 7 === 3)
        data = reviewDailyReportModel(data, report.id, 'devolver', 'Conferir o dente informado no segundo procedimento.').data;
});

// Conferência de convênio: itens até 06/10 com guia e valor; retornos variados; alguns sem valor ou sem registro.
performedItems(data.appointments).filter(item => item.appointment.completion.attendance === 'Convênio' && item.appointment.date <= '2026-10-07').forEach((item, index) => {
    if (index % 8 === 7)
        return;
    const presentedCents = index % 8 === 6 ? null : item.referencePriceCents * item.quantity;
    const result = presentedCents === null || item.appointment.date === '2026-10-07' || index % 5 === 4 ? 'Aguardando' : ['Sem glosa', 'Sem glosa', 'Glosa parcial', 'Glosa total'][index % 4];
    data = saveClaimModel(data, item.appointment.id, item.id, { guide: `${item.appointment.completion.insurance.slice(0, 2).toUpperCase()}-${88200 + index}`, presentedCents, result, returnOn: index % 3 ? '2026-10-28' : '2026-11-04', glosaCents: result === 'Glosa parcial' ? Math.round(presentedCents * 0.3 / 100) * 100 : null, reason: result === 'Glosa parcial' ? 'Radiografia final não anexada à guia.' : result === 'Glosa total' ? 'Procedimento sem autorização prévia.' : '' }).data;
});

// Coerência do cenário.
for (const key of ['patients', 'doctors', 'procedures', 'appointments', 'clinics', 'dailyReports'])
    assert.equal(new Set(data[key].map(value => value.id)).size, data[key].length, `IDs únicos: ${key}`);
const active = data.appointments.filter(value => value.status !== 'Cancelada');
for (let a = 0; a < active.length; a++)
    for (let b = a + 1; b < active.length; b++)
        assert(!(active[a].doctorId === active[b].doctorId && active[a].date === active[b].date && active[a].time === active[b].time), 'Sem conflito de horário por doutor');
for (const report of data.dailyReports)
    for (const id of report.appointmentIds)
        assert(data.appointments.find(value => value.id === id)?.completion, 'Relatório enviado só inclui consultas finalizadas');
const october = data.appointments.filter(value => value.date.startsWith('2026-10'));
const totals = monthlyTotals(monthlyItems(data, { month: '2026-10' }));
const summary = {
    referenceDate: today, clinics: data.clinics.length, procedures: data.procedures.length, appointments: data.appointments.length, withoutClinic: data.appointments.filter(value => !value.clinicId).length,
    october: overviewMetrics(october, today), legacyConcluded: legacy.length, dailyReports: Object.fromEntries(['Rascunho', 'Enviado', 'Em correção', 'Validado'].map(status => [status, data.dailyReports.filter(value => value.status === status).length])),
    performed: totals.items, plan: totals.plan, presentedCents: totals.presentedCents, unknownCount: totals.unknownCount, waitingCount: totals.waitingCount, glosaCents: totals.glosaCents, glosaPartial: totals.glosaPartial, glosaTotal: totals.glosaTotal,
};
fs.writeFileSync(path.join(here, 'dental_flow_ap_clinic_SPC_clinic_reports_scenario.json'), JSON.stringify(data));
fs.writeFileSync(path.join(here, 'dental_flow_ap_clinic_SPC_clinic_reports_scenario_summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(summary);
