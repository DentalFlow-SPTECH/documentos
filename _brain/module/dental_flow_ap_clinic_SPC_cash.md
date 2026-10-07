---
kind: module
module: cash
---
# Caixa

Movimentações manuais exigem valor positivo em centavos, data válida e descrição. O saldo é entradas menos saídas dos registros filtrados; não é saldo bancário nem pressupõe saldo inicial. Orçamento, consulta e estoque não geram movimentação automaticamente.

Código no `frontend`: `src/feature/cash/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/cash/view/cash_view.jsx) e [ViewModel](../../../frontend/src/feature/cash/view_model/use_cash_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/cash.spec.js`, `dashboard.spec.js`, `usability.spec.js`. Conservar período/filtros nos retornos e recarregamento.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Conciliação, pagamentos integrados, estorno e relatórios de produção permanecem pendentes. Não aplicar a proibição de saldo negativo do estoque ao Caixa.
