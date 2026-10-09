# Listas compactas, clínicas, finalização de consulta, relatórios e glosas

## Solicitação e aprovação — 08/10/2026

O usuário enviou sete capturas da aplicação e pediu: eliminar listagens altas, tornar a Agenda legível com muitas consultas simultâneas, simplificar cadastros e criar fluxos de finalização de consulta, relatório diário dos doutores, conferência mensal de procedimentos e acompanhamento de glosas, preservando a versão A (logotipo, cores e IBM Plex Sans). A primeira etapa entregou diagnóstico, plano em cinco entregas, 19 imagens de telas propostas (duas alternativas para Agenda e Painel), decisões de negócio a confirmar e critérios de aceite. O usuário respondeu **“gostei siga todos os caminhos recomendados e faça a implementação”**: essa resposta aprova as telas recomendadas e adota as respostas sugeridas para as decisões abaixo. Depois da validação, o usuário autorizou commit e push dos dois repositórios (“pode fazer o commit e push dos dois repositórios”). Publicação em Pages não foi autorizada.

As 17 imagens das telas adotadas estão em [`1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/`](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/) (`…_proposal_*.png`). São protótipos estáticos usados para a aprovação; a implementação é a referência atual e tem capturas próprias (`…_screen_*.png`).

## Decisões adotadas

Confirmadas pelo usuário ao aprovar os caminhos recomendados. Valem para esta demonstração local; não são contrato de integração.

| Assunto | Decisão |
| --- | --- |
| Agenda | Alternativa A: semana com blocos por horário de início e lista do dia ou do horário ao lado, quatro por página. |
| Painel | Alternativa A: abas Visão geral, Produção e relatórios e Financeiro, com clínica e mês; sem as listas “Consultas do dia” e “Atenção ao estoque”. |
| Pacientes entre clínicas | Cadastro único; no total de todas as clínicas cada paciente conta uma vez. |
| Doutores entre clínicas | Podem atender em qualquer clínica; o conflito de horário vale entre clínicas. |
| Registros anteriores | Consultas e movimentações sem clínica aparecem como “Sem clínica” e pendência de vinculação. Nenhuma clínica é atribuída automaticamente. |
| Clínica na consulta | Obrigatória em novas consultas quando há clínica cadastrada. Consulta anterior sem clínica pode ser editada sem recebê-la. |
| Forma de atendimento | Particular ou Convênio, escolha única e opcional. Texto livre anterior é exibido como “Registro anterior”, sem conversão. |
| Convênio | Texto livre, sugerido a partir do cadastro do paciente. Não há catálogo de operadoras. |
| Finalização | Ação própria. “Concluída” deixa de ser escolhida na edição; consulta antiga concluída sem registro pode receber os procedimentos realizados. Vários procedimentos por consulta; dente e região opcionais. |
| Depois de finalizar | A consulta não pode ser editada nem cancelada. A finalização pode ser corrigida enquanto o relatório diário não estiver Enviado ou Validado. |
| Relatório diário | Um por data, doutor e clínica. Rascunho → Enviado → Em correção ou Validado. Validado é final. Devolver exige motivo. |
| Glosa | Por procedimento realizado de convênio: Aguardando, Sem glosa, Glosa parcial ou Glosa total. Valor apresentado desconhecido fica vazio, nunca zero. |
| Linguagem financeira | “Apresentado”, “Aguardando retorno”, “Glosado” e “Sem glosa”. Nada é chamado de “recebido”: recebimento continua sendo lançamento manual no Caixa. |
| Tamanho das páginas | 8 nas listas simples, 6 nas listas com filtros/totais e nas listas secundárias, 4 nas consultas do dia e nos procedimentos do relatório em conferência, 6 nos diálogos de busca. |
| Visões de doutor e dona | Telas locais da mesma demonstração, sem controle de acesso. |

## Contrato de dados

A chave `dental_flow_demo_v1` e a versão 1 foram mantidas. As mudanças são aditivas e opcionais; um snapshot anterior abre sem conversão e sem gravação automática.

- Coleções novas, lidas como listas vazias quando ausentes: `clinics` e `dailyReports`.
- Consulta: `clinicId`, `procedureId` (o nome continua copiado em `procedure`), `insurance` e `completion` (data/hora, forma de atendimento, convênio, observação, guia pendente e itens realizados).
- Item realizado: procedimento e valor de referência copiados no momento do registro, quantidade, dente, região, origem (Agendado, Orçamento ou No atendimento), `claim` opcional e histórico.
- Movimentação de caixa: `clinicId` opcional.
- IDs, relações e registros existentes não são alterados. Restaurar os dados de teste continua sendo a única ação que substitui o snapshot, mediante confirmação.

