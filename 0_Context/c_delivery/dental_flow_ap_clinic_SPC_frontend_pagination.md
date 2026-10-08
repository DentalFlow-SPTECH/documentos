# Paginação das listagens do frontend

## Solicitação e comportamento — 08/10/2026

O usuário solicitou um limite por página e escolheu aplicá-lo a todas as listagens do sistema. Também autorizou commit e push das alterações preparadas nesta continuação. Publicação em Pages não faz parte desta autorização.

| Listagem | Registros por página |
| --- | --- |
| Pacientes, Doutores, Estoque, Caixa, usuários da Administração e Orçamentos do paciente | 10 |
| Histórico cadastral, histórico de orçamento/consulta/caixa, movimentos de material e auditoria | 10 |
| Orçamentos relacionados a paciente/doutor e consultas do doutor | 10 |
| Consultas do dia na Agenda mensal e na lista semanal móvel | 10 |
| Itens do orçamento, em edição ou leitura | 10 |
| Painel: consultas / materiais abaixo do mínimo / orçamentos recentes | 6 / 4 / 5 |
| Diálogos existentes de seleção de paciente/doutor | 8, comportamento anterior preservado |

Cada lista exibe a faixa e a quantidade total; quando houver mais de uma página, oferece Anterior, Próxima e a página atual. As consultas da grade temporal continuam posicionadas pelo horário e duração completos. Essa grade, os dentes FDI, campos/permissões fixos, sete dias do gráfico e seis meses da comparação não são listas abertas de registros.

Nas listas principais e nas consultas do dia da Agenda, `pagina` conserva o contexto na URL, inclusive ao abrir um detalhe, voltar e recarregar. Alterar filtro, paciente ou dia reinicia a seleção da página. Páginas inválidas são limitadas ao intervalo disponível. Históricos, relações, auditoria, cartões do Painel e itens do editor usam páginas locais independentes; recarregar ou mudar de rota reinicia suas páginas. Não há gravação de preferências no snapshot.

Os filtros e cálculos usam o conjunto completo antes do recorte visual. Totais do Caixa descrevem todas as movimentações da seleção, incluindo outras páginas. O total e o odontograma do orçamento consideram todos os itens. Inclusão abre a página do novo item; uma validação em outra página abre essa página antes de focar o primeiro campo com erro. Remoção mantém a página dentro do intervalo disponível.

## Implementação

`src/component/use_pagination.js` concentra estado e navegação; `paged_list.jsx` e seu CSS Module compartilham faixa, controles, recorte e foco. Os ViewModels conservam filtros/contexto e o editor mantém validação e totais completos. Views renderizam o conjunto visível. A chave `dental_flow_demo_v1`, versão 1, IDs, relações e operações transacionais permanecem compatíveis.

Não foi acrescentada consulta de API: a paginação limita a renderização sobre os dados da demonstração local. Paginação no servidor pertence a uma integração futura.

## Verificação e entrega

O teste `test/e2e/pagination.spec.js` usa 24 registros por conjunto para verificar primeira/última página, filtros, detalhes/retorno, reload, limite para parâmetros inválidos, preservação do snapshot, totais de Caixa, relações/históricos/auditoria, cartões do Painel e onze/doze itens de orçamento com validação em outra página. Desktop 1440 × 960 e celular 375 × 812, axe e reflow 320 px fazem parte da prova.

`npm run check` aprovado: lint, 11 testes unitários e build normal. Lint e builds normal/Pages também aprovados após o ajuste final do singular da faixa. Chunk Pages: 508,39 kB (145,37 kB gzip); o aviso existente acima de 500 kB permanece e não impede o build.

A rodada integral de 264 combinações na prévia `http://127.0.0.1:4178/frontend/` teve 258 aprovadas, dois skips previstos e quatro falhas por seletores de status ambíguos nos testes de Caixa e bloqueio/reativação. Foram restringidos somente esses seletores. No build final, os casos afetados e toda a paginação passaram com 24 verificações, sem falhas:

```powershell
$env:TEST_BASE_URL='http://127.0.0.1:4178/frontend/'
npm run test:e2e
npm run test:e2e -- test/e2e/cash.spec.js:152 test/e2e/doctor_admin.spec.js:170 test/e2e/pagination.spec.js
```

O conjunto validado reúne **262 combinações de cenário/largura aprovadas e dois skips**, em rodadas separadas. Vinte das verificações finais repetem a paginação; não são somadas novamente ao total distinto. Os skips pertencem à seleção móvel e ao zoom nativo nos projetos que não lhes correspondem, com execução nos projetos próprios. Capturas, axe, foco, snapshot e reflow passaram nos estados cobertos. A prova local não representa backend, autenticação real ou publicação do workflow.

Frontend: commit `8b40f7c117878fa4a7cfff351ec68fd7f41a2f11` em `main`, push confirmado por igualdade entre HEAD e `refs/heads/main` do remoto e árvore limpa. Inclui a versão A, a busca de cadastros e a paginação desta continuação. Esta documentação é entregue no commit que contém este registro. `git diff --check` e links locais foram conferidos; não foi acionado o workflow manual de Pages.

As propostas de odontograma e cadastro de procedimentos continuam aguardando escolha visual. Seus geradores, HTML/CSS/JS, cenário fictício, capturas e relatório estão preservados em `1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/`, separados do código de aplicação. A [prévia](dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md) registra os comandos portáveis e seus limites.

[Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Design](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_design.md) · [Tarefa atual](../../_brain/task/dental_flow_ap_clinic_SPC_current_task.md)
