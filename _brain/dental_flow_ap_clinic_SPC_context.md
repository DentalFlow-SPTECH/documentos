---
kind: context
---
# Contexto do Dental Flow

Aplicação acadêmica para clínica odontológica. O código disponível é uma demonstração frontend: Painel, Agenda, Pacientes, Doutores, Orçamentos/odontograma, Estoque, Caixa, Administração, Login/Cadastro e Revisão.

`frontend`, `documentos`, `backend` e `infra` são repositórios independentes e normalmente ficam lado a lado. Backend e infra contêm apenas READMEs na referência inicial desta migração.

Decisão confirmada: React + Vite + JavaScript/JSX + CSS Modules + MVVM. [Implementação e verificação atuais](../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md).

Dados fictícios são locais, sob `dental_flow_demo_v1`; preservar IDs, relações, histórico e registros do visitante. Não há contrato de API, autenticação efetiva ou permissões aplicadas pelo servidor.

Interface: português brasileiro, logotipo existente, IBM Plex Sans, foco visível e controles acessíveis. A mudança arquitetural preserva a interface. Estoque não permite saldo negativo; Caixa não recebe essa regra automaticamente.

As fichas são resumos. Decisões do usuário e especificações pertinentes devem ser distinguidas de exemplos, propostas e comportamento demonstrativo. Evidência local não equivale a publicação ou entrega integrada.