## O que mudou em cada entrega

### 1 — Listas, formulários, seletores e Agenda

- Padrão compacto de listagem (`.records` em `component/ui.module.css`): uma linha por registro no desktop, cartão curto no celular, cabeçalho de colunas e paginação visível sem rolar a página em 1366 × 768. Aplicado a Pacientes, Doutores, Estoque, Caixa, Orçamentos, usuários, auditoria, históricos e relações.
- Agenda semanal: sem filtro de doutor, cada horário de início vira um bloco com a quantidade de consultas e uma barra das situações; com filtro de doutor, as consultas aparecem como cartões proporcionais à duração, lado a lado quando se sobrepõem. O painel ao lado lista o dia ou o horário escolhido, quatro por página. Atalhos Madrugada/Manhã/Tarde/Noite e avisos de consultas acima/abaixo da área visível. Abaixo de 1280 px, um seletor alterna “Consultas do dia” e “Calendário”.
- Cadastro de paciente em quatro seções navegáveis (Dados pessoais, Contato, Endereço, Informações adicionais), com barra de ações fixa. Somente o nome completo é obrigatório; um erro abre a seção do campo.
- Procedimento da consulta escolhido por busca (mesmo diálogo de pacientes e doutores, seis resultados por página). Forma de atendimento como opções Particular/Convênio com “Limpar”.

### 2 — Clínicas

- Administração ganhou as abas Usuários, Clínicas e Auditoria. Clínicas: cadastro (somente o nome é obrigatório) e edição.
- “Vincular registros sem clínica”: seleção explícita de consultas e movimentações, em páginas de oito, para a clínica escolhida. Nada é vinculado sem seleção.
- Filtro de clínica na Agenda, no Caixa, no Painel e nos Relatórios, incluindo a opção “Sem clínica”. O filtro permanece na URL.
- O conflito de horário do doutor considera todas as clínicas.

### 3 — Finalização de consulta

- “Finalizar consulta” no detalhe e nos cartões do dia. A tela parte do procedimento agendado e dos itens do orçamento vinculado, permite acrescentar ou retirar procedimentos e registra quantidade, dente e região.
- Finalizar muda a situação para Concluída, grava os itens, o histórico e a auditoria na mesma operação e **não cria movimentação de Caixa**.
- Repetir o envio devolve o registro existente sem duplicar itens. Consultas canceladas ou com falta não podem ser finalizadas.

### 4 — Relatório diário

- `#/relatorios/diario` (visão do doutor): resumo do dia, consultas finalizadas, pendências de finalização e observação. Salvar rascunho, enviar e, quando devolvido, corrigir e reenviar.
- `#/relatorios/conferencia` (visão da dona): fila por data, doutor e clínica, com os procedimentos do relatório escolhido, validação e devolução com motivo.
- Um relatório enviado fixa as consultas incluídas; a devolução libera a correção e o novo envio volta a fixá-las.

### 5 — Relatório mensal e glosas

- `#/relatorios/mensal`: procedimentos realizados no mês, por data de execução ou por data de retorno do convênio, com filtros de clínica, doutor, forma de atendimento, convênio e situação.
- Conferência por item em painel lateral: guia, valor apresentado, data e resultado do retorno, valor glosado e motivo. Cada registro acrescenta uma linha ao histórico do item; o valor apresentado não é sobrescrito pela glosa.
- Totais separam apresentado, aguardando retorno, glosado e sem glosa, e informam quantos itens não têm valor apresentado. Impressão e exportação CSV (valores desconhecidos saem vazios).
- Painel: Visão geral (consultas registradas, finalizadas, faltas, canceladas, pacientes atendidos, pendências e quadro por clínica), Produção e relatórios (procedimentos realizados, relatórios esperados/validados/a conferir e produção por doutor e por procedimento) e Financeiro (caixa manual do mês, comparação de seis meses e convênios em conferência).

## Implementação

Camadas MVVM preservadas e verificadas pelo ESLint. Regras novas ficam em Models sem React/DOM/persistência: `agenda_model.js` (salvar, cancelar e finalizar), `calendar_model.js` (blocos por horário e grupos de sobreposição), `admin_model.js` (clínicas e vinculação), `report_model.js` (relatório diário, conferência e totais mensais), `dashboard_model.js` (indicadores) e `demo/clinic.js` (funções compartilhadas: filtro de clínica, possibilidade de finalizar, relatório que fixa a consulta e itens realizados). O módulo novo `src/feature/report/` segue `model`, `repository`, `view_model` e `view`. [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md).

Nenhuma dependência foi acrescentada. Estoque mantém a verificação de saldo antes de gravar e não foi dividido por clínica.

## Demonstração isolada

