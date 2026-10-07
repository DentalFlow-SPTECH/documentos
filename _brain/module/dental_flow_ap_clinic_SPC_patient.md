---
kind: module
module: patient
---
# Pacientes

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
