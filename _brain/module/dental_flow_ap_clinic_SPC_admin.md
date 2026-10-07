---
kind: module
module: admin
---
# Administração

Cadastro de usuários e permissões é local/demonstrativo. Perfil não atribui permissões automaticamente. Bloquear/reativar conserva ID e registra histórico. Salvar sem mudança efetiva não gera auditoria. Responsável local é “Você”, sem identidade autenticada de servidor.

Código no `frontend`: `src/feature/admin/{model,repository,view_model,view}`. [View](../../../frontend/src/feature/admin/view/admin_view.jsx) e [ViewModel](../../../frontend/src/feature/admin/view_model/use_admin_view_model.js) separados; Model/Repository usam a sessão transacional compartilhada. Verificações estruturais, unitárias e builds aprovados; resultado integrado no plano. Auditoria é persistida pela sessão junto ao registro.

Regressões: `test/e2e/doctor_admin.spec.js`, `usability.spec.js`. Cadastro demonstrativo de acesso não deve criar usuários ou privilégios aqui.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Matriz efetiva, segurança de auditoria e autorização real permanecem dependentes do backend.