A validação visual usou uma origem separada, sem ler nem alterar o armazenamento das origens 5178/4178/4189:

```powershell
# no repositório frontend
npm run build:pages
# no repositório documentos
node 1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/dental_flow_ap_clinic_SPC_clinic_reports_create_scenario.mjs
node 1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/dental_flow_ap_clinic_SPC_clinic_reports_server.mjs
```

Abra `http://127.0.0.1:4190/frontend/`. O servidor grava o cenário apenas quando a chave ainda não existe nessa origem. O gerador parte do cenário fictício da prévia anterior e usa os Models da aplicação, portanto cada registro segue as mesmas regras da interface. Resumo gerado (`…_scenario_summary.json`): 3 clínicas, 124 procedimentos, 99 consultas em outubro de 2026 (12 sem clínica, 32 finalizadas, 13 canceladas, 19 faltas, 4 pendentes de finalização, 3 concluídas antigas sem registro), 28 pacientes atendidos, relatórios diários 2 em rascunho, 1 enviado, 2 em correção e 12 validados; 40 procedimentos realizados, 18 por convênio, R$ 4.390,00 apresentados, 6 sem valor apresentado, 2 aguardando retorno e R$ 1.032,00 glosados (2 parciais e 2 totais).

Capturas da aplicação real nessa origem, feitas por `…_capture.cjs` depois do build final: 20 telas em 1366 × 768 (`…_screen_*_desktop.png`) e seis em 375 × 812 (`…_screen_*_mobile.png`). Medidas em [`…_screen_measurements_desktop.json`](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_clinic_reports/dental_flow_ap_clinic_SPC_clinic_reports_screen_measurements_desktop.json): 17 das 20 telas cabem na primeira tela sem rolagem da página, nenhuma tem rolagem horizontal e nenhuma registrou erro de console. As exceções são o calendário mensal (1003 px), o detalhe de uma consulta finalizada com histórico (1205 px) e o relatório mensal (796 px: lista e paginação ficam visíveis; a nota de rodapé fica abaixo). No celular a rolagem vertical é esperada.

## Verificação

Executado em 08/10/2026, Node 24.19.0, Microsoft Edge via Playwright, projetos desktop 1440 × 960 e celular 375 × 812.

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Aprovado, sem avisos. |
| `npm run test:unit` | 20 aprovados, 0 falhas: os 11 anteriores e 9 novos em `test/unit/clinic_flow.test.js`. |
| `npm run build` | Aprovado. JS 615,60 kB (171,91 kB gzip); CSS 94,71 kB (16,78 kB gzip). |
| `npm run build:pages` | Aprovado. JS 615,62 kB (171,92 kB gzip); CSS 94,76 kB (16,79 kB gzip). |
| `npm run test:e2e` no servidor de desenvolvimento (5178) | 278 combinações de cenário e largura: **275 aprovadas, 3 skips, 0 falhas**, em 13,8 min, no estado final. |
| `npm run test:e2e` na prévia `http://127.0.0.1:4178/frontend/` | 278 combinações: **275 aprovadas, 3 skips, 0 falhas**, em 10,5 min, sobre o build final. |
| `git diff --check` nos dois repositórios | Sem ocorrências. |

O aviso do Vite sobre chunk acima de 500 kB permanece e cresceu com as telas novas (antes 508,39 kB; 145,37 kB gzip). Não impede o build; dividir o código por rota é uma melhoria possível e não foi feita.

Os três skips são previstos: zoom nativo de desktop no projeto de celular, fluxo exclusivo da agenda móvel no projeto desktop e o teste das resoluções de referência do desktop no projeto de celular. Cada um roda no projeto correspondente.

Rodadas anteriores do mesmo dia, antes do estado final, tiveram uma falha cada:

1. Servidor de desenvolvimento: 274 aprovadas e um tempo limite em `access.spec.js` (login com envio lento, desktop). O teste e as telas de Acesso não foram alterados nesta entrega. A repetição isolada do arquivo no desktop aprovou os 15 casos e a rodada final não repetiu a falha. A causa provável é disputa de CPU com outros processos que rodavam na máquina naquele momento; isso não foi investigado além da repetição.
2. Prévia `/frontend/`: 274 aprovadas e uma falha na primeira varredura de `usability.spec.js` (desktop). O axe leu o botão “Semana” durante a transição de cor de 0,12 s ao trocar da semana para o mês e apontou contraste insuficiente. A varredura passou a emular movimento reduzido, condição em que a aplicação já desliga essa transição; nenhuma cor foi alterada. `usability.spec.js` repetido na prévia: 21 aprovados e 1 skip.

