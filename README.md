# Dental Flow — Repositório de Documentação

Este repositório corresponde à camada `e_doc` do ecossistema Dental Flow. Ele centraliza documentos de contexto, especificações, processos, modelos de dados e diagramas necessários para construir e operar o sistema de orçamento e gestão de estoque da clínica odontológica.

## Padrão para repositórios

Os novos repositórios da Dental Flow usam o formato abaixo:

```text
dental_flow_<type>_<name>
```

| Campo | Uso | Exemplo |
| --- | --- | --- |
| `dental_flow` | Prefixo da empresa Dental Flow | `dental_flow` |
| `type` | Natureza do repositório: `ms`, `ap` ou `cd` | `ap` |
| `name` | Nome funcional do produto ou domínio | `clinic` |

Tipos aceitos:

- `ms`: microserviço, como `dental_flow_ms_budget`.
- `ap`: aplicação, como `dental_flow_ap_clinic`.
- `cd`: componente transversal, como `dental_flow_cd_infrastructure`.

Os repositórios Git existentes (`backend`, `frontend`, `infra` e este repositório de documentos) permanecem com seus nomes e remotes atuais até uma migração explícita. Para novas criações, o padrão acima é obrigatório.

## Padrão para artefatos

Todo artefato documental deve usar este formato:

```text
dental_flow_<type>_<name>_<role>_<topic>.<ext>
```

| Campo | Regra |
| --- | --- |
| `type` | `ms`, `ap` ou `cd`, igual ao repositório atendido. |
| `name` | Nome funcional do sistema ou domínio, no singular. |
| `role` | Papel do documento: `CHAT`, `SPC`, `PRD`, `BPM`, `MER` ou `Class`. |
| `topic` | Assunto objetivo, em inglês e separado por `_`. |
| `ext` | Extensão compatível com o formato: `md`, `xlsx`, `drawio`, `mermaid`, `yaml` e outras. |

Exemplos:

- `dental_flow_ap_clinic_SPC_design.md`
- `dental_flow_ap_clinic_SPC_frontend_brief.xlsx`
- `dental_flow_ms_inventory_BPM_stock_entry.drawio`
- `dental_flow_ms_budget_MER_data_model.mermaid`

O histórico e as versões dos artefatos são controlados pelo Git. Não inclua data, hora ou versão no nome do arquivo, salvo quando houver uma regra externa que exija essa identificação.

## Estrutura de documentação

```text
e_doc/
├── 0_Context/
│   ├── a_governance/
│   ├── b_brief/
│   └── c_delivery/
├── 1_SPC/
│   ├── a_functional/
│   ├── b_technical/
│   ├── c_design/
│   ├── d_quality/
│   ├── e_operation/
│   └── f_api_integration/
├── 2_BPM/
├── 3_MER/
├── 4_Class/
├── z_mis/
│   └── a_reference/
└── _brain/
    ├── module/
    └── task/
```

Esta pasta Git representa `e_doc` no workspace do projeto. Os prefixos numéricos definem as fases de leitura; os prefixos alfabéticos ordenam os assuntos dentro de cada fase.

| Pasta | Finalidade |
| --- | --- |
| `0_Context` | Mantém a visão inicial do produto, o planejamento e os materiais que fundamentam o projeto antes da especificação. |
| `0_Context/a_governance` | Registra padrões, decisões, atas, responsabilidades e regras de manutenção do ecossistema. |
| `0_Context/b_brief` | Guarda briefing, escopo inicial, pesquisas e planilhas de entrada. A planilha de front-end pertence aqui. |
| `0_Context/c_delivery` | Reúne materiais de entrega, demonstrações, apresentações e registros de versão. |
| `1_SPC` | Contém a Specification, ou seja, a documentação que transforma a necessidade de negócio em implementação verificável. |
| `1_SPC/a_functional` | Centraliza requisitos funcionais e não funcionais, regras de negócio, histórias de usuário e critérios de aceite. |
| `1_SPC/b_technical` | Contém decisões técnicas, arquitetura e detalhes necessários para implementação. |
| `1_SPC/c_design` | Guarda design system, especificações de interface, wireframes, fluxos de navegação e conteúdo de tela. |
| `1_SPC/d_quality` | Mantém estratégia de qualidade, plano de testes, evidências, critérios de validação e acessibilidade. |
| `1_SPC/e_operation` | Reúne procedimentos de implantação, configuração, suporte e operação do sistema. |
| `1_SPC/f_api_integration` | Mantém contratos de API, coleções de teste, mapeamentos e documentação de integrações externas. |
| `2_BPM` | Guarda documentos de processo: contexto, PRD operacional e diagramas BPMN ou Draw.io. |
| `3_MER` | Centraliza o modelo entidade-relacionamento, dicionário de dados e diagramas do banco de dados. |
| `4_Class` | Mantém diagramas de classes, relacionamentos entre objetos e a documentação que os acompanha. |
| `z_mis` | Área temporária para rascunhos e materiais ainda sem classificação definitiva. O conteúdo deve ser movido para a pasta correta antes de uma entrega. |
| `z_mis/a_reference` | Guarda fontes, benchmarks, templates e documentos externos usados como consulta. |

Pastas sem artefatos têm `.gitkeep` para que a estrutura seja preservada pelo Git.

## Artefatos atuais

- [Especificação de design](1_SPC/c_design/dental_flow_ap_clinic_SPC_design.md)
- [Planilha de briefing de front-end](0_Context/b_brief/dental_flow_ap_clinic_SPC_frontend_brief.xlsx)
- [Decisão da stack do frontend](0_Context/a_governance/dental_flow_ap_clinic_SPC_frontend_stack_decision.md)
- [Arquitetura do frontend](1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)
- [Plano e evidências da refatoração](0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)
- [Critérios de validação](1_SPC/d_quality/dental_flow_ap_clinic_SPC_frontend_refactor_validation.md)
- [Execução e verificação local](1_SPC/e_operation/dental_flow_ap_clinic_SPC_frontend_execution.md)

## Brain e Obsidian

Abra esta pasta `documentos` como vault no Obsidian. O [brain](_brain/dental_flow_ap_clinic_SPC_index.md) contém o índice, contexto curto, fichas de módulo e retomada da tarefa; as especificações completas permanecem nas fases existentes. Não crie um segundo vault dentro de `_brain`.

Use links Markdown relativos entre notas para conservar a navegação no Obsidian e no GitHub. Backlinks e grafo são recursos nativos suficientes para a primeira etapa. `.obsidian/` e `.trash/` são locais e ignorados pelo Git; configurações pessoais não fazem parte da entrega.

Leia apenas as fontes pertinentes à tarefa. A economia de contexto depende dessa leitura seletiva e da manutenção das notas, e não da instalação do Obsidian. O brain não recebe transcrições, credenciais ou cópias completas de especificações. Seu andamento está no plano de refatoração.

## Regras de manutenção

- Não inclua arquivos temporários do Office, como `~$arquivo.xlsx`; eles são ignorados pelo Git.
- Atualize o artefato existente quando a mudança representar uma evolução do mesmo documento; o Git preserva o histórico.
- Crie um novo artefato apenas quando ele representar um documento diferente, com papel ou assunto próprio.
- Mantenha cada documento na fase e no assunto que melhor descrevem sua responsabilidade.
- Registre no próprio artefato toda informação assumida, pendente ou derivada.
