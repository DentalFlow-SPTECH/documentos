---
kind: module
module: report
---
# Relatórios

Módulo criado em 08/10/2026 pela [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md). Lê os procedimentos realizados gravados na finalização da consulta ([Agenda](dental_flow_ap_clinic_SPC_agenda.md)). Nada aqui gera cobrança, recebimento, repasse ou comissão.

## Relatório diário

- Um relatório por data, doutor e clínica, para cada combinação com consulta finalizada ou relatório iniciado.
- Estados: Rascunho → Enviado → Em correção ou Validado. Validado é final. O estado do relatório é independente da situação da consulta.
- Enviar exige ao menos uma consulta finalizada e fixa as consultas incluídas; reenviar um relatório já enviado devolve o mesmo registro. Devolver exige motivo e libera a correção das finalizações; o novo envio volta a fixá-las.
- `relatorios/diario` é a visão do doutor; `relatorios/conferencia` é a visão da dona. São telas locais, sem controle de acesso.

## Relatório mensal e glosas

- `relatorios/mensal` lista os procedimentos realizados por data de execução ou por data de retorno do convênio; filtros de clínica, doutor, forma de atendimento, convênio e situação ficam na URL.
- Conferência por item de convênio: guia, valor apresentado, data e resultado do retorno (Aguardando, Sem glosa, Glosa parcial, Glosa total), valor glosado e motivo. Item sem registro fica “A conferir”.
- Valor apresentado desconhecido permanece vazio e é contado à parte; nunca vira zero. Glosa parcial fica entre zero e o valor apresentado; o valor apresentado não é sobrescrito. Cada registro acrescenta uma linha ao histórico do item.
- Totais usam “apresentado”, “aguardando retorno”, “glosado” e “sem glosa”. Nada é chamado de recebido; recebimento é lançamento manual no [Caixa](dental_flow_ap_clinic_SPC_cash.md).
- Impressão pelo navegador e exportação CSV; valores desconhecidos saem vazios.

## Código e testes

`frontend/src/feature/report/{model,repository,view_model,view}`. Regras em `report_model.js`; gravações em `report_repository.js` (`saveDailyReport`, `reviewDailyReport`, `saveClaim`); [View](../../../frontend/src/feature/report/view/report_view.jsx) e [ViewModel](../../../frontend/src/feature/report/view_model/use_report_view_model.js). Dados: coleção `dailyReports` e `claim`/`history` em cada item de `appointment.completion.items`, no snapshot versão 1.

Testes: `test/unit/clinic_flow.test.js`; `test/e2e/{clinic_flow,dashboard,usability}.spec.js`.

[Painel](dental_flow_ap_clinic_SPC_dashboard.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Sem integração com operadoras, regra contratual ou valor automático. Reabertura de relatório validado, catálogo de convênios e controle de acesso por perfil dependem de decisão e do backend.
