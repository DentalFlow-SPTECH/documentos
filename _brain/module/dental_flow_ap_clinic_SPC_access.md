---
kind: module
module: access
---
# Login, Cadastro e Revisão

Login/Cadastro são demonstrações de interface. Senhas e confirmação ficam apenas no estado transitório do formulário; não gravar no navegador, navegação, arquivos, logs ou traces. Cadastro não modifica Administração, permissões, auditoria ou snapshot.

Código no `frontend`: `src/feature/access/{model,view_model,view}` e `src/feature/review/{view_model,view}`. [View de acesso](../../../frontend/src/feature/access/view/access_view.jsx) e [ViewModel de acesso](../../../frontend/src/feature/access/view_model/use_access_view_model.js) separados. Revisão controla lentidão/falhas em memória e restauração explícita pelo ViewModel; confirmação/foco ficam na View. Resultado integrado no plano.

Regressões: `test/e2e/access.spec.js`, `access_zoom.spec.js`, `demo.spec.js`. Manter `trace: off` e `screenshot: off` nos testes que preenchem senha. Recursos de revisão devem devolver o foco ao fechar.

[Plano/evidências](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)

Sessão, recuperação de conta, proteção de rotas e autenticação integrada continuam pendentes.
