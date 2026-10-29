# Prompt para gerar um frontend de gestão no padrão Dental Flow

Este arquivo guarda o que fez o frontend do Dental Flow dar certo, na forma de um prompt reutilizável. Serve para começar um frontend novo ou para evoluir um que já existe, em qualquer assistente de código.

## Como usar

1. Preencha somente a seção **1. O que eu preciso**. Onde não souber, escreva “não sei, sugira”: o prompt manda a IA trazer a pergunta com uma resposta recomendada.
2. Anexe o que tiver: capturas das telas atuais, logotipo, documentos de regras.
3. Cole tudo a partir de **Início do prompt**.
4. A primeira resposta deve ser plano e imagens, sem código. Aprove tela por tela, ou responda “siga os caminhos recomendados” para aceitar tudo.
5. Commit, push e publicação só acontecem quando você disser.

As seções 2 a 8 são o padrão. Não é preciso editá-las; o que você escrever na seção 1 prevalece sobre elas.

---

## Início do prompt

Você vai planejar e, depois da minha aprovação, construir ou evoluir um frontend de gestão. Quero o mesmo nível de um projeto anterior meu, o Dental Flow (gestão de clínica: painel, agenda, cadastros, orçamentos, estoque, caixa, relatórios e administração). As seções 2 a 8 descrevem o que tornou aquele resultado bom e valem como padrão. Onde a seção 1 disser outra coisa, vale a seção 1. Onde faltar informação de negócio, não invente a regra: traga a pergunta com uma resposta recomendada e siga com o que não depende dela.

### 1. O que eu preciso

- **Produto e público:** [o que é, quem usa, quanta familiaridade essas pessoas têm com sistemas]
- **Situação:** [projeto novo | evolução do repositório em `<caminho>`]
- **Módulos e telas:** [lista]
- **O que a pessoa precisa conseguir fazer:** [fluxos principais, em frases curtas]
- **Problemas a resolver, se for evolução:** [ex.: listas altas demais, agenda ilegível com muitos registros]
- **Identidade visual:** [logotipo, cores, fonte | “proponha três direções em imagem”]
- **Dados:** [demonstração local com dados fictícios | API existente em `<endereço/contrato>`]
- **Regras que já decidi:** [lista]
- **Fora do escopo:** [lista]
- **Stack, se diferente do padrão da seção 3:** [ ]
- **Onde fica a documentação:** [pasta ou repositório]
- **Autorizações:** commit, push e publicação não estão autorizados até eu dizer.

### 2. Como trabalhar comigo

**Etapa 1, antes de qualquer código.** Entregue, nesta ordem:

1. **Diagnóstico.** Leia o repositório, as instruções dele (AGENTS.md, CLAUDE.md, README) e as capturas. Aponte problemas concretos com medida, por exemplo “a lista de pacientes tem 2.400 px de altura em 1366 × 768 e a paginação fica fora da tela”.
2. **Plano em entregas pequenas.** Cada entrega deve ser utilizável e validável sozinha, em ordem de dependência. Cinco entregas pequenas funcionaram melhor que uma grande.
3. **Imagens das telas propostas.** Monte protótipos estáticos em HTML e CSS com dados fictícios realistas e capture em 1366 × 768 e em 375 px. Para as telas mais importantes ou discutíveis, mostre duas alternativas e diga qual recomenda e por quê. Inclua os estados que costumam dar problema: lista cheia, erro de formulário, celular. Se não puder gerar imagens, avise e entregue os protótipos HTML.
4. **Decisões de negócio a confirmar.** Uma tabela com a pergunta, as opções, a sua recomendação e a consequência de cada escolha.
5. **Critérios de aceite verificáveis.** Cada critério deve corresponder a um teste que você vai escrever.
6. **Pare e aguarde.** A aprovação de uma tela não aprova as outras.

**Etapa 2, implementação.** Uma entrega por vez. Ao fim de cada uma, informe o que mudou, como foi validado e o que continua aberto.

**Conduta durante todo o trabalho:**

- Não apague nem sobrescreva dados locais existentes. Para validar funções novas, use uma origem isolada (outra porta) com um cenário fictício gerado pelas próprias regras da aplicação, para que os dados de teste obedeçam às mesmas validações da interface.
- Preserve alterações que não são suas. Commit, push e publicação exigem autorização explícita, e cada autorização vale só para aquela ação.
- Relate com fidelidade: testes que falharam, testes instáveis, o que não foi verificado e toda diferença em relação às imagens aprovadas.
- Não crie integrações, regras contratuais, valores automáticos, permissões ou indicadores que eu não pedi.

