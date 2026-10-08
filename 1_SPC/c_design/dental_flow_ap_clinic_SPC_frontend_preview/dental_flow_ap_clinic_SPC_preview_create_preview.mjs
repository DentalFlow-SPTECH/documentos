import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const root = path.dirname(fileURLToPath(import.meta.url));
const artifact = name => path.join(root, 'dental_flow_ap_clinic_SPC_preview_' + name.replaceAll('-', '_').replaceAll('odontograma', 'odontogram').replaceAll('procedimentos', 'procedures').replaceAll('painel', 'dashboard').replaceAll('resumo', 'summary').replaceAll('caixa', 'cash'));
const frontend = path.resolve(root,'../../../../frontend');
const { createSeed } = await import(pathToFileURL(`${frontend}/src/demo/seed.js`));
const { monthWindow, cashTotals } = await import(pathToFileURL(`${frontend}/src/feature/dashboard/model/dashboard_model.js`));
const data = createSeed();
const ref = '2026-10-08';
const given = ['Lia','Caio','Helena','Miguel','Cecília','Davi','Alice','Bruno','Luísa','Pedro','Sofia','Tiago'];
const family = ['Monteiro','Menezes','Freitas','Barros','Pereira','Azevedo','Lima','Moraes','Cavalcanti','Tavares'];
for (let i = 0; i < 116; i++) data.patients.push({ ...data.patients[0], id:`teste-p-${i}`, code:`PAC-${String(i+5).padStart(3,'0')}`, name:`${given[i%12]} ${family[Math.floor(i/12)]}`, birthDate:`${1980+i%25}-05-12`, phone:`(11) 90001-${String(i).padStart(4,'0')}`, email:`paciente${i}@example.com`, history:[] });
data.doctors.push(...['Dra. Clara Monteiro','Dr. Caio Freitas','Dra. Lívia Barros','Dr. Bruno Tavares'].map((name,i)=>({id:`teste-d-${i}`,name,specialty:'Clínica geral',cro:`SP-${90001+i}`,phone:'',email:`doutor${i}@example.com`,history:[]})));
const extraNames=['Aplicação de flúor','Selante','Restauração em ionômero','Polimento de restauração','Radiografia periapical','Radiografia interproximal','Ajuste oclusal','Clareamento de consultório','Clareamento supervisionado','Tratamento endodôntico','Retratamento endodôntico','Exodontia simples','Exodontia de terceiro molar','Coroa provisória','Coroa cerâmica','Prótese parcial','Placa oclusal','Manutenção periodontal','Consulta de retorno','Reparo de prótese'];
data.procedures.push(...extraNames.map((name,i)=>({id:`teste-pr-${i}`,name,referencePriceCents:[9000,15000,18000,12000,6000,6500,11000,85000,65000,95000,115000,30000,65000,38000,180000,160000,55000,22000,10000,28000][i]})));
for (let i=0;i<61;i++) {
 const patient=data.patients[(i*7+4)%120], doctor=data.doctors[i%6], procedure=data.procedures[i%24];
 const day=String(8-i%8).padStart(2,'0');
 data.budgets.push({id:`teste-b-${i}`,code:`ORC-${String(i+4).padStart(3,'0')}`,patientId:patient.id,doctorId:doctor.id,createdOn:`2026-10-${day}`,validUntil:'',approvedOn:'',statusLabel:'Registro local',local:true,observation:'',paymentNote:'',items:[{id:`teste-bi-${i}`,procedure:procedure.name,quantity:i%3+1,unitPriceCents:procedure.referencePriceCents,tooth:['16','26','46','36'][i%4],surface:'',observation:''}],history:[]});
}
const statuses=['Concluída','Confirmada','Agendada','Em atendimento','Cancelada','Faltou'];
const counts=[8,11,14,18,12,5,2];
counts.forEach((count,day)=>{
 for(let i=0;i<count;i++) {
  const patient=data.patients[(day*18+i)%120], doctor=data.doctors[i%6], date=`2026-10-${String(day+5).padStart(2,'0')}`;
  const status=day<3 ? ['Concluída','Faltou','Cancelada'][i%3] : day===3 ? statuses[i%6] : ['Agendada','Confirmada'][i%2];
  const budget=data.budgets.find(b=>b.patientId===patient.id&&b.doctorId===doctor.id);
  data.appointments.push({id:`teste-a-${day}-${i}`,patientId:patient.id,doctorId:doctor.id,procedure:data.procedures[(i+day)%24].name,date,time:`${String(8+Math.floor(i/6)).padStart(2,'0')}:00`,duration:45,status,observation:'',attendance:'',budgetId:budget?.id??'',cancelReason:status==='Cancelada'?'Paciente solicitou cancelamento.':'',history:[]});
 }
});
for(let month=0;month<6;month++) {
 const period=monthWindow(ref,month-5);
 for(let i=0;i<8;i++) data.cashMovements.push({id:`teste-c-${month}-e-${i}`,type:'Entrada',date:`${period.key}-${String(i+1).padStart(2,'0')}`,amountCents:80000+month*7000+i*12000,description:`Recebimento informado ${i+1}`,category:'Atendimento',paymentMethod:i%2?'Cartão':'Pix',responsible:'Clara Monteiro',observation:'Movimentação manual fictícia, sem vínculo automático com orçamento.',history:[]});
 for(let i=0;i<4;i++) data.cashMovements.push({id:`teste-c-${month}-s-${i}`,type:'Saída',date:`${period.key}-${String(1+i*2).padStart(2,'0')}`,amountCents:60000+month*4000+i*18000,description:['Materiais da clínica','Serviço de laboratório','Manutenção','Despesas operacionais'][i],category:i===0?'Materiais':'Operacional',paymentMethod:'Pix',responsible:'Clara Monteiro',observation:'Movimentação manual fictícia.',history:[]});
}
for(let i=0;i<13;i++) {
 const quantity=i<3?i:10+i, minimum=5;
 const product={id:`teste-s-${i}`,code:`MAT-${String(i+6).padStart(3,'0')}`,name:['Algodão','Gaze','Sugadores','Escova profilática','Fio dental','Espelho clínico','Broca diamantada','Cimento provisório','Ponta de ultrassom','Papel articulador','Afastador','Tira de poliéster','Disco de polimento'][i],category:'Materiais',description:'',unit:'unidade',quantity,minimum,costCents:1200+i*800,supplier:'Fornecedor Exemplo',lot:`T-${i}`,expiresOn:'2027-12-31'};
 data.products.push(product);
 const received=quantity||5;
 data.movements.push({id:`teste-m-${i}`,productId:product.id,type:'Entrada',quantity:received,date:'2026-10-01',actor:'Equipe da clínica',reason:'Recebimento de material',supplier:product.supplier,purchaseCents:received*product.costCents,lot:product.lot,expiresOn:product.expiresOn,observation:''});
 if(!quantity)data.movements.push({id:`teste-m-${i}-out`,productId:product.id,type:'Saída',quantity:5,date:'2026-10-02',actor:'Equipe da clínica',reason:'Consumo interno',supplier:'',purchaseCents:0,lot:product.lot,expiresOn:'',observation:''});
}
data.users=[{id:'teste-u-1',name:'Clara Monteiro',email:'clara@example.com',phone:'',login:'clara',profile:'Recepção',permissions:['agenda:visualizar'],blocked:false,history:[]}];
for(const key of ['patients','doctors','procedures','budgets','products','movements','appointments','cashMovements','users']) assert.equal(new Set(data[key].map(r=>r.id)).size,data[key].length,`IDs únicos: ${key}`);
for(const a of data.appointments) {
 assert(data.patients.some(p=>p.id===a.patientId)); assert(data.doctors.some(d=>d.id===a.doctorId)); assert(data.procedures.some(p=>p.name===a.procedure));
 if(a.budgetId) assert(data.budgets.some(b=>b.id===a.budgetId&&b.patientId===a.patientId&&b.doctorId===a.doctorId));
}
for(const b of data.budgets) {assert(data.patients.some(p=>p.id===b.patientId));assert(data.doctors.some(d=>d.id===b.doctorId));}
for(const product of data.products) {
 const movements=data.movements.filter(m=>m.productId===product.id);
 for(const m of movements)if(m.type!=='Ajuste')assert(m.quantity>0);
 const balance=movements.reduce((sum,m)=>sum+(m.type==='Saída'?-m.quantity:m.quantity),0);
 assert.equal(balance,product.quantity,`Saldo e histórico: ${product.name}`);
}
for(let i=0;i<data.appointments.length;i++)for(let j=i+1;j<data.appointments.length;j++) {const a=data.appointments[i],b=data.appointments[j];assert(!(a.doctorId===b.doctorId&&a.date===b.date&&a.time===b.time));}
const low=data.products.filter(p=>p.quantity<p.minimum).length;
const totals=cashTotals(data.cashMovements.filter(m=>m.date.startsWith('2026-10')));
const expected={referenceDate:ref,patients:120,doctors:6,procedures:24,budgets:64,appointments:70,dayAppointments:18,weeklyCounts:counts,products:18,lowProducts:low,cashMovements:72,...totals,saldo:totals.entries-totals.exits};
assert.equal(low,6);assert.equal(data.patients.length,120);assert.equal(data.budgets.length,64);
fs.writeFileSync(artifact('scenario.json'),JSON.stringify(data,null,2));
fs.writeFileSync(artifact('scenario-summary.json'),JSON.stringify(expected,null,2));
console.log(expected);
