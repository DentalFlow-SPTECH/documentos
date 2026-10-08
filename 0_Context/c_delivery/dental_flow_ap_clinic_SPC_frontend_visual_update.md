# Atualização visual do frontend — versão A

## Decisão e origem

Em 07/10/2026, o usuário solicitou analisar `C:\Users\maquina\Downloads\referencia-para-front.pdf`, planejar a execução e apresentar imagens antes de implementar. Após comparar três propostas, confirmou: **“vamos seguir com a versão a mesmo”**. Essa escolha autoriza a implementação visual local da versão A.

O PDF é uma referência de ideias para a interface. Seus exemplos não aprovam regras clínicas, horários de expediente, indicadores financeiros ou contratos de integração. A [imagem aprovada](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_visual_reference.png) registra a direção visual; seus dados são fictícios e não substituem os dados da aplicação.

Referência inicial do código: `frontend`, branch `main`, commit `6ed7571`, sem alterações locais. Referência documental: `documentos`, branch `main`, commit `742ecef`, sem alterações locais. Não houve troca de branch, commit, push ou publicação nesta execução.

## Plano e recorte implementado

| Etapa | Resultado |
| --- | --- |
| Ler o PDF e conferir o frontend existente | Cinco páginas analisadas; arquitetura, dados locais e fluxos usados como limites da mudança. |
| Apresentar alternativas em imagens | Três propostas apresentadas antes do código; versão A escolhida pelo usuário. |
| Aplicar a identidade da versão A | Barra lateral escura com marca original, seleção turquesa, superfícies claras e painéis arredondados. IBM Plex Sans e CSS Modules mantidos. |
| Reorganizar a Agenda semanal | Escala fixa de 24 horas, cabeçalhos com dia/data, início e duração proporcionais, sobreposições lado a lado e continuação entre dias. Rolagem dentro do calendário; a abertura mostra uma hora antes da primeira consulta, ou 08:00 na semana vazia. Isso não define expediente. |
| Melhorar a Agenda mensal | Semanas completas, datas adjacentes discretas, até três prévias por dia no desktop e acesso a todas as consultas do dia. No celular, contagens no calendário e cartões completos abaixo. |
| Uniformizar as situações das consultas | Agendada amarela, Confirmada verde, Em atendimento turquesa, Concluída azul, Cancelada vermelha e Faltou neutra. Textos e nomes acessíveis acompanham as cores. |
| Aplicar os cartões do Painel e demais módulos | Primeiro indicador escuro, demais indicadores claros, painéis e listas arredondados. Ajustes equivalentes em Pacientes, Doutores, Orçamentos, Estoque, Caixa, Administração e Acesso. |
| Validar e documentar | Lint, 11 testes unitários, builds e integração com 234 testes aprovados e dois skips. README, design, arquitetura, qualidade, execução e brain atualizados. |

## Implementação e preservação

O Model da Agenda projeta intervalos por dia e distribui as sobreposições em colunas sem alterar as consultas. O ViewModel mantém período, visão, doutor e links de retorno. A View controla foco, rolagem e geometria CSS. Não foram adicionadas dependências.

Permanecem a chave `dental_flow_demo_v1`, versão 1, IDs, relações, registros, históricos e auditoria. Os filtros e hash routes são preservados. A leitura dos calendários não grava dados. As regras de conflito, cancelamento, saldo de estoque, dinheiro em centavos e gravação transacional continuam nos Models/Repositories existentes. Login e Cadastro continuam demonstrações sem autenticação real e sem persistir senhas.

Backend, publicação, prontuário, recebimentos automáticos e novas políticas comerciais não fazem parte deste recorte. A aprovação visual não encerra as decisões funcionais pendentes.

## Verificação executada

- `npm run check`: aprovado no código final, com lint, 11 testes unitários e build normal. Os testes incluem projeção por minutos, duração, sobreposição, datas adjacentes, ano bissexto e meia-noite.
- `npm run build:pages`: aprovado. Vite informa um chunk JavaScript de 501,50 kB (142,95 kB gzip), ligeiramente acima de 500 kB; o aviso permanece visível.
- Regressões específicas de Agenda/Painel e da versão A: contraste dos dias adjacentes corrigido; os quatro cenários afetados foram reexecutados e aprovados em desktop/celular.
- `npm run test:e2e` com `TEST_BASE_URL=http://127.0.0.1:4178/frontend/`: **234 aprovados, dois skips, zero falhas, em 7,7 minutos**. Os 236 casos configurados incluem desktop e 375 px, axe, teclado/foco, reflow 320 px, zoom nativo de 200%, carregamento/erro, confirmação, preservação após falha, snapshots antigos e recarregamento. Os skips existentes evitam executar a seleção móvel da Agenda no projeto desktop e o zoom nativo no projeto mobile; esses cenários passam nos projetos correspondentes.
- Capturas reais de Agenda semanal/mensal, Painel, Pacientes, Orçamento e Estoque geradas em contextos isolados do Edge, em 1440 × 960 e 375 × 812, com dados fictícios. Os contextos não alteram o armazenamento do navegador do usuário. Telas principais e detalhes de Orçamento/Estoque inspecionados visualmente.

Os testes novos estão em `frontend/test/unit/calendar.test.js` e `frontend/test/e2e/visual_a.spec.js`. Testes locais com Edge/Playwright e axe não equivalem a avaliação com pessoas, leitor de tela ou dispositivo físico. O build local não comprova publicação.

`git diff --check` passou nos dois repositórios. Os 62 links locais de Markdown nas 11 fontes documentais afetadas foram conferidos e resolvem no workspace com os checkouts lado a lado.

## Revisar e retomar

Para abrir a aplicação local, use os [comandos de execução](../../1_SPC/e_operation/dental_flow_ap_clinic_SPC_frontend_execution.md). A prévia de Pages está em `http://127.0.0.1:4178/frontend/`; o relatório Playwright local fica em `frontend/playwright-report/index.html` e é ignorado pelo Git.

Na próxima manutenção, leia os AGENTS e a [ficha da Agenda](../../_brain/module/dental_flow_ap_clinic_SPC_agenda.md) ou do [Painel](../../_brain/module/dental_flow_ap_clinic_SPC_dashboard.md). Confira o estado dos dois repositórios antes de editar. As alterações desta entrega estão apenas nas árvores de trabalho. Commit, push e publicação precisam de autorização específica.

Continuação: a versão A e a busca foram incluídas no commit frontend 8b40f7c, com push confirmado. A [entrega de paginação](dental_flow_ap_clinic_SPC_frontend_pagination.md) registra os limites e a evidência posterior desta continuação. As descrições anteriores de alterações locais referem-se às respectivas rodadas históricas.
