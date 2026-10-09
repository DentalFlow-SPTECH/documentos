---
kind: module
module: dashboard
---
# Painel

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md). As listas de consultas do dia, de atenção ao estoque e de orçamentos recentes saíram do Painel; ele mostra indicadores do mês e atalhos para os módulos. A [versão A](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_visual_update.md) continua sendo a referência de cores e superfícies.

## Abas

- **Visão geral:** consultas registradas, finalizadas, faltas e canceladas, pacientes atendidos, quadro “Por clínica” e pendências (consultas sem finalização, relatórios a conferir e em correção, convênios aguardando retorno, registros sem clínica e materiais abaixo do mínimo), cada uma com atalho.
- **Produção e relatórios:** procedimentos realizados por forma de atendimento, relatórios diários esperados/validados/pendentes, produção por doutor e procedimentos mais realizados.
- **Financeiro:** entradas, saídas e saldo das movimentações manuais do mês, comparação de seis meses com tabela, e convênios em conferência (apresentado, aguardando retorno, glosado e itens sem valor).

## Regras

Consultas registradas não medem ocupação. Finalizada é a consulta com procedimentos realizados. Paciente conta uma vez no total de todas as clínicas. Produção conta itens realizados, nunca o agendado ou o orçado. Orçamento não é receita; valor apresentado a convênio não é recebimento; valor desconhecido não entra como zero. Registros sem clínica aparecem em linha própria e como pendência.

## Código e testes

`frontend/src/feature/dashboard/{model,view_model,view}`. [View](../../../frontend/src/feature/dashboard/view/dashboard_view.jsx) e [ViewModel](../../../frontend/src/feature/dashboard/view_model/use_dashboard_view_model.js). Agregações são funções puras em `dashboard_model.js`, que reutiliza `report_model.js`; o Painel lê o snapshot e não grava. Manter `/painel`, o alias `/dashboard` e `date`, `aba` e `clinica` na URL. O mês segue o dia de São Paulo.

Testes: `test/e2e/{dashboard,pagination,usability}.spec.js` e `test/unit/clinic_flow.test.js`.

[Relatórios](dental_flow_ap_clinic_SPC_report.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Plano/evidências da migração](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)

Não inventar produtividade, metas, repasses ou indicadores sem regra e dados suficientes.