### 3. Stack e arquitetura

Padrão: React, Vite, JavaScript/JSX e CSS Modules, com rotas em hash para funcionar em hospedagem estática e ao recarregar uma rota direta. Sem biblioteca visual pronta. Fonte servida localmente. Não acrescente dependências sem necessidade. Se o projeto já usa TypeScript, mantenha; lint não substitui checagem de tipos.

Organização MVVM por módulo, em `src/feature/<modulo>/{model,repository,view_model,view}`:

| Camada | Responsabilidade | Não pode |
| --- | --- | --- |
| View (`.jsx`) | Marcação, semântica, CSS, foco | Conter regra, acessar dados ou armazenamento |
| ViewModel (hook) | Rascunho do formulário, filtros, estado de envio, comandos, parâmetros da rota | Tocar em DOM, CSS ou armazenamento |
| Model | Funções puras: validação, regras, projeções, agregações | Importar React, DOM ou persistência |
| Repository | Executar o Model dentro de uma transação da sessão de dados | Importar React ou Views |

- A sessão de dados mantém um snapshot compartilhado, aceita uma gravação por vez, grava registro, histórico e auditoria juntos e só publica o novo estado depois de persistir.
- Configure o ESLint para impor essas fronteiras com `no-restricted-imports` e `no-restricted-globals` por pasta. Sem isso a separação se desfaz em poucas semanas.
- Uma regra usada por mais de um módulo fica em um único arquivo de funções puras. Nunca copie a regra.
- Cálculos de tela (posição em calendário, totais, agrupamentos) são funções puras testáveis sem navegador; a View só converte o resultado em posição e cor.
- Componentes compartilhados desde o início: campo com rótulo e erro, botão, cabeçalho de página, estados de carregamento, vazio e erro, lista paginada, seletor com busca, abas e etiqueta de situação. Tokens de cor, raio e fonte em um único arquivo.

### 4. Padrão de interface

Tamanhos de referência: desktop 1366 × 768 (precisa funcionar bem aqui) e 1440 × 900; celular 375 px; reflow em 320 px; zoom de 200% (equivale a 720 px de largura).

**Estrutura.** Barra lateral escura com logotipo e navegação, área de trabalho clara, cabeçalho de página com título, uma frase de contexto e a ação principal à direita. No celular, menu recolhido. Se eu não der identidade visual, parta deste conjunto e troque a cor de marca: tinta `#01101f`, ação primária `#145453`, destaque `#1ed8cf`, fundo de trabalho `#f5f8f7`, texto secundário `#35484e`, linhas `#d8e2df`, raios de 10, 14 e 18 px, IBM Plex Sans.

**Listagens.** O defeito mais comum é a lista alta, com a paginação fora da tela.

- Uma linha por registro no desktop, com cerca de 50 px de altura, cabeçalho de colunas e as ações na própria linha. No celular, cartão curto.
- Paginação sempre. Escolha o tamanho da página para que busca, lista e paginação caibam em 1366 × 768 sem rolar a página: 8 em listas simples, 6 em listas com filtros ou totais e em listas secundárias (históricos, relações), 4 em listas dentro de painéis laterais, 6 em diálogos de busca.
- Mostre a faixa e o total (“1–8 de 124”). Totais e somas consideram todos os registros filtrados, não só a página.
- Densidade vem de espaçamento e de uma linha por registro, não de letra pequena.

**Estado na URL.** Busca, filtros, aba, data, página e seleção ficam na URL e sobrevivem a abrir um detalhe, voltar e recarregar. Mudar um filtro volta à primeira página. Parâmetro inválido é limitado ao intervalo válido.

**Formulários.**

- Obrigatório é só o que a regra exige. No Dental Flow, paciente exige apenas o nome.
- Formulário longo vira seções navegáveis com contagem de preenchimento e barra de ações fixa. No celular, um seletor de seção.
- Um erro abre a seção do campo, leva o foco a ele e fica associado ao campo. Falha de gravação conserva tudo o que foi digitado e leva o foco ao aviso.
- Bloqueie o envio duplicado, inclusive dois envios antes da próxima renderização, e peça confirmação ao sair com alterações.
- Escolha única entre poucas opções usa botões de opção com “limpar” quando for opcional, não um campo de texto livre.

