---
kind: module
module: agenda
---
# Agenda

Continuação de 08/10/2026: listagens paginadas, preservando totais e registros completos. [Limites, contexto e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_pagination.md). A grade temporal e os gráficos conservam seus períodos; propostas visuais de odontograma/procedimentos continuam separadas da implementação.

Continuação de 08/10/2026: campos de paciente/doutor e filtro de doutor usam busca compartilhada em diálogo, com até oito resultados por página e seleção por ID. Paciente continua bloqueado na edição; data/visão/filtro e validação de conflitos continuam preservados. [Entrega e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md); teste específico `test/e2e/record_picker.spec.js`.

Conflitos comparam início/fim do mesmo doutor, inclusive consultas que cruzam meia-noite. Intervalos encostados são permitidos; canceladas não ocupam o intervalo. Edição preserva paciente e duração. Orçamento vinculado deve pertencer ao paciente. Cancelar conserva o registro e aceita motivo opcional.

Código no `frontend`: `src/feature/agenda/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/agenda/view/agenda_view.jsx) e [ViewModel](../../../frontend/src/feature/agenda/view_model/use_agenda_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano.

Regressões: `test/e2e/agenda.spec.js`, `usability.spec.js`; teste de conflito/intervalos em `test/unit/clinic_session.test.js`.

Versão A aprovada em 07/10/2026: grade fixa de 24 horas com dias/datas, minutos/duração proporcionais, sobreposições em colunas e continuação entre dias. `model/calendar_model.js` gera projeções puras sem alterar/persistir consultas. O mês mostra prévias no desktop; o celular usa contagens e cartões completos do dia. Cores e textos distinguem as seis situações. Data, visão e doutor permanecem no detalhe/retorno. Testes específicos: `test/unit/calendar.test.js` e `test/e2e/visual_a.spec.js`. [Entrega visual e evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_visual_update.md).

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Expediente, disponibilidade e transições de produção não são definidos pela refatoração. Manter data, visão e filtro de doutor na navegação.
