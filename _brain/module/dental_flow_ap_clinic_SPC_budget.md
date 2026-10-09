---
kind: module
module: budget
---
# Orçamentos e odontograma

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md): orçamentos do paciente em lista compacta, seis por página. O editor mantém dez itens por página e o seletor de procedimento existente. Os itens do orçamento vinculado a uma consulta são sugeridos na finalização com origem “Orçamento”; finalizar não altera o orçamento, que continua não sendo receita.

Solicitação de 08/10/2026, após a busca: propostas de odontograma (arcada/mapa compacto) e cadastro de procedimentos preparadas para validação em prévia separada. Ainda não integrados. Campos propostos: nome e valor de referência, sem aprovar renomeação/exclusão ou reajuste de históricos. [Prévia e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md).

Continuação de 08/10/2026: seleção de paciente na lista e campos de paciente/doutor no editor usam o mesmo diálogo de busca da Agenda, com seis resultados por página, identificadores e confirmação por escolha. A busca da lista conserva `q` no detalhe/retorno/recarregamento. Resumo e cartões móveis seguem o acabamento da versão A. [Entrega/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md); teste específico `test/e2e/record_picker.spec.js`.

Preservar paciente, doutor, itens e históricos. Orçamentos iniciais são somente consulta; os criados localmente podem ser editados. Quantidade × preço em centavos compõe o total ilustrativo. Odontograma oferece dentição permanente/infantil e identificação FDI; superfícies continuam livres.

Código no `frontend`: `src/feature/budget/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/budget/view/budget_view.jsx) e [ViewModel](../../../frontend/src/feature/budget/view_model/use_budget_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano. O odontograma está em `view/odontogram.jsx`; identificação dos dentes fica em `model/teeth.js`.

Regressões: `test/e2e/demo.spec.js`, `odontogram.spec.js` e vínculos em `patient.spec.js`. Remover item deve remover seu erro e conservar o foco previsto.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Não interpretar orçamento como receita. Aprovação comercial, descontos, arredondamento e pagamentos integrados continuam pendentes.
