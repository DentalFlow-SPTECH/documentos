---
kind: module
module: inventory
---
# Estoque

Decisão confirmada: não permitir saldo negativo. A saída precisa de quantidade inteira positiva e motivo, valida o saldo atual novamente dentro da operação e pode chegar exatamente a zero. Gravar saldo, movimento e auditoria juntos. Entrada não gera pagamento e saída não gera lançamento de Caixa.

Código no `frontend`: `src/feature/inventory/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/inventory/view/inventory_view.jsx) e [ViewModel](../../../frontend/src/feature/inventory/view_model/use_inventory_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/demo.spec.js`, `usability.spec.js`; teste sem navegador de saldo/gravação atômica em `test/unit/clinic_session.test.js`.

[Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)

Precisão, lotes, vencimento, ajustes e custeio do produto integrado continuam pendentes. A regra de saldo de estoque não se aplica automaticamente ao Caixa.
