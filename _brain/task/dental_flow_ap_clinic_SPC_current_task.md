---
kind: task
status: implemented_and_validated
---
# Tarefa atual

Solicitação de 08/10/2026 implementada nas cinco entregas: listas compactas, formulários e Agenda; clínicas; finalização de consulta; relatório diário; relatório mensal e glosas. O usuário aprovou as telas e adotou os caminhos recomendados (“gostei siga todos os caminhos recomendados e faça a implementação”). [Entrega, decisões, evidência e limites](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md).

Estado: commit e push autorizados pelo usuário em 08/10/2026. Frontend: commit `7195584` no branch `feat/clinicas-finalizacao-relatorios` (base `8b40f7c`), push confirmado. Documentação: entregue no commit que contém esta ficha, no branch `docs/clinicas-finalizacao-relatorios`. Os dois `main` aguardam a integração dos branches; conferir o Git para o estado remoto. Publicação em Pages não autorizada nem acionada.

Verificação em 08/10/2026: lint, 20 unitários, build normal e build Pages aprovados. E2E no servidor de desenvolvimento: 275 aprovados, 3 skips previstos e nenhuma falha (13,8 min). E2E na prévia `/frontend/`: 275 aprovados, 3 skips previstos e nenhuma falha (10,5 min).

Contrato preservado: `dental_flow_demo_v1`, versão 1, IDs e relações; campos e coleções novos são opcionais. Registros anteriores ficam sem clínica até vinculação manual. Procedimento realizado não gera Caixa.

Dependências abertas, para decisão do usuário:

- Integração dos dois branches em `main` e eventual publicação.
- Controle de acesso das visões de doutor e dona (hoje telas locais) e demais itens que dependem de backend.
- Cadastro do catálogo de procedimentos e escolha do odontograma, ainda em [proposta](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md); editor de orçamentos mantém o seletor atual.
- Reabertura de relatório validado ou de consulta finalizada, catálogo de convênios, regras das operadoras, repasses e estoque por clínica.
- Rótulos de campo ficaram em 16 px (as imagens aprovadas usavam 14 px) por causa do teste de legibilidade existente.
- Divisão do bundle por rota (chunk JS em 615,62 kB).

Demonstração isolada com dados fictícios: gerador e servidor em `1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/`, origem `http://127.0.0.1:4190/frontend/`.

Preservar MVVM, CSS Modules, marca/IBM Plex Sans, snapshot versão 1 e relações. Ler os AGENTS, conferir Git e abrir somente as fontes pertinentes antes de retomar.
