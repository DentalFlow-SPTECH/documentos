# Verificação da refatoração do frontend

## Seleção de cadastros — 08/10/2026

`test/e2e/record_picker.spec.js` cobre 1.204 pacientes/122 doutores fictícios, limitação de resultados, páginas, busca sem acento/por identificadores, homônimos com IDs distintos, escolha explícita, Enter sem envio, Tab/Shift+Tab, Escape/foco, dados vazios, rascunho, validação e persistência dos vínculos após recarregar. As suítes anteriores operam o novo diálogo em vez de um select, preservando suas verificações de dados. A [entrega da busca](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_record_selection.md) registra o resultado da integração final em `/frontend/` e os limites da prova.

Resultado: `npm run check` aprovado (lint, 11 unitários e build), build para Pages aprovado. A execução integral de 244 casos aprovou 240, conservou dois skips e interrompeu dois por um seletor de teste ambíguo. Corrigido somente o seletor para localizar `searchbox`, a repetição dos dois casos aprovou ambos; no conjunto, 242 cenários aprovados e dois skips. Capturas reais revisadas em desktop/celular, sem erros de console ou overflow. Detalhes da repetição e limites na entrega; não houve publicação.

## Referência

Antes das alterações: `npm run typecheck`, `npm run build:pages`, `npm run test:e2e`. O resultado executado fica no [plano](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md).

## Critérios

Os testes de domínio/sessão usam `node:test`, sem framework adicional. `npm run check` executa lint, esses testes e build. O pipeline manual de Pages executa lint e testes unitários antes do build; a configuração editada não representa uma execução ou publicação do workflow.

- Build normal e build com base `/frontend/` funcionando.
- Nenhuma sintaxe TypeScript em arquivos JavaScript/JSX ao concluir a conversão.
- Regras de domínio verificadas sem navegador, incluindo identidade, relação, ausência de mudanças e falha de persistência.
- Mesmos cenários E2E preservados; ajustes de imports/extensões não eliminam assertions.
- Pacientes: busca/contexto, cadastro mínimo/completo, edição, vínculos, histórico, erros, proteção de saída, envio e snapshots antigos.
- Demais módulos: respectivas regressões existentes, especialmente saldo de estoque e conflito de agenda.
- Desktop e 375 px; estados de erro/carregamento/sucesso, teclado/foco, axe e verificações existentes de 320 px e zoom de 200%.
- Acesso mantém traces e capturas automáticas desativados nos testes que preenchem senhas.
- `git diff --check` nos repositórios afetados.

## Limites

Lint e testes não substituem checagem estática de tipos. Testes locais com Edge/Playwright e axe não equivalem a testes com pessoas, leitor de tela ou dispositivo físico. Compatibilidade de snapshot e gravações desta sessão não comprovam concorrência entre abas ou autenticação integrada.

## Atualização visual — versão A

A [entrega da versão A](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_visual_update.md) registra comandos e resultados desta mudança. `test/unit/calendar.test.js` cobre escala fixa, calendário mensal, minutos/duração, sobreposições, intervalos encostados e continuação entre dias sem alterar o registro. `test/e2e/visual_a.spec.js` verifica a geometria na interface, seis cores distintas com nomes acessíveis, calendário mensal, filtro/contexto, teclado, recarregamento, axe e ausência de overflow em desktop e celular.

A regressão integral usa o build para Pages na prévia `/frontend/` e mantém as suítes anteriores. Capturas reais usam dados fictícios em contextos isolados, sem escrever no navegador do usuário. A diferença de densidade entre desktop e celular é intencional: prévias no calendário mensal de desktop; contagens e cartões completos do dia em celular. A grade semanal inteira permanece disponível por um controle explícito no celular.

Resultado final em 07/10/2026: `npm run check` aprovado (lint, 11 testes unitários e build), build para Pages aprovado e regressão completa com 234 testes aprovados, dois skips existentes e zero falhas em 7,7 minutos. Os skips são os cenários específicos da seleção móvel/zoom nos projetos que não lhes correspondem; eles foram executados nos projetos próprios. O aviso de chunk acima de 500 kB permanece registrado na entrega.

## Paginação de todas as listagens

A regressão de paginação cobre conjuntos de 24 registros, última página, filtros, detalhe/retorno, reload, snapshot, totais integrais, histórico/auditoria e erro de formulário em outra página. A integração usa a prévia Pages no Edge em desktop/celular. [Escopo e evidência](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_pagination.md).

## Listas compactas, clínicas, finalização e relatórios

A [entrega](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_clinic_reports.md) traz a tabela de comportamentos e o teste que prova cada um. Critérios acrescentados:

- Regras novas verificadas sem navegador em `test/unit/clinic_flow.test.js`: compatibilidade do snapshot, clínica e conflito entre clínicas, finalização idempotente sem Caixa, relatório diário, totais por clínica, glosa e valor desconhecido, agrupamento da agenda e busca no catálogo.
- Fluxos completos em `test/e2e/clinic_flow.spec.js`, em desktop e 375 px, com recarregamento e comparação do snapshot.
- Listas principais com busca e paginação visíveis sem rolar a página em 1366 × 768 (`pagination.spec.js`); semana da Agenda e visão geral do Painel na primeira tela em 1366 × 768 e 1440 × 900 (`visual_a.spec.js`, `dashboard.spec.js`).
- As telas novas entram na varredura de axe, 320 px, 720 px, textos longos, erros de JavaScript e snapshot inalterado (`usability.spec.js`). A varredura emula movimento reduzido para que o axe leia o estado final dos botões, e não uma cor intermediária da transição.
- A validação visual usa origem isolada (4190) com cenário fictício gerado pelos Models da aplicação; nenhum armazenamento existente é lido ou alterado.

Resultado em 08/10/2026: lint aprovado, 20 testes unitários aprovados, builds normal e Pages aprovados. E2E no servidor de desenvolvimento: 275 aprovados, 3 skips previstos e nenhuma falha (13,8 min). E2E na prévia `/frontend/`: 275 aprovados, 3 skips previstos e nenhuma falha (10,5 min).
