# Plano de execução da refatoração

Início autorizado pelo usuário em 06/10/2026. Referências locais iniciais: frontend `bb3bcc7`, documentos `bfe1970`; ambos sem alterações locais. Backend e infra contêm apenas seus READMEs. Repositórios permanecem independentes.

## Etapas

| Etapa | Entrega | Estado |
| --- | --- | --- |
| 1 | Referência de typecheck, build para Pages e suíte existente | Typecheck/build aprovados; suíte inicial interrompida, sem resultado completo |
| 2 | Decisão técnica, arquitetura, plano, brain e instruções de leitura | Concluída |
| 3 | JavaScript/JSX, configurações, testes e verificações | Concluída |
| 4 | Adapter de snapshot com compatibilidade e proteção da persistência | Concluída; sessão transacional e sete Repositories |
| 5 | Pacientes: Model, Repository, ViewModels e Views | Concluída |
| 6 | Demais módulos em MVVM | Concluída nos módulos existentes |
| 7 | Regressão integrada, documentação final e remoção da transição | Concluída no frontend existente; 230 testes aprovados e dois skips |

Ordem após Pacientes: Doutores e Estoque; Orçamentos/odontograma; Agenda; Caixa/Administração; Acesso/Revisão; Painel. A conclusão de uma etapa não equivale à conclusão de todo o sistema.

## Aceite por módulo

Preservar funcionamento, dados, visual, rotas, busca, recarregamento, recuperação de erros, foco, saída com alterações e bloqueio de envio. Conferir relações com outros módulos e auditoria. Registrar arquivos e comandos efetivamente validados.

## Documentação

Arquitetura, design afetado, README, procedimento de execução e fichas do brain atualizados. O briefing recebeu a stack em quatro células editáveis: `Identificação do Projeto!B12` e `Requisitos Não Funcionais!C8:E8` (RNF-DF05). Todos os demais valores, estilos, abas, mesclas e quantidades de validações foram comparados e preservados; não há fórmulas. Requisitos funcionais e seus IDs permanecem intactos. Modelagem de banco e contratos de integração não mudam automaticamente por adoção de MVVM.

## Evidência

Evidência executada em 06/10/2026, em alterações locais:

| Verificação | Resultado e limite |
| --- | --- |
| Referência TypeScript anterior | `npm run typecheck` e `npm run build:pages` aprovados. Suíte inicial interrompida antes de concluir; não declarada aprovada. |
| Piloto Pacientes | 32 testes aprovados em desktop e 375 px, antes da adição do cenário de dois envios no mesmo turno. |
| Conversão + piloto integrado | 230 testes aprovados e dois skips, incluindo envio duplicado. Build para Pages, Edge/Playwright, sem publicação. |
| Código final em MVVM | `npm run check` aprovado: lint, sete testes unitários e build normal. `npm run build:pages` aprovado, 93 módulos. |
| Regressão final | 230 testes aprovados, dois skips, zero falhas, em 6,4 min. Build final `/frontend/`, Edge/Playwright, desktop 1440 × 960 e mobile 375 × 812. |

Os sete testes sem navegador verificam snapshots legados, recuperação explícita, edição/ausência de mudança de paciente, falha de persistência, trava de gravações simultâneas, saldo atual de estoque e intervalos/relações de Agenda. A suíte de navegador mantém as 843 chamadas `expect` existentes; cinco chamadas novas verificam envio duplicado no piloto. Comparação adicional preservou as 852 chamadas completas de expect/matchers preexistentes. Os 16 arquivos CSS e as declarações de dependências de execução foram preservados. Não houve remoção de cenários ou assertions.

Capturas de Pacientes/Painel em desktop e de Pacientes/Orçamentos em 375 px foram inspecionadas. A suíte também verificou todas as telas com axe, reflow 320 px, textos longos e ampliação equivalente a 200%; Login/Cadastro foram testados com zoom nativo de 200% no desktop. Os skips são intencionais: zoom de desktop no projeto móvel e fluxo específico móvel no projeto desktop. `git diff --check` aprovado nos dois repositórios; links documentais locais resolvidos.

A configuração de publicação manual recebeu lint e testes unitários antes do build. Workflow não foi executado. Backend e infra continuam sem implementação de serviços. Na conclusão da validação local, commit, push e publicação ainda não tinham sido realizados. Build/preview local não comprova entrega integrada com backend, autenticação ou servidor.

## Versionamento

O usuário autorizou commit e push dos dois repositórios em 06/10/2026. O frontend foi enviado para `origin/main` no commit [6ed7571 — migração para JSX e MVVM](https://github.com/DentalFlow-SPTECH/frontend/commit/6ed75719b2c0a7f766583db39a89b0e343ce9279); o SHA remoto foi conferido após o push. Esta documentação acompanha a entrega em seu próprio repositório `DentalFlow-SPTECH/documentos`, na branch `main`. Consultar o histórico Git para o identificador do commit documental. O workflow de Pages continua com acionamento manual.

## Brain e economia de contexto

O [índice](../../_brain/dental_flow_ap_clinic_SPC_index.md) orienta leitura por assunto. Fichas resumem fontes existentes. Avaliar arquivos/contexto lidos, releituras e consumo real quando disponível em tarefas comparáveis; não converter número de caracteres diretamente em economia de tokens da sessão.
