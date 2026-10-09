---
kind: context
---
# Contexto do Dental Flow

Aplicação acadêmica para clínica odontológica. O código disponível é uma demonstração frontend: Painel, Agenda (com finalização de consulta), Pacientes, Doutores, Orçamentos/odontograma, Estoque, Caixa, Relatórios (diário, conferência, mensal e glosas), Administração (usuários, clínicas e auditoria), Login/Cadastro e Revisão.

`frontend`, `documentos`, `backend` e `infra` são repositórios independentes e normalmente ficam lado a lado. Backend e infra contêm apenas READMEs na referência inicial desta migração.

Decisão confirmada: React + Vite + JavaScript/JSX + CSS Modules + MVVM. [Implementação e verificação atuais](../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md).

Dados fictícios são locais, sob `dental_flow_demo_v1`, versão 1; preservar IDs, relações, histórico e registros do visitante. Clínicas, finalização e relatórios usam campos e coleções opcionais; registros anteriores ficam sem clínica até a vinculação manual. As visões de doutor e dona são telas locais, sem controle de acesso. Procedimento realizado não gera cobrança nem lançamento de Caixa. Não há contrato de API, autenticação efetiva ou permissões aplicadas pelo servidor.

Interface: português brasileiro, logotipo existente, IBM Plex Sans, foco visível e controles acessíveis. A mudança arquitetural preserva a interface. Estoque não permite saldo negativo; Caixa não recebe essa regra automaticamente.

As fichas são resumos. Decisões do usuário e especificações pertinentes devem ser distinguidas de exemplos, propostas e comportamento demonstrativo. Evidência local não equivale a publicação ou entrega integrada.
