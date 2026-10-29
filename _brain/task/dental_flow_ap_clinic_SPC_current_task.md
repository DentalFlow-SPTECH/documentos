---
kind: task
status: implemented_and_validated
---
# Tarefa atual — Entrega SDD

Revisão documental de 29/10/2026: [planilha e Markdown SDD](../module/dental_flow_ap_clinic_SPC_sdd.md) alinhados ao frontend integrado no commit `87fbfcd0148346079a5476bd37de54cbea5c4f5d`. Preserva IDs antigos e explicita módulos ausentes. Código do frontend não alterado nesta tarefa. Validação: lint, 32 unitários e build aprovados; 60 E2E aprovados, 12 ignorados, sem falha, com API simulada. Commit e push do repositório de documentos autorizados pelo usuário em 29/10/2026; publicação da aplicação fora desta entrega.

## Histórico da tarefa de 08/10/2026

O registro abaixo corresponde à demonstração antiga; rotas, armazenamento e escopo foram substituídos pelo frontend integrado atual.

Solicitação de 08/10/2026 implementada nas cinco entregas: listas compactas, formulários e Agenda; clínicas; finalização de consulta; relatório diário; relatório mensal e glosas. O usuário aprovou as telas e adotou os caminhos recomendados (“gostei siga todos os caminhos recomendados e faça a implementação”). [Entrega, decisões, evidência e limites](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md).

Estado: commit e push autorizados pelo usuário em 08/10/2026 e integrados em `main` por fast-forward em 08/10/2026, também com autorização. Frontend: `main` em `7195584`. Documentação: `main` em `acfcb0f` na integração; alterações posteriores constam no Git. Os branches `feat/clinicas-finalizacao-relatorios` e `docs/clinicas-finalizacao-relatorios` continuam no remoto, nos mesmos commits. Publicação em Pages não autorizada nem acionada.

Verificação em 08/10/2026: lint, 20 unitários, build normal e build Pages aprovados. E2E no servidor de desenvolvimento: 275 aprovados, 3 skips previstos e nenhuma falha (13,8 min). E2E na prévia `/frontend/`: 275 aprovados, 3 skips previstos e nenhuma falha (10,5 min).

Contrato preservado: `dental_flow_demo_v1`, versão 1, IDs e relações; campos e coleções novos são opcionais. Registros anteriores ficam sem clínica até vinculação manual. Procedimento realizado não gera Caixa.

Dependências abertas, para decisão do usuário:

- Eventual publicação em Pages e remoção dos branches já integrados, se desejada.
- Controle de acesso das visões de doutor e dona (hoje telas locais) e demais itens que dependem de backend.
- Cadastro do catálogo de procedimentos e escolha do odontograma, ainda em [proposta](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md); editor de orçamentos mantém o seletor atual.
- Reabertura de relatório validado ou de consulta finalizada, catálogo de convênios, regras das operadoras, repasses e estoque por clínica.
- Rótulos de campo ficaram em 16 px (as imagens aprovadas usavam 14 px) por causa do teste de legibilidade existente.
- Divisão do bundle por rota (chunk JS em 615,62 kB).

Demonstração isolada com dados fictícios: gerador e servidor em `1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/`, origem `http://127.0.0.1:4190/frontend/`.

O aprendizado desta entrega virou um [prompt reutilizável](../../0_Context/a_governance/dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md) para gerar ou evoluir um frontend no mesmo padrão.

Preservar MVVM, CSS Modules, marca/IBM Plex Sans, snapshot versão 1 e relações. Ler os AGENTS, conferir Git e abrir somente as fontes pertinentes antes de retomar.