**Seleção em cadastros grandes.** Use um diálogo de busca em vez de um `select` com centenas de itens. Digitar não muda a seleção, só escolher um resultado muda. Busca sem diferenciar acentos nem pontuação, por nome e por identificadores. Mostre dados que distinguem homônimos. Escape fecha e mantém a escolha anterior, com o foco de volta ao campo.

**Agenda ou calendário, se houver.** Com muitos registros no mesmo horário, cartões lado a lado ficam ilegíveis. Sem filtro de responsável, mostre um bloco por horário de início com a quantidade e uma barra das situações; com um responsável filtrado, mostre cartões proporcionais à duração, lado a lado quando se sobrepõem. Ao lado, um painel lista o dia ou o horário escolhido, 4 por página. Ofereça atalhos de período e avise quando houver registros fora da área visível. Em tela estreita, alterne entre lista do dia e calendário, e ao escolher um horário leve o foco para a lista.

**Painel.** Abas por assunto, com filtros de período e de unidade no topo. Indicadores com a definição escrita logo abaixo, pendências com atalho que abre o módulo já filtrado. Não repita listas dos módulos no painel. Todo gráfico tem alternativa em tabela, usa a mesma escala nas séries e não dá altura artificial ao zero.

**Estados.** Toda tela trata carregamento, vazio com a próxima ação, erro de leitura com “tentar novamente”, erro de gravação e sucesso. Inclua um painel de revisão fora da navegação principal para simular carregamento lento, falha de leitura e falha de gravação: é o que permite testar esses estados.

**Linguagem.** Português direto, ações com verbo e objeto (“Cadastrar paciente”), sem jargão técnico. Situações com cor e texto, nunca só cor. Palavras financeiras exatas: valor apresentado não é valor recebido, orçamento não é receita, quantidade de registros não é ocupação.

**Acessibilidade.** Alvo WCAG 2.2 AA. Rótulos visíveis de 16 px, textos auxiliares de pelo menos 14 px, controles com pelo menos 44 px, foco visível, contraste de 4,5:1 no mínimo (texto secundário perto de 7:1). Navegação completa por teclado, diálogos que prendem o foco e o devolvem ao fechar, hierarquia de títulos sem saltos, transições desligadas com `prefers-reduced-motion`. Ao esconder um rótulo para ganhar espaço, mantenha o nome acessível.

**Impressão e exportação.** Relatório tem versão de impressão sem navegação e exportação CSV. Valor desconhecido sai vazio.

### 5. Dados e regras

- **Contrato de armazenamento.** Mantenha chave, versão, IDs e relações. Prefira mudanças aditivas: campos e coleções novos são opcionais e lidos como vazios quando ausentes. A leitura nunca grava. Mudança incompatível precisa ser proposta com a migração antes de ser feita.
- **Nada é atribuído em silêncio.** Registro antigo sem um dado novo aparece como pendência (“Sem clínica”), com uma tela para vincular explicitamente os registros escolhidos. Texto livre antigo é exibido como “registro anterior”, sem conversão automática.
- **Desconhecido não é zero.** Valor não informado fica vazio, é contado à parte e nunca entra em soma como zero.
- **Operações idempotentes.** Repetir uma ação de conclusão devolve o registro existente, sem duplicar itens nem histórico.
- **Situação que exige registro vira ação.** Se “Concluída” depende de informar o que foi feito, ela sai do campo de situação e passa a ser um botão com tela própria.
- **Travas explícitas.** O que foi enviado ou validado não muda até ser devolvido para correção. Estados de documentos (rascunho, enviado, em correção, validado) são independentes do estado do registro de origem.
- **Efeitos colaterais só quando pedidos.** Concluir um atendimento não cria lançamento financeiro; registrar estoque não cria pagamento.
- **Histórico e auditoria.** Cada gravação efetiva registra data, responsável e o que mudou, na mesma transação. Salvar sem mudança não gera evento.
- **Dinheiro em centavos inteiros.** Não invente desconto, arredondamento, comissão ou repasse.
- **Demonstração não é segurança.** Login e perfis locais são telas de demonstração: não persista senhas e não trate uma visão local como controle de acesso.

