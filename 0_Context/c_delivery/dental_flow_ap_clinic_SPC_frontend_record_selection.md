# Padronização visual e busca de pacientes/doutores

## Solicitação — 08/10/2026

O usuário pediu revisar as outras telas para manter um padrão visual e substituir os dropdowns de pacientes e doutores, pois listas grandes dificultam a escolha. O anexo mostra o seletor anterior de pacientes. A direção visual continua sendo a versão A aprovada; esta solicitação autoriza o ajuste de interação e acabamento local.

A continuação preserva as alterações ainda não versionadas da versão A. Os repositórios continuam em `main`, frontend `6ed7571` e documentos `742ecef`. Commit, push e publicação não foram executados nem autorizados nesta continuação.

## Resultado implementado

| Área | Mudança |
| --- | --- |
| Agenda: cadastro/edição | Paciente e doutor usam a mesma janela de busca. O paciente permanece bloqueado na edição, conforme a regra existente. |
| Agenda: filtro | Busca de doutor com a opção explícita Todos os doutores; conserva data/visão e contexto nos links. |
| Orçamentos: lista | Escolha de paciente por busca, igual no desktop e celular. A consulta de busca permanece em `q` na URL e é recuperada no retorno/recarregamento. |
| Orçamentos: editor | Campos Paciente e Doutor usam o mesmo componente da Agenda. Selecionar não grava um orçamento; o envio mantém a validação e transação existentes. |
| Busca | Pacientes por nome/código/CPF/telefone; doutores por nome/CRO/especialidade. Busca ignora diferenças de acento e permite identificar números sem pontuação. Até oito resultados por página, com contagem e Anterior/Próxima. |
| Identificação | Resultados exibem nome e dados adicionais disponíveis: código/nascimento/telefone do paciente e CRO/especialidade/contato do doutor. Não atribui identidade clínica com base em nome igual. A escolha conserva o ID do resultado selecionado. |
| Teclado | Foco inicial na busca, Tab/Shift+Tab circulam dentro da janela, Escape/Fechar retornam ao campo sem mudar a escolha. Enter na busca move o foco para o primeiro resultado sem selecionar ou enviar o formulário. |
| Estados | Busca sem resultados orienta refinar/limpar; coleção vazia informa a necessidade de cadastro. Erros continuam associados ao campo e recebem foco. Campos ficam bloqueados durante gravação; os rascunhos são preservados após falha. |
| Acabamento | Resumo do orçamento recebe preenchimento e fundo de painel; cartões móveis de orçamento/estoque, resumo de estoque e linhas de usuários seguem bordas/raios da versão A. Caixa perde o fundo cinza entre indicadores. Situações de consulta no detalhe do doutor usam as mesmas cores da Agenda/Painel. Tabelas e carregamento recebem o acabamento comum. |

Dropdowns de situações, tipos e outros catálogos pequenos continuam disponíveis. A alteração solicitada trata os cadastros de pacientes e doutores.

## Arquitetura e dados

`component/record_search.js` reúne funções puras de busca/metadados. `component/use_record_picker.js` controla janela, consulta e página. `component/record_picker.jsx` renderiza o campo e um `dialog` nativo, cuida do foco e usa CSS Modules. A janela fica em um portal; não vira um formulário aninhado nem se associa ao envio do formulário externo.

O componente recebe registros e comandos dos ViewModels existentes; não acessa provider, Repository ou armazenamento. Os limites entre dados, estado e apresentação são preservados. Não há dependência nova, conta real ou contrato de API. Chave `dental_flow_demo_v1`, versão 1, IDs, relações, histórico, auditoria e regras de persistência/estoque continuam iguais.

A busca e paginação usam o snapshot em memória desta demonstração. Isso limita o número de resultados renderizados; não representa busca remota ou paginação de banco. Na futura integração, a consulta e o carregamento de páginas devem ser definidos pelo contrato real, preservando a escolha por ID.

