---
kind: module
module: agenda
---
# Agenda

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md). Ela substitui os limites e a apresentação da grade descritos na [versão A](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_visual_update.md), na [busca de cadastros](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md) e na [paginação](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_pagination.md).

## Regras

- Conflito compara início/fim do mesmo doutor em todas as clínicas, inclusive através da meia-noite. Intervalos encostados são permitidos; canceladas não ocupam o horário.
- Nova consulta exige clínica quando existe clínica cadastrada. Consulta anterior fica “Sem clínica” até a vinculação manual na Administração; nada é atribuído por inferência.
- Procedimento escolhido por busca e gravado por `procedureId`, com o nome copiado em `procedure`. Consultas antigas continuam ligadas pelo nome.
- Forma de atendimento Particular/Convênio, opcional. Texto anterior aparece como “Registro anterior”. Convênio é texto livre sugerido pelo cadastro do paciente.
- Edição preserva paciente e duração; orçamento vinculado pertence ao paciente; cancelar conserva o registro e aceita motivo opcional.
- “Concluída” só é atribuída por **Finalizar consulta**, que grava `completion` com os procedimentos realizados (vários por consulta; dente e região opcionais), histórico e auditoria, sem movimentar o Caixa. Repetir a finalização não duplica. Cancelada e Faltou não finalizam. Concluída antiga sem registro pode receber os procedimentos realizados.
- Consulta finalizada não é editada nem cancelada. A finalização pode ser corrigida até o relatório diário ser Enviado ou Validado; item com conferência de convênio não troca de procedimento nem é retirado.

## Interface

Semana em escala de 24 horas. Sem filtro de doutor: um bloco por horário de início, com quantidade e barra de situações. Com filtro: cartões proporcionais à duração, lado a lado quando se sobrepõem. O painel ao lado lista o dia ou o horário escolhido (`faixa`), quatro por página. Atalhos de período e avisos de consultas fora da área visível. Abaixo de 1280 px, alternância entre “Consultas do dia” e “Calendário”. `date`, `view`, `doutor`, `clinica`, `faixa` e `pagina` ficam na URL e acompanham detalhe, retorno e recarregamento.

## Código e testes

`frontend/src/feature/agenda/{model,repository,view_model,view}`: `agenda_model.js` (salvar, cancelar, finalizar) e `calendar_model.js` (projeções puras: segmentos, blocos por horário, grupos de sobreposição e consultas fora da janela). Funções compartilhadas em `src/demo/clinic.js`. [View](../../../frontend/src/feature/agenda/view/agenda_view.jsx) e [ViewModel](../../../frontend/src/feature/agenda/view_model/use_agenda_view_model.js). Rotas: `agenda`, `agenda/nova`, `agenda/:id`, `agenda/:id/editar` e `agenda/:id/finalizar`.

Testes: `test/unit/{calendar,clinic_session,clinic_flow}.test.js`; `test/e2e/{agenda,visual_a,clinic_flow,record_picker,usability}.spec.js`.

[Relatórios](dental_flow_ap_clinic_SPC_report.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Plano/evidências da migração](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)

Expediente, disponibilidade, duração por procedimento e reabertura de consulta finalizada não estão definidos. A escala de 24 horas não é regra de expediente.
