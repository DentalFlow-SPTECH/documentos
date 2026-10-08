# Prévia de odontograma, procedimentos e Painel com dados

## Solicitação e estágio — 08/10/2026

O usuário pediu uma apresentação mais criativa dos dentes no orçamento, apontou a ausência do cadastro de procedimentos e quis observar o comportamento do Painel com dados de teste. A preferência anterior de validar novas propostas visuais em imagens antes de integrá-las foi mantida.

Esta entrega contém duas propostas navegáveis de odontograma, um protótipo de cadastro de procedimentos e o Painel atual com cenário fictício em outra origem. Os novos desenhos/cadastro ainda não foram integrados ao produto. A escolha visual e os campos propostos permanecem para validação pelo usuário. Na etapa inicial desta proposta, o código de aplicação e o build existente não foram alterados; as alterações locais anteriores foram preservadas. Frontend em `main`, HEAD `6ed7571`; documentos em `main`, HEAD `742ecef`. Esta descrição se refere à etapa inicial. Posteriormente, o usuário autorizou commit/push e a paginação de todas as listagens; consulte a entrega de paginação para o estado atual. A escolha dos desenhos/cadastro continua pendente.

## Propostas

| Proposta | Interação preparada | Limite |
| --- | --- | --- |
| Arcada | Dentes em duas arcadas, desenhos ilustrativos com variações, seleção e itens associados no painel lateral. No celular, grade com alvos de toque. | Destaque representa item do orçamento, sem diagnóstico ou estado clínico novo. |
| Mapa compacto | Quadrantes com vista esquemática das coroas; seleção e painel lateral comuns à arcada. | Numeração/dentição reaproveitadas do código atual; não aprova um catálogo de superfícies. |
| Procedimentos | Busca por nome sem acento, oito resultados por página, detalhes e inclusão com nome/valor de referência. | Inclusão somente em memória do protótipo, desfeita ao recarregar; não é uma rota do frontend. |

O catálogo atual possui quatro procedimentos fixos com `id`, `name` e `referencePriceCents`. A proposta começa por nome e valor de referência, sem categoria, duração, materiais ou política de inativação. O orçamento atual copia o valor de referência ao escolher o procedimento. Alterações futuras não devem recalcular itens históricos. A proposta não define exclusão, renomeação, unicidade ou reajuste retroativo.

Antes da integração, tratar o vínculo atual por nome nas consultas/itens para que mudanças do catálogo não invalidem registros históricos. Criar procedimentos é o recorte solicitado; edição, exclusão e inativação dependem de escopo/regras próprios. Os campos e a validação do protótipo são propostas, não regras clínicas aprovadas.

## Painel real com dados fictícios

A prévia serve o mesmo build existente para Pages em `http://127.0.0.1:4189/frontend/`. O bootstrap inicializa `dental_flow_demo_v1` somente quando a chave está ausente nessa origem. Registros de 4178 pertencem a outra origem e não são acessados/substituídos. Contextos automatizados são descartados após a verificação.

Dia de referência: 08/10/2026. Semana: 05/10 a 11/10. Caixa: seis meses até outubro. Exemplos determinísticos para observar a interface; não descrevem uma clínica real nem medem desempenho de servidor.

| Conjunto/indicador | Quantidade/valor |
| --- | --- |
| Pacientes / doutores / procedimentos | 120 / 6 / 24 |
| Orçamentos | 64 |
| Consultas na semana | 70; por dia: 8, 11, 14, 18, 12, 5, 2 |
| Consultas de 08/10 | 18; seis por página e acesso à Agenda |
| Materiais | 18; seis abaixo do mínimo; Painel mostra quatro por página e acesso ao conjunto |
| Movimentações manuais de caixa | 72, em seis meses |
| Outubro: entradas / saídas / saldo das movimentações | R$ 12.560,00 / R$ 4.280,00 / R$ 8.280,00 |