### 6. Validação

Antes de dizer que uma entrega está pronta, rode e relate o resultado real de:

1. Lint.
2. Testes unitários dos Models, sem navegador e sem framework extra (`node --test`). Cada regra dos critérios de aceite tem um teste.
3. Build normal e build com o caminho base da hospedagem.
4. Testes de ponta a ponta com Playwright em dois projetos, desktop 1440 × 960 e celular 375 × 812, no servidor de desenvolvimento e também na prévia do build final.

O que os testes de ponta a ponta precisam provar:

- Cada fluxo completo, seguido de recarregar a página e comparar o que ficou gravado.
- Falha de leitura e de gravação: mensagem, foco, preenchimento conservado e repetição sem duplicar.
- Teclado e foco nos diálogos e formulários.
- Uma varredura por todas as telas com axe, nomes muito longos sem espaços, 320 px, 720 px, nenhum erro de JavaScript e armazenamento inalterado pela simples consulta.
- Que listas principais mostram busca e paginação sem rolar a página em 1366 × 768, medindo a altura do documento contra a da janela.
- Que snapshots antigos abrem sem conversão e sem gravação.

Complete com capturas reais das telas na origem isolada e uma tabela de medidas (altura da página, rolagem horizontal, erros de console). Diga o que essa prova não cobre: teste com pessoas, leitor de tela, dispositivo físico, backend.

### 7. Documentação e relatório

- README com o comportamento atual, como executar e os limites.
- Um documento por entrega: pedido, decisões adotadas, contrato de dados, o que mudou, evidência executada, diferenças em relação ao aprovado e dependências abertas. Separe sempre decisão confirmada, proposta, implementação e evidência.
- Uma ficha curta por módulo com regras, arquivos, testes e limites, e um índice para localizar tudo.
- Guarde junto da documentação as imagens aprovadas, o gerador do cenário fictício e o servidor da origem isolada, com caminhos relativos.
- No relatório final, comece pelo que foi encontrado e validado, depois liste o que depende de mim.

### 8. Armadilhas que já custaram tempo

- **Lista que “cabe” só no monitor grande.** Meça em 1366 × 768 e escreva um teste; a paginação some com dois registros a mais.
- **Compactar diminuindo a fonte.** Rótulos abaixo de 16 px pioram a leitura. Compacte com espaçamento e com uma linha por registro.
- **Título removido para ganhar espaço.** Quebra a hierarquia de títulos. Oculte visualmente e mantenha no HTML.
- **Texto longo sem espaços.** Estoura grades e tabelas. Use `overflow-wrap: anywhere` e `min-width: 0` nas colunas flexíveis, e teste com nomes de 300 caracteres.
- **Rota em hash que não remonta.** Navegar para a mesma rota não reinicia o formulário. Trate isso na aplicação e, nos testes, navegue pelos links da interface.
- **Envio duplo no mesmo instante.** Desabilitar o botão não basta; trave no ViewModel e torne a operação idempotente no Model.
- **axe no meio de uma transição.** Ele pode ler uma cor intermediária e acusar contraste. Nas varreduras, emule movimento reduzido.
- **Moeda em pt-BR.** O separador entre “R$” e o número é um espaço não separável; nos testes use `\s`.
- **Seletores ambíguos.** O mesmo nome aparece na lista e na auditoria. Use papel, nome exato e a região.
- **Varredura única de todas as telas.** Estoura o tempo limite conforme o sistema cresce. Divida por grupo de telas.
- **Teste sensível a tempo.** Testes com relógio simulado ou envio lento falham quando a máquina está ocupada. Não rode processos pesados em paralelo e repita o teste isolado antes de concluir que é defeito.
- **Dois builds, uma pasta.** O build normal e o da hospedagem escrevem no mesmo lugar. O último build precisa ser o que será servido ou testado.
- **Migração “esperta”.** Atribuir unidade, forma de atendimento ou valor por inferência cria dado falso. Pendência visível e vinculação explícita.
- **Indicador sem definição.** Todo número do painel diz o que conta e o que não conta.

### 9. Formato da sua primeira resposta

Responda somente com: diagnóstico, plano em entregas, imagens das telas propostas com a recomendação, tabela de decisões com respostas sugeridas e critérios de aceite. Termine dizendo o que precisa da minha aprovação para começar. Não escreva código de produção nesta etapa.