Depois dessas rodadas, o espaço inferior do conteúdo no desktop passou de 16 px para 8 px, para que três telas deixassem de exceder a primeira tela por 5 a 7 px. Lint, unitários, os dois builds e as duas rodadas completas da tabela foram executados depois dessa mudança.

Comportamentos pedidos e onde são provados:

| Comportamento | Teste |
| --- | --- |
| Snapshot anterior abre com coleções vazias, sem gravar e sem atribuir clínica | unitário “snapshot anterior às clínicas…”; `clinic_flow.spec.js` (clínicas) |
| Clínica exigida em nova consulta, conflito entre clínicas e vinculação somente dos registros escolhidos | unitário “clínica é exigida…”; `clinic_flow.spec.js` (clínicas) |
| Procedimento por ID, catálogo grande e busca sem acento; consultas antigas ligadas pelo nome | unitários “agendamento vincula…” e “busca de procedimentos…”; `record_picker.spec.js` |
| Finalização registra uma única vez, com histórico, separa agendado/orçamento/realizado e não movimenta o Caixa | unitário “finalização registra…”; `clinic_flow.spec.js` (finalização) |
| Relatório diário corresponde às execuções; envio fixa; devolução reabre; validado é final | unitário “relatório diário corresponde…”; `clinic_flow.spec.js` (relatório diário) |
| Filtro de clínica muda registros e totais; paciente conta uma vez; antigos ficam como pendência | unitário “filtro por clínica…”; `dashboard.spec.js` |
| Glosa parcial preserva apresentado e glosado; valor desconhecido não vira zero nem recebimento; CSV e impressão | unitário “glosa parcial…”; `clinic_flow.spec.js` (mensal); `dashboard.spec.js` (financeiro) |
| Agenda: todas as consultas acessíveis por horário ou sobreposição; semana cabe na primeira tela | unitário “agrupamento da agenda…”; `visual_a.spec.js` |
| Listas com busca e paginação visíveis em 1366 × 768, tamanhos por lista, página na URL | `pagination.spec.js` |
| Cadastro de paciente em seções; erro abre a seção e foca o campo; somente nome obrigatório | `patient.spec.js` |
| axe, 320 px, 720 px (equivalente a 200%), textos longos, sem erro de JavaScript e snapshot inalterado nas telas novas | `usability.spec.js` (segunda varredura) |

## Diferenças em relação às imagens aprovadas

- Os rótulos dos campos de formulário continuam com 16 px. As imagens usavam 14 px; o teste de legibilidade existente (`demo.spec.js`) exige 16 px e foi mantido. Barras de filtro usam 14 px.
- Usuários e Orçamentos do paciente mostram seis por página (as imagens não tratavam essas listas); com oito, a paginação saía da primeira tela em 1366 × 768.
- Ao escolher um horário na grade em telas estreitas, a aplicação muda para “Consultas do dia” e leva o foco ao título do dia.

## Limites e dependências abertas

- Demonstração local: sem backend, autenticação, autorização ou sincronização. As visões de doutor e dona não restringem acesso; qualquer pessoa na demonstração abre as duas.
- Nenhuma integração com operadoras, regra contratual, repasse, comissão ou valor automático. O valor de referência do procedimento é copiado como informação; o valor apresentado ao convênio é digitado.
- Não há cadastro (criação/edição) do catálogo de procedimentos na aplicação; a [proposta anterior](dental_flow_ap_clinic_SPC_frontend_odontogram_procedures.md) continua aguardando escolha. O editor de orçamentos mantém o seletor de procedimento e dez itens por página.
- Relatório validado não pode ser reaberto e consulta finalizada não volta a “em aberto”; se a clínica precisar disso, é uma decisão nova.
- Estoque por clínica, expediente/disponibilidade, duração por procedimento e relatórios fiscais não foram tratados.
- Verificação local com Edge/Playwright e axe; não substitui teste com pessoas, leitor de tela ou dispositivo físico. Lint não equivale a checagem de tipos.
- Frontend: commit `7195584fae9027b91ad6a1831c7166970e5b7378` no branch `feat/clinicas-finalizacao-relatorios`, com push confirmado pela igualdade entre HEAD e a referência remota do branch; `main` permanece em `8b40f7c` até a integração do branch. Esta documentação é entregue no commit que contém este registro, no branch `docs/clinicas-finalizacao-relatorios`; conferir o Git para o estado remoto. O workflow manual de Pages não foi acionado.

[Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md) · [Critérios de validação](../../1_SPC/d_quality/dental_flow_ap_clinic_SPC_frontend_refactor_validation.md) · [Execução local](../../1_SPC/e_operation/dental_flow_ap_clinic_SPC_frontend_execution.md) · [Tarefa atual](../../_brain/task/dental_flow_ap_clinic_SPC_current_task.md)