IDs, relações paciente/doutor/orçamento/consulta e ausência de coincidência de horário/data por doutor foram verificados na geração. Novos saldos de materiais possuem movimentos iniciais correspondentes. Caixa usa movimentos manuais independentes, sem valores derivados de orçamentos, lucro ou saldo bancário inicial. Nenhuma métrica nova foi adicionada ao Painel.

## Evidência

- `node create-preview.mjs`: assertivas de IDs, relações, conflitos e contagens aprovadas; resumo em `scenario-summary.json`.
- `node design.mjs`: três propostas e página de entrada geradas.
- `node verify-preview.cjs`: aprovado no Edge desktop 1440 × 960 e celular 375 × 812. Seleção/inclusão ilustrativa, dentição infantil/permanente, busca/páginas/detalhes/cadastro, catálogo inicial após reload, totais/gráficos e links do Painel verificados.
- Zero violações axe nos estados examinados, sem erros de console e sem overflow externo, incluindo 320 px. Capturas reais revisadas.
- Snapshot conservado após navegação/reload; links abrem Caixa do período, Agenda do dia e orçamento correto. Gráfico tem tabela com valores exatos de seis meses.

Essa prova cobre os protótipos e o cenário sobre o build existente. Não é nova execução da suíte integral, cadastro persistente, aprovação clínica, backend ou avaliação com leitor de tela/pessoas.

## Artefatos e retomada

Artefatos preservados em `1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/`. Nomes canônicos com prefixo `dental_flow_ap_clinic_SPC_preview_`. HTML/CSS/JS, geradores, servidor, JSON, relatório e PNGs desktop/celular ficam no repositório documental; continuam propostas separadas das rotas da aplicação. Os scripts localizam o frontend irmão por caminho relativo, sem depender da pasta do perfil do usuário.

Capturas: [arcada A](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_odontogram_a_desktop.png), [mapa B](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_odontogram_b_desktop.png), [procedimentos](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_procedures_desktop.png), [Painel paginado](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_dashboard_desktop.png) e [Painel móvel](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_frontend_preview/dental_flow_ap_clinic_SPC_preview_dashboard_mobile.png).

[Entrada](http://127.0.0.1:4189/) · [Arcada](http://127.0.0.1:4189/odontograma-a.html) · [Mapa compacto](http://127.0.0.1:4189/odontograma-b.html) · [Procedimentos](http://127.0.0.1:4189/procedimentos.html) · [Painel com dados](http://127.0.0.1:4189/frontend/#/painel?date=2026-10-08)

Com as dependências do frontend instaladas e seu build Pages gerado, na pasta dos artefatos execute:

```powershell
node dental_flow_ap_clinic_SPC_preview_create_preview.mjs
node dental_flow_ap_clinic_SPC_preview_design.mjs
node dental_flow_ap_clinic_SPC_preview_server.mjs
```

Verifique antes se 4189 está disponível; não encerre servidores desconhecidos. Em outro terminal na mesma pasta, `node dental_flow_ap_clinic_SPC_preview_verify_preview.cjs` repete a prova/capturas em contextos isolados. O servidor oferece os nomes curtos das URLs como aliases dos arquivos canônicos.

A cópia portável foi regenerada e verificada após a paginação, em ambas as larguras: propostas, totais/links/reload do Painel, zero violações axe, console sem erros e reflow 320 px. O cenário fictício permanece em outra origem, sem substituição dos registros de 4178.

Para integrar após a escolha: ler AGENTS, conferir Git e preservar alterações locais; implementar o odontograma escolhido, o cadastro autorizado e eventual acesso explícito ao cenário de teste; atualizar fontes/brain e verificar o frontend na prévia `/frontend/`.

[Orçamentos](../../_brain/module/dental_flow_ap_clinic_SPC_budget.md) · [Painel](../../_brain/module/dental_flow_ap_clinic_SPC_dashboard.md) · [Busca implementada anteriormente](dental_flow_ap_clinic_SPC_frontend_record_selection.md)

[Paginação e entrega atual](dental_flow_ap_clinic_SPC_frontend_pagination.md).
