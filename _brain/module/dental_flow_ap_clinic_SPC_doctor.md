---
kind: module
module: doctor
---
# Doutores

Continuação de 08/10/2026: listagens paginadas, preservando totais e registros completos. [Limites, contexto e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_pagination.md). A grade temporal e os gráficos conservam seus períodos; propostas visuais de odontograma/procedimentos continuam separadas da implementação.

Continuação de 08/10/2026: situações de consultas vinculadas usam as mesmas cores/textos da Agenda e Painel. A seleção de doutor nos formulários e filtro da Agenda usa a busca compartilhada por nome/CRO/especialidade, com identificadores e escolha por ID. [Entrega e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md).

Nome completo é o mínimo do cadastro demonstrativo; demais campos permanecem opcionais. Conservar IDs e vínculos com consultas/orçamentos. Salvar sem mudanças não cria evento. Status profissional é texto opcional, sem ciclo de ativação inventado.

Código no `frontend`: `src/feature/doctor/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/doctor/view/doctor_view.jsx) e [ViewModel](../../../frontend/src/feature/doctor/view_model/use_doctor_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/doctor_admin.spec.js` e fluxos relacionados de Agenda/Orçamentos.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Disponibilidade, procedimentos por profissional e regras profissionais integradas ainda dependem de definição.
