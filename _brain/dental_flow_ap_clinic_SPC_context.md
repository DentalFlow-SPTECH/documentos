---
kind: context
---
# Contexto do Dental Flow

Aplicação acadêmica para clínica odontológica. Referência atual: frontend integrado à API, commit `87fbfcd0148346079a5476bd37de54cbea5c4f5d`, inspecionado em 29/10/2026. Escopo: Entrar, Hoje, Agenda, Pacientes, Clínica (dentistas, procedimentos e criação de acesso), Painel, Mapa do dia e Estoque (materiais/equipamentos). [SDD atual](module/dental_flow_ap_clinic_SPC_sdd.md).

`frontend`, `documentos`, `backend` e `infra` são repositórios independentes e ficam lado a lado. Backend atual usa Java/Spring Boot; sua implementação não foi reauditada nesta revisão documental.

Decisão confirmada: React + Vite + JavaScript/JSX + CSS Modules + MVVM. [Implementação e verificação atuais](../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md).

Dados vêm da API. Perfis atuais: DENTISTA e RECEPCIONISTA; clínica vem de /auth/me. Login por HTTP Basic, provisoriamente em sessionStorage, com inatividade de 30 minutos. Não tratar a demonstração antiga `dental_flow_demo_v1` como arquitetura atual. Orçamento/odontograma, Caixa independente, relatórios antigos e auditoria não têm rotas atuais; suas fontes históricas permanecem no Git e na comparação da SDD.

Interface atual: português brasileiro, direção A · Conversa, Figtree, tokens semânticos em `src/style/tokens.css`, CSS Modules e componentes próprios com primitivos Radix. Conflito de agenda apenas avisa; estoque valida saída contra saldo. Acessibilidade tem evidência automatizada e pendências explícitas, não certificação integral.

As fichas são resumos. Decisões do usuário e especificações pertinentes devem ser distinguidas de exemplos, propostas e comportamento demonstrativo. Evidência local não equivale a publicação ou entrega integrada.
