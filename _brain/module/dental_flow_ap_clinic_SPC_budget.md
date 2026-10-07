---
kind: module
module: budget
---
# Orçamentos e odontograma

Preservar paciente, doutor, itens e históricos. Orçamentos iniciais são somente consulta; os criados localmente podem ser editados. Quantidade × preço em centavos compõe o total ilustrativo. Odontograma oferece dentição permanente/infantil e identificação FDI; superfícies continuam livres.

Código no `frontend`: `src/feature/budget/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/budget/view/budget_view.jsx) e [ViewModel](../../../frontend/src/feature/budget/view_model/use_budget_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano. O odontograma está em `view/odontogram.jsx`; identificação dos dentes fica em `model/teeth.js`.

Regressões: `test/e2e/demo.spec.js`, `odontogram.spec.js` e vínculos em `patient.spec.js`. Remover item deve remover seu erro e conservar o foco previsto.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Não interpretar orçamento como receita. Aprovação comercial, descontos, arredondamento e pagamentos integrados continuam pendentes.
