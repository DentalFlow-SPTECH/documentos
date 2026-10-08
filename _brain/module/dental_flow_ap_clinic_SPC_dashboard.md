---
kind: module
module: dashboard
---
# Painel

Continuação de 08/10/2026: listagens paginadas, preservando totais e registros completos. [Limites, contexto e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_pagination.md). A grade temporal e os gráficos conservam seus períodos; propostas visuais de odontograma/procedimentos continuam separadas da implementação.

Prévia de 08/10/2026: mesmo build com 120 pacientes, 64 orçamentos, 18 consultas no dia, seis materiais abaixo do mínimo e caixa manual em seis meses. Origem isolada 4189; preserva dados de 4178. Totais, gráficos, links e reload conferidos em desktop/celular. Nenhuma métrica nova. [Cenário e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md).

Resumo dos dados existentes, com período e acesso aos registros relacionados. Consultas registradas não equivalem a ocupação sem disponibilidade. Orçamento não é receita; movimentações manuais de caixa não são lucro. Gráficos têm alternativa textual/tabular.

Código no `frontend`: `src/feature/dashboard/{model,view_model,view}`. [View](../../../frontend/src/feature/dashboard/view/dashboard_view.jsx) e [ViewModel](../../../frontend/src/feature/dashboard/view_model/use_dashboard_view_model.js) separados. Agregações/datas usam funções puras; o resumo lê o snapshot compartilhado. Não cria Repository de gravação. Manter `/painel`, alias `/dashboard` e data na URL. Resultado integrado no plano.

Regressões: `test/e2e/dashboard.spec.js`, `usability.spec.js`. Datas usam o dia de São Paulo; conferir períodos no contexto da execução.

Versão A escolhida em 07/10/2026: indicadores separados em cartões arredondados, primeiro indicador escuro com valor turquesa e painéis claros. Consultas usam as mesmas cores/textos da Agenda. Métricas, ordenação, atalhos, períodos e alternativas textuais dos gráficos foram preservados. [Entrega visual e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_visual_update.md).

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Não inventar produtividade, metas ou indicadores sem regra e dados suficientes.
