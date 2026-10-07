---
kind: module
module: agenda
---
# Agenda

Conflitos comparam início/fim do mesmo doutor, inclusive consultas que cruzam meia-noite. Intervalos encostados são permitidos; canceladas não ocupam o intervalo. Edição preserva paciente e duração. Orçamento vinculado deve pertencer ao paciente. Cancelar conserva o registro e aceita motivo opcional.

Código no `frontend`: `src/feature/agenda/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/agenda/view/agenda_view.jsx) e [ViewModel](../../../frontend/src/feature/agenda/view_model/use_agenda_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/agenda.spec.js`, `usability.spec.js`; teste de conflito/intervalos em `test/unit/clinic_session.test.js`.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Expediente, disponibilidade e transições de produção não são definidos pela refatoração. Manter data, visão e filtro de doutor na navegação.
