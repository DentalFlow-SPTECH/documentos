---
kind: module
module: dashboard
---
# Painel

Resumo dos dados existentes, com período e acesso aos registros relacionados. Consultas registradas não equivalem a ocupação sem disponibilidade. Orçamento não é receita; movimentações manuais de caixa não são lucro. Gráficos têm alternativa textual/tabular.

Código no `frontend`: `src/feature/dashboard/{model,view_model,view}`. [View](../../../frontend/src/feature/dashboard/view/dashboard_view.jsx) e [ViewModel](../../../frontend/src/feature/dashboard/view_model/use_dashboard_view_model.js) separados. Agregações/datas usam funções puras; o resumo lê o snapshot compartilhado. Não cria Repository de gravação. Manter `/painel`, alias `/dashboard` e data na URL. Resultado integrado no plano.

Regressões: `test/e2e/dashboard.spec.js`, `usability.spec.js`. Datas usam o dia de São Paulo; conferir períodos no contexto da execução.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Não inventar produtividade, metas ou indicadores sem regra e dados suficientes.
