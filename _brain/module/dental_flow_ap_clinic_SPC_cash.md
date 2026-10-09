---
kind: module
module: cash
---
# Caixa

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md): movimentações em lista compacta, seis por página, com filtros e totais na mesma tela. A movimentação pode receber uma clínica (opcional); o filtro `clinica` fica na URL e inclui “Sem clínica”. Movimentações anteriores ficam sem clínica até a vinculação manual na Administração. Finalizar consulta e registrar conferência de convênio não criam movimentação: recebimento continua sendo lançamento manual.

Acabamento de 08/10/2026: os cartões de totais mantêm o fundo da página entre eles, seguindo as superfícies da versão A. [Entrega/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md).

Movimentações manuais exigem valor positivo em centavos, data válida e descrição. O saldo é entradas menos saídas dos registros filtrados; não é saldo bancário nem pressupõe saldo inicial. Orçamento, consulta e estoque não geram movimentação automaticamente.

Código no `frontend`: `src/feature/cash/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/cash/view/cash_view.jsx) e [ViewModel](../../../frontend/src/feature/cash/view_model/use_cash_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/cash.spec.js`, `clinic_flow.spec.js`, `dashboard.spec.js`, `pagination.spec.js`, `usability.spec.js`. Conservar período/filtros nos retornos e recarregamento.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Conciliação, pagamentos integrados e estorno permanecem pendentes. Produção e glosas ficam em [Relatórios](dental_flow_ap_clinic_SPC_report.md), sem ligação automática com o Caixa. Não aplicar a proibição de saldo negativo do estoque ao Caixa.
