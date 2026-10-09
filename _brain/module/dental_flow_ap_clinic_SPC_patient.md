---
kind: module
module: patient
---
# Pacientes

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md): lista compacta com oito pacientes por página e orçamentos do paciente em páginas de seis. O formulário tem quatro seções navegáveis (Dados pessoais, Contato, Endereço, Informações adicionais), um seletor de seção no celular (`#patient_section`) e barra de ações fixa; um erro abre a seção do campo e leva o foco a ele. O paciente é único entre clínicas e conta uma vez nos totais. Convênio e carteirinha do cadastro são apenas sugeridos no agendamento e na finalização.

## Regras confirmadas

Somente nome completo é obrigatório no protótipo. Outros campos são opcionais; não inventar unicidade, máscaras ou validações de CPF/contatos. Edição conserva ID/código e vínculos com orçamentos. Salvar sem mudanças não gera histórico ou auditoria. Erro conserva preenchimento; navegação com mudanças permite continuar ou descartar.

## Código e migração

Repositório: `frontend`. Referência inicial: `bb3bcc7`; migração em alterações locais. Código atual em `src/feature/patient/{model,repository,view_model,view}`. `view/patient_view.jsx` renderiza lista, detalhe e formulário; três ViewModels concentram seus estados e comandos. Model/Repository usam a sessão compartilhada. Campos compatíveis ficam em `src/demo/patient.js`.

## Verificação e fontes

Regressões: `test/e2e/patient.spec.js`. Rodada do piloto: 32 cenários aprovados (desktop e 375 px). A rodada integrada do piloto aprovou 230 testes e dois skips, incluindo dois envios no mesmo turno (um registro, histórico e auditoria, conservados no reload). A rodada final após os demais módulos também aprovou 230 testes e dois skips; conferir o plano para os limites da evidência. Abrangem busca, cadastro, edição, vínculos, histórico, erros, saída e snapshots.

- [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)
- [Critérios de validação](../../1_SPC/d_quality/dental_flow_ap_clinic_SPC_frontend_refactor_validation.md)
- [Design e requisitos de origem](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_design.md)

Prontuário, pagamentos, inativação e regras clínicas integradas continuam fora deste cadastro demonstrativo.