A interação do diálogo segue o [padrão WAI-ARIA de diálogo modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), incluindo fechamento e retorno de foco. A referência orienta o comportamento; a prova local abaixo não certifica acessibilidade em todos os dispositivos ou leitores de tela.

## Evidência executada

- `npm run check`: aprovado, com lint, 11 testes unitários e build normal.
- `npm run build:pages`: aprovado; chunk de 504,92 kB (144,52 kB gzip). O aviso de tamanho permanece visível.
- Piloto: seleção/persistência com 1.204 pacientes e 122 doutores, homônimos, identificadores, filtro, cadastros vazios e verificação das telas existentes. Foco/Escape corrigidos; cenário específico reexecutado com dois testes aprovados em desktop/celular.
- Integração completa do build `/frontend/`: 244 casos em 7,8 minutos, com 240 aprovados, dois skips existentes e dois interrompidos por uma ambiguidade no seletor de teste (`getByLabel` encontrou tanto diálogo quanto campo de busca). O teste passou a localizar o papel `searchbox`, sem alteração no aplicativo. `--last-failed` repetiu os dois casos de retorno/recarregamento em desktop/celular: dois aprovados em 9,0 segundos. Resultado combinado: **242 cenários aprovados e dois skips**; não é uma segunda execução integral.
- Os skips existentes são seleção móvel da Agenda no projeto desktop e zoom nativo no projeto mobile; seus cenários foram executados nos projetos correspondentes. A regressão cobre os módulos anteriores, axe, reflow de 320 px, zoom de 200%, carregamento/falhas, bloqueios e dados após recarregamento.
- Capturas reais de oito contextos em desktop 1440 × 960 e celular 375 × 812: busca de paciente/doutor, novo orçamento/consulta, lista de orçamentos, estoque, caixa e administração. Geração sem erros de console ou overflow e revisão visual executadas.
- Após ajustar o seletor de teste, `npm run lint` aprovado. `git diff --check` aprovado nos dois repositórios; 101 links locais das fontes Markdown alteradas/novas verificados, sem destinos ausentes. Prévia `/frontend/` responde HTTP 200.
- Novos cenários em `test/e2e/record_picker.spec.js`. As suítes existentes foram adaptadas para operar a busca real; permanecem as verificações de vínculos, conflitos, falhas, bloqueio, teclado e persistência.

O conjunto grande contém somente registros fictícios em contextos isolados do Edge. Não mede latência de backend nem concorrência real. A busca não grava no armazenamento do navegador do usuário. Playwright/axe, desktop/celular e reflow não substituem avaliação com pessoas, leitor de tela ou aparelho físico.

Comandos da integração e repetição, executados em `frontend` com o build para Pages já servido:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:4178/frontend/'
node node_modules/@playwright/test/cli.js test
node node_modules/@playwright/test/cli.js test --last-failed
```

## Revisão

Use a [execução local](../../1_SPC/e_operation/dental_flow_ap_clinic_SPC_frontend_execution.md) e abra `http://127.0.0.1:4178/frontend/#/orcamentos/novo` ou `#/agenda/nova`. Escolha Paciente/Doutor para abrir a busca. As capturas da interface usam dados fictícios; seus conteúdos não alteram o cenário inicial da aplicação.

[Agenda](../../_brain/module/dental_flow_ap_clinic_SPC_agenda.md) · [Orçamentos](../../_brain/module/dental_flow_ap_clinic_SPC_budget.md) · [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Versão A anterior](dental_flow_ap_clinic_SPC_frontend_visual_update.md)

Continuação: a versão A e a busca foram incluídas no commit frontend 8b40f7c, com push confirmado. A [entrega de paginação](dental_flow_ap_clinic_SPC_frontend_pagination.md) registra os limites e a evidência posterior desta continuação. As descrições anteriores de alterações locais referem-se às respectivas rodadas históricas.
