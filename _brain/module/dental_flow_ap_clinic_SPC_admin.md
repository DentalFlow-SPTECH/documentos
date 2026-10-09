---
kind: module
module: admin
---
# Administração

Estado em 08/10/2026, após a [entrega de listas compactas, clínicas, finalização e relatórios](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md).

A tela tem as abas Usuários, Clínicas (`aba=clinicas`) e Auditoria (`aba=auditoria`). Usuários em lista compacta, seis por página.

**Clínicas:** cadastro e edição com nome obrigatório; salvar sem mudança não gera evento. **Vincular registros sem clínica** (`administracao/vinculos`) lista consultas e movimentações de caixa ainda sem clínica, oito por página, e vincula somente os registros selecionados à clínica escolhida. Nenhuma clínica é atribuída automaticamente; um registro já vinculado não é alcançado por essa tela.

**Usuários:** cadastro e permissões são locais/demonstrativos. Perfil não atribui permissões automaticamente. Bloquear/reativar conserva ID e registra histórico. Salvar sem mudança efetiva não gera auditoria. Responsável local é “Você”, sem identidade autenticada de servidor. As visões de doutor e dona dos relatórios não usam essas permissões.

Código no `frontend`: `src/feature/admin/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/admin/view/admin_view.jsx) e [ViewModel](../../../frontend/src/feature/admin/view_model/use_admin_view_model.js). `saveClinicModel` e `linkClinicModel` ficam em `admin_model.js`. Auditoria é persistida pela sessão junto ao registro.

Testes: `test/e2e/{doctor_admin,clinic_flow,pagination,usability}.spec.js` e `test/unit/clinic_flow.test.js`. Cadastro demonstrativo de acesso não deve criar usuários ou privilégios aqui.

[Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Plano/evidências da migração](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)

Matriz efetiva, segurança de auditoria, autorização real e exclusão/inativação de clínica permanecem dependentes de definição e do backend.
