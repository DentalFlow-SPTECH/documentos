# Refatoração de usabilidade — alinhamento, listas, busca, CEP e gráfico

## Solicitação — 28/10/2026

Com prints das telas, o usuário pediu seis ajustes no frontend integrado à API:

1. Formulários (Editar dentista e outros) colados à esquerda, com grande espaço vazio à direita.
2. Lista de pacientes sem dizer o que é cada coluna.
3. Gráfico "Entradas e saídas por dia" confuso.
4. Paginação nas listas longas.
5. Evitar dropdown quando a lista vem de cadastro e cresce com o tempo.
6. Endereço pelo ViaCEP.

Decisões do usuário no planejamento: endereço em Rua / Número / Complemento (montado no campo único `address` da API); ViaCEP no paciente e na clínica; gráfico com duas barras por dia.

## O que mudou

| Pedido | Causa encontrada | Solução |
| --- | --- | --- |
| Alinhamento | Formulários com `max-width` sem `margin-inline: auto`, e o cabeçalho fora dessa largura | `Page` (820 px ou 1180 px, centralizada) e `FormPage` no lugar dos dois shells duplicados. Vale para: dados da clínica, dentista, procedimento, criar acesso, material, equipamento, paciente, agendar/remarcar consulta e mapa do dia |
| Colunas | Grade sem cabeçalho; colunas `auto` desalinhavam entre linhas | `ListHeader` com o mesmo grid das linhas (variável `--cols`), rótulo oculto para leitores de tela. Aplicado em pacientes, dentistas, procedimentos, materiais e equipamentos |
| Paginação | A API devolve as listas inteiras | `paginate`/`pageList` (puros), `usePagination` (`?pagina=` na URL) e `Paginated`. 20 por página em pacientes, dentistas, procedimentos e estoque; 10 nas movimentações do material |
| Dropdowns | `<select>` com procedimentos e dentistas | `Combobox` (padrão ARIA, setas + Enter, máximo de 8 sugestões). Usado em procedimento (agendar e cada linha do mapa do dia) e em dentista (criar acesso, e na agenda acima de 6 dentistas). Listas fixas e curtas continuam `Select` |
| CEP | Endereço digitado à mão | `cep_api.js` (ViaCEP por `fetch`, sem credenciais), `useCepLookup` e `AddressFields`. O CEP preenche rua, bairro e, na clínica, cidade/UF; o foco vai para o número |
| Gráfico | Eixo 267/533, dias pulados, saídas em linha fina, sem valores | Duas barras por dia (verde entrou, coral saiu), cada dia com rótulo, eixo redondo em R$ (`niceScale`), balão com entradas, saídas e saldo (mouse, toque ou Tab) e legenda com totais. No celular, rola dentro do card |

Camadas preservadas: Models e utilitários puros (`address.js`, `pagination.js`, `niceScale`), ViewModels com estado e comandos, Views só de apresentação. A busca de CEP entra no contexto dos Repositories.

## Limites

- A paginação recorta, na tela, a lista completa que a API devolve; a paginação no servidor depende do backend.
- O ViaCEP é serviço externo. Fora do ar, o formulário avisa e o endereço é digitado à mão.
- O endereço da clínica é separado por vírgulas na edição. Endereços antigos fora do padrão aparecem inteiros em Rua, ou com o bairro no Complemento: nada se perde ao salvar.

## Verificação

Resultado em 28/10/2026:

- Lint sem erros.
- 32 testes unitários aprovados.
- Builds normal e Pages aprovados.
- E2E no servidor de desenvolvimento (desktop 1440 px e celular 375 px, com API falsa e ViaCEP simulado): 60 aprovados, 12 ignorados por projeto/ambiente e nenhuma falha, inclusive o axe. Os testes novos de `test/e2e/layout.spec.js` cobrem a centralização medida em 9 formulários, a paginação com volta da ficha, o CEP, o combobox pelo teclado e o balão do gráfico.
- `real_api.spec.js` (`E2E_REAL_API=1`, desktop) contra a API local: 2 aprovados, com os seletores novos de endereço e procedimento.
- Conferência visual com capturas contra a API local (MySQL em Docker com os dados do seed) e uma consulta real ao ViaCEP (01001-000).

Não rodado nesta revisão: E2E na prévia do build Pages.

## Entrega

Commit e push autorizados pelo usuário em 28/10/2026 ("faça o commit e o push de todos os artefatos"):

- Frontend: branch `feat/refatoracao-usabilidade`, com os commits `4a17b66` (botão nativo de senha do Edge, alteração que já estava na cópia local) e `87fbfcd` (esta refatoração).
- Documentação: branch `docs/refatoracao-usabilidade`, com o prompt reutilizável que já estava na cópia local e esta ficha.

Os dois `main` não foram alterados; a integração depende de nova autorização. Publicação em Pages não acionada.
