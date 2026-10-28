# Dental Flow — estudo de identidade visual, UX e plano de integração

Versão 3 · 28/10/2026 · **Status: direção A e agenda combinada aprovadas e implementadas no `frontend` (seção 13), ainda sem commit.**

## 1. Pedido e restrições

- **Problema relatado:** clientes dizem que o sistema "não tem identidade" e "tem cara de site feito por IA".
- **Quem usa:** a dona da clínica e a recepção, sem familiaridade com tecnologia. As referências delas são aplicativos do dia a dia: WhatsApp, Instagram e Uber.
- **Foco:** UI e UX, com padrões já consolidados no mercado.
- **Regras técnicas:** React + Vite, axios, JSX e CSS Modules. A equipe recomendou o [shadcn/ui](https://ui.shadcn.com/).
- **Integração:** consumir a API descrita no guia de integração do frontend (estado de 28/10/2026).

## 2. Diagnóstico da interface atual

Base: capturas da implementação de 08/10/2026 (`dental_flow_ap_clinic_SPC_frontend_clinic_reports/*_screen_*`) e código em `frontend/src`.

### Por que parece "feito por IA"

1. **Modelo genérico de painel SaaS.** A interface usa barra lateral azul-marinho, acento turquesa, cartões brancos do mesmo peso e uma grade de quatro indicadores. É o layout que ferramentas de geração e modelos prontos de dashboard produzem por padrão.
2. **Texto explicativo em excesso.** Quase todo título traz um subtítulo e quase todo número traz uma nota, por exemplo: "Agenda · inclui 13 canceladas e 19 faltas. Não é ocupação." Explicar tudo, em vez de mostrar, é uma marca típica de interface gerada.
3. **Hierarquia plana.** Nenhum elemento indica por onde começar. Painel, agenda e listas dão o mesmo peso a todos os blocos.
4. **Nenhum elemento próprio.** Faltam rostos ou iniciais e uma cor de marca além do turquesa do logo. Os ícones de traço são genéricos e a IBM Plex Sans tem tom corporativo.
5. **Contorno de foco no título.** O contorno escuro em volta de "Agenda" e "Painel" parece um erro para quem não usa teclado.
6. **Linguagem de sistema.** Aparecem termos como "registros", "Vincular registros sem clínica" e "Filtrar por doutor · Buscar", além de setas "←" e "→" escritas como texto.

### Por que é difícil para a cliente

1. **A agenda mostra contagens, não pessoas.** Ela abre em grade semanal com blocos "6 consultas", e é preciso clicar para saber quem vem. Os aplicativos do dia a dia mostram pessoas.
2. **Filtros antes do conteúdo.** No celular, seis controles de filtro aparecem antes da primeira consulta (`*_screen_agenda_week_mobile.png`).
3. **Menu escondido.** No celular, as nove áreas ficam atrás do botão de menu (hambúrguer). Nos aplicativos que ela usa, há uma barra de abas na parte de baixo com 4 ou 5 itens.
4. **Controles de computador.** Os filtros usam listas suspensas nativas e campos de data, em vez de chips e faixa de dias.
5. **Áreas sem API.** O menu tem nove itens, e quatro deles ainda não têm API: Orçamentos, Estoque, Caixa e Relatórios (ver seção 7).

## 3. Padrões consolidados a adotar

Adotamos padrões de interação conhecidos, sem copiar a aparência dessas marcas.

| Padrão | Onde ela já viu | Uso no Dental Flow |
|---|---|---|
| Barra de abas inferior, com 4 itens | WhatsApp, Instagram, bancos, iFood | Celular: Hoje, Agenda, Pacientes e Mais |
| Lista com rosto/iniciais, nome em destaque e informação à direita | Conversas do WhatsApp, contatos | Agenda do dia e pacientes |
| Busca grande no topo | WhatsApp, Instagram, "Para onde?" do Uber | Pacientes e início do agendamento |
| Chips horizontais de filtro | Instagram, iFood, Uber | Dentista, período e situação |
| Faixa de dias rolável | Agendamento no iFood e no Uber, Google Agenda | Agenda |
| Botão de ação principal fixo ou flutuante | Nova conversa no WhatsApp, Gmail | Agendar consulta e novo paciente |
| Folha inferior para ações rápidas | Uber, Google Maps | Ações de uma consulta no celular |
| Cartão "próximo" / "agora" | Uber (motorista chegando), iFood (pedido a caminho) | Próximo paciente |
| Botão direto de WhatsApp e ligação | Comércio em geral no Brasil | Consulta e paciente (proposta; ver seção 9) |
| Aviso curto com "Desfazer" | Gmail, WhatsApp | Mudança de situação da consulta |
| Formulário em passos curtos ou seções | Cadastro em bancos e no Uber | Novo paciente |
| Máscara e teclado numérico | Pix, bancos | CPF, celular e CEP |
| Esqueleto de carregamento | Instagram, LinkedIn | Listas, no lugar de "Carregando…" |

## 4. shadcn/ui dentro das regras do projeto

- **O que é o shadcn/ui.** Não é uma dependência instalável. É um conjunto de componentes copiados para dentro do projeto, escritos em Tailwind CSS e TypeScript sobre os primitivos do Radix UI. A instalação para Vite pede `tailwindcss` + `@tailwindcss/vite` e o template "React + TypeScript" (consultado em ui.shadcn.com/docs/installation/vite em 28/10/2026).
- **O conflito.** As regras do projeto são JSX e CSS Modules. Usar o CLI do shadcn traria Tailwind e arquivos TSX.
- **O risco de identidade.** O visual padrão do shadcn (cinza neutro, bordas finas, cartões brancos, Inter/Geist) é justamente o que v0, Lovable, Bolt e ferramentas parecidas geram. Usá-lo sem personalização reforçaria a reclamação de "cara de IA".
- **Recomendação: adotar a arquitetura do shadcn, sem Tailwind.**
  - Usar os mesmos primitivos **Radix UI** que o shadcn usa: Dialog, Popover, Select, Dropdown Menu, Tabs, Toast, Tooltip, Checkbox, Radio Group, Switch e Avatar. Assim, foco, teclado e leitura assistiva já vêm prontos. Instalar apenas os pacotes usados.
  - Escrever os componentes em `src/component/ui/` com `.module.css`. Nomes e propriedades seguem o shadcn (`variant`, `size`, `asChild`), para a equipe reconhecer o padrão. São eles: Button, Input, Field, StatusPill, Card, Sheet, Dialog, Tabs, Chips, Avatar, Toast, Skeleton, EmptyState e DayStrip.
  - Dar aos tokens os mesmos nomes semânticos do shadcn (`--background`, `--foreground`, `--primary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`), com os valores da direção escolhida.
  - Usar **lucide-react** para os ícones, o mesmo pacote do shadcn.
- **Alternativa não recomendada.** Liberar Tailwind só para os componentes de UI. Isso quebra a regra de CSS Modules e exige TypeScript ou conversão manual a cada atualização.

## 5. Três direções

As imagens são **protótipos estáticos em HTML com dados fictícios**, capturados em PNG. Nomes, valores e quantidades não são requisitos. As três direções usam o mesmo conteúdo e as mesmas telas: agenda do dia da recepção, painel do mês, entrada, hoje, pacientes e novo paciente no celular. A tela de novo paciente traz o mesmo erro de CPF duplicado (`BSN001`).

- Comparação lado a lado: `dental_flow_ap_clinic_SPC_frontend_identity/dental_flow_ap_clinic_SPC_identity_comparison_agenda.png`
- Fontes HTML: `dental_flow_ap_clinic_SPC_frontend_identity/dental_flow_ap_clinic_SPC_identity_direction_{a,b,c}.html`
- Captura: `node dental_flow_ap_clinic_SPC_identity_capture.mjs`, que usa o Playwright do checkout `frontend` e o canal msedge.

### A · Conversa

- **Conceito:** a agenda funciona como a lista de conversas do WhatsApp. Cada consulta tem as iniciais coloridas do paciente, o nome em destaque, o horário à esquerda e a situação à direita. Ao lado fica o detalhe, com WhatsApp, ligação, etapas da consulta e a próxima ação.
- **Personalidade:** próxima, calorosa e organizada.
- **Marca:** o símbolo do dente vira ícone de aplicativo. O verde-petróleo deriva do turquesa do logo.
- **Tipografia:** Figtree, com títulos em 800 e texto em 400/500. No celular, o corpo de texto tem no mínimo 16 px.
- **Cores por função:**
  - Fundo: papel `#F6F2EC`. Superfícies: `#FFFFFF`. Texto: `#1B2529`.
  - Primária `#0D6E66` para ações e seleção (6,1:1 sobre branco).
  - Marcador "agora" em coral: `#E8613C` só na linha e no ponto, `#B9472A` para texto (4,7:1).
  - WhatsApp: escurecer para cerca de `#187A43`, porque `#1E8E4E` dá 4,2:1 com texto branco de 16 px.
  - Situações: Agendado em âmbar, Confirmado em verde, Em atendimento em violeta, Concluído em azul, Cancelado em vermelho e Faltou em cinza. Sempre com ícone e texto, nunca só cor.
- **Forma:** raios de 12 a 24 px, pílulas e botões de 46 a 54 px.
- **Reconhecimento:** iniciais coloridas por pessoa, linha "Agora", etapas da consulta e botão flutuante "Agendar".
- **Melhor para:** familiaridade imediata para quem vive no WhatsApp.
- **Riscos:** as cores dos avatares podem competir com as cores das situações. A paleta de avatares precisa ficar em tons pastel.
- Imagens: `*_identity_a_agenda_desktop.png`, `*_identity_a_painel_desktop.png`, `*_identity_a_celular.png`.

### B · Próximo

- **Conceito:** a tela responde primeiro "quem é o próximo?". Um cartão escuro mostra o horário grande, o paciente e o botão de iniciar. Abaixo vem a linha do tempo, com uma coluna por dentista. No celular, o agendamento começa por "Agendar para quem?".
- **Personalidade:** direta, rápida e segura.
- **Marca:** maior continuidade com o logo atual. O turquesa original `#1ED8CF` é o único acento sobre preto (10,6:1).
- **Tipografia:** Archivo, com 800 em horários e números grandes.
- **Cores por função:**
  - Texto `#0E1113`, fundo branco, cinza `#F2F3F3` em campos e blocos.
  - Turquesa só sobre superfícies escuras e no marcador "agora". Em texto sobre fundo claro, usar `#08726C` (5,8:1).
  - Cada situação tem uma barra lateral colorida.
- **Forma:** raios de 10 a 18 px e botões pretos de 48 a 56 px.
- **Reconhecimento:** preto com turquesa, horários enormes, cartão "Próximo" e cadastro em passos com barra de progresso.
- **Melhor para:** vários dentistas atendendo ao mesmo tempo e leitura à distância no balcão.
- **Riscos:** pode parecer frio para um consultório. A grade por dentista não cabe no celular, por isso o celular usa a linha do tempo vertical.
- Imagens: `*_identity_b_agenda_desktop.png`, `*_identity_b_painel_desktop.png`, `*_identity_b_celular.png`.

### C · Sereno

- **Conceito:** a tela fala como uma pessoa: "Bom dia, Carla. Hoje a clínica tem 14 consultas; 4 pacientes ainda não confirmaram." As consultas aparecem em cartões espaçosos, separados por Manhã e Tarde. Uma coluna "precisa de atenção" lista os lembretes. O painel resume o mês em uma frase.
- **Personalidade:** calma, cuidadosa e de alto padrão.
- **Marca:** verde-sálvia profundo com terracota. O símbolo do dente é mantido.
- **Tipografia:** Fraunces (serifa suave) em títulos e números, Nunito Sans no texto.
- **Cores por função:**
  - Areia `#F3EEE6`, superfície `#FFFDF9`, texto `#22302A`.
  - Primária sálvia `#2E5245` (8,6:1).
  - Terracota para "próxima" e "atenção": `#A4512C` em texto (5,5:1), porque `#C4673F` dá apenas 3,9:1.
  - Texto secundário: escurecer para cerca de `#5E6963` (o protótipo usa 4,4:1).
- **Forma:** raios de 22 a 24 px e botões em pílula.
- **Reconhecimento:** títulos com serifa, frases-resumo, cores terrosas, consultas anteriores recolhidas e cadastro em seções recolhíveis.
- **Melhor para:** diferenciação forte e sensação de clínica premium.
- **Riscos:** menos informação por tela, portanto mais rolagem. Números com serifa exigem cuidado em tamanhos pequenos.
- Imagens: `*_identity_c_agenda_desktop.png`, `*_identity_c_painel_desktop.png`, `*_identity_c_celular.png`.

### Comparação

| Critério | A · Conversa | B · Próximo | C · Sereno |
|---|---|---|---|
| Familiaridade para a cliente | Alta (WhatsApp) | Alta (Uber) | Média (apps de bem-estar) |
| Informação por tela | Média | Alta | Baixa |
| Continuidade com o logo | Média (deriva do turquesa) | Alta (turquesa original) | Baixa (paleta nova) |
| Distância do "visual de IA" | Alta | Alta | Muito alta |
| Esforço de implementação | Médio | Médio-alto (grade por dentista) | Médio |

**Recomendação: A · Conversa.** É a direção mais familiar para quem usa WhatsApp todos os dias, mantém a ligação com o logo e equilibra informação e calma. Da direção B, o cartão "Próximo paciente" pode entrar na tela Hoje, se a cliente quiser. É uma avaliação estética fundamentada, não uma pesquisa com usuários. Vale mostrar as imagens à cliente antes de decidir.

### Decisão (28/10/2026)

- **Escolha:** o grupo analisou o PDF `dental_flow_ap_clinic_SPC_identity_proposals.pdf` e escolheu a **direção A**. O painel da A foi citado como ponto forte.
- **Restrição da agenda (Jorge Luiz):**
  - O eixo vertical mostra os horários e o eixo horizontal separa os dias da semana.
  - Cada cartão ocupa o dia e o horário conforme a duração do procedimento.
  - A lista do dia da A não substitui essa grade.
- **Agenda combinada (proposta, aguardando aprovação):** grade da tela atual + cartões, cartão "Próximo" e linha "agora" da B, tudo na identidade A. Protótipo em `dental_flow_ap_clinic_SPC_identity_agenda.html`.
  - **Semana no computador (padrão):**
    - 7 colunas, hora com 80 px e linhas a cada meia hora.
    - Consultas simultâneas ficam lado a lado.
    - O cartão mostra horário e nome. Quando há altura, mostra também o procedimento e o dentista.
    - Cor, barra lateral e ícone indicam a situação.
    - Dias passados ficam esmaecidos e a linha "agora" aparece no dia atual.
    - Na semana corrente, o cartão "Próximo" fica acima da grade.
  - **Filtro por dentista:** chips com contagem; com um dentista escolhido, os cartões ocupam a largura do dia.
  - **Detalhe:** clicar no cartão abre um painel lateral com WhatsApp, ligar, etapas e ações. A grade continua visível.
  - **Celular:** visões Dia (padrão) e 3 dias com a mesma regra de eixos, ações numa folha inferior e Mês mantido.
  - **A confirmar:** a visão "Dia" no computador pode usar colunas por dentista, como na B.
- **Imagens:** `*_identity_agenda_semana_desktop.png`, `*_identity_agenda_semana_filtro_desktop.png` e `*_identity_agenda_celular.png`.

## 6. Regras de aplicação, válidas para qualquer direção

- **Menos texto.** Títulos curtos e nenhum subtítulo explicativo por padrão. A explicação aparece onde há dúvida real: dica de campo, estado vazio ou erro.
- **Ação principal única por tela.** Ela fica no topo à direita no desktop e flutuante ou fixa embaixo no celular.
- **Situações com ícone e texto, nunca só cor.** São as mesmas seis do enum da API.
- **Toque confortável.** Alvos de no mínimo 44 px, corpo de 16 px no celular e rótulos sempre visíveis, sem depender de placeholder.
- **Foco.** O foco continua indo para o título após a navegação, para a leitura assistiva, mas sem contorno quando o foco é programático. O contorno só aparece na navegação por teclado.
- **Celular.** Barra de abas inferior (Hoje, Agenda, Pacientes, Mais). Ações de consulta abrem numa folha inferior.
- **Desktop.** A navegação muda conforme a direção (barra superior, trilho ou lateral clara) e mostra só o que a persona pode acessar. O Painel aparece apenas para `DENTISTA`.
- **Decoração.** Nunca disputa espaço com campos, avisos ou a ação principal.

## 7. Escopo: o que tem API e o que não tem

| Área atual | API disponível | Proposta |
|---|---|---|
| Login | `GET /auth/me` (Basic) | Integrar |
| Cadastro público | Não existe; usuário é criado por `POST /user` (só `DENTISTA`) | Trocar por "Cadastrar usuário" dentro de Clínica |
| Painel | `GET /dashboard` (só `DENTISTA`) | Refazer sobre o contrato da API; o conteúdo atual usa dados locais |
| Agenda | `GET/POST/PUT /appointment`, `PATCH .../status` | Integrar; "Finalizar consulta" com procedimentos realizados não tem rota |
| Pacientes | `GET/POST/PUT /patient`, busca por nome, sem paginação | Integrar com os campos da API |
| Doutores | `/dentist` | Integrar; renomear para "Dentistas" (decisão) |
| Procedimentos | `/procedure` | Tela nova; hoje não existe cadastro |
| Clínica | `GET/PUT /clinic/{id}` | Integrar |
| Usuários | Só `POST /user`; sem listagem ou edição | Formulário de cadastro |
| Orçamentos, Estoque, Caixa, Relatórios, auditoria e vínculos | Não existem | **Decisão pendente** |

O guia diz que "o frontend não deve simular essas funcionalidades como se já estivessem persistidas pela API". Há três opções para as áreas sem API:

- **Ocultar até a API existir (recomendada).** O código atual fica no histórico Git.
- **Manter como demonstração local, marcada.** Isso conflita com o guia.
- **Remover o código.**

## 8. Arquitetura da integração

- **Cliente HTTP** (`src/data/api/http_client.js`):
  - `axios.create({ baseURL: import.meta.env.VITE_API_URL ?? '/dentalflow-api/v1' })`.
  - Na requisição, o interceptador acrescenta `auth: { username, password }` a partir da sessão.
  - Na resposta, o interceptador devolve `response.data.data` e normaliza o erro em `{ code, status, message }`.
- **CORS em desenvolvimento.** O backend não tem configuração CORS. Em desenvolvimento, `server.proxy` do Vite repassa `/dentalflow-api` para `http://localhost:8080`. Em produção, é preciso servir na mesma origem ou o backend precisa liberar a origem.
- **Sessão** (`src/data/api/session.js`): credenciais em memória e usuário de `/auth/me` (`id`, `clinicId`, `dentistId`, `name`, `accessLevel`). Logout apaga a sessão.
  - **Decisão pendente:** só memória (atualizar a página exige entrar de novo) ou `sessionStorage` (sobrevive ao atualizar e some ao fechar a aba, mas a senha fica acessível a scripts da página).
  - A solução definitiva é um token emitido pelo backend.
- **Repositories por módulo** (`feature/<módulo>/repository/*_api_repository.js`): as Views continuam só com JSX, e os ViewModels chamam os repositories. O `clinicId` vem sempre da sessão, nunca de parâmetro editável.
- **Agenda.** A consulta traz só IDs. Pacientes, dentistas e procedimentos são carregados em paralelo e montados em mapas, com cache por clínica.
- **Erros:**

  | Status | Comportamento |
  |---|---|
  | 401 | Volta para Entrar com "Sua sessão terminou" |
  | 403 | Tela "Você não tem acesso a esta área" |
  | 404 | Mensagem no lugar do conteúdo |
  | 422 | Mensagem da API junto ao formulário; no campo quando for CPF, CRO ou login |
  | 5xx ou sem conexão | Aviso "Não conseguimos salvar. Tente de novo." com os dados preservados |

- **Formatos:**
  - Datas em `YYYY-MM-DD`; data e hora em ISO local.
  - Valores monetários como número, formatados em BRL só na tela.
  - Campos `*Rate` e `netMargin` já vêm em percentual.
- **Limites do backend que afetam a UX:**
  - Sem paginação: filtrar no cliente e paginar a lista na tela.
  - Sem listagem de usuários.
  - Sem recuperação de senha: a tela de entrada orienta a falar com o responsável.
  - Sem bloqueio de horário sobreposto: o frontend avisa, sem garantir.
  - Dashboard sem `mapa_diario`: estado vazio para `NO_FINANCIAL_DATA`.
  - Sem fluxo para o primeiro `DENTISTA`.

## 9. Itens dos protótipos que são funcionalidade nova

Estes itens aparecem nas imagens, mas exigem aprovação própria:

- **Botão WhatsApp / "Lembrar".** Link `wa.me` com o telefone do paciente e texto pronto. Só frontend, sem envio automático.
- **Botão "Ligar".** Link `tel:`.
- **Preenchimento do endereço pelo CEP.** Consulta a um serviço externo (por exemplo, ViaCEP). Não aparece nas imagens; é uma sugestão.

Estes itens são apenas cálculo sobre dados que já vêm da API: "Próximo · em 20 min", as contagens por situação e por dentista, e "4 ainda não confirmaram" (situação `AGENDADO`).

## 10. Matriz de telas e provas

| Família | Telas | Estados a conferir |
|---|---|---|
| Entrada | Entrar | Vazio, 401, carregando, sem conexão |
| Navegação | Barra/trilho/lateral no desktop, abas e "Mais" no celular | Recepção x dentista |
| Listas | Hoje/Agenda, Pacientes, Dentistas, Procedimentos | Vazio, esqueleto, busca sem resultado, erro |
| Detalhes | Consulta, Paciente | Seis situações; Cancelado e Faltou não reabrem |
| Formulários | Paciente, agendar/remarcar, dentista, procedimento, clínica, usuário | `DMN001`, `BSN001`, salvando, sucesso |
| Confirmações | Cancelar, marcar falta | Folha inferior ou diálogo, "Desfazer" |
| Painel | Painel do mês | `NO_FINANCIAL_DATA`, alertas `INFO`/`WARNING`/`CRITICAL`, filtro por dentista |
| Acesso | 403, 404 | — |

- **Larguras:** 320, 375, 768, 1366 e 1440 px, mais zoom de 200%.
- **Tema:** claro (o tema escuro está fora deste escopo).
- **Provas:** axe, teclado, capturas antes/depois na implementação real e uma sessão com a cliente fazendo cinco tarefas (entrar, achar paciente, agendar, confirmar, ver o painel).

## 11. Plano de execução depois da aprovação

0. **Decisões:** direção visual; áreas sem API; sessão em memória ou `sessionStorage`; "Doutores" ou "Dentistas"; botões de WhatsApp e ligação.
1. **Fundação visual:**
   - Tokens da direção e fonte via `@fontsource`; `lucide-react` e primitivos Radix.
   - Componentes base em `src/component/ui`.
   - Novo AppShell (desktop + abas inferiores) e ajuste do foco no título.
2. **Integração base:**
   - Axios, sessão, entrada real e proteção de rotas por persona.
   - Tratamento de erros, proxy do Vite e testes unitários do cliente com adapter falso.
3. **Telas com API, na ordem do guia:** Dentistas, Procedimentos, Pacientes, Agenda do dia (lista, detalhe, situação, agendar/remarcar), Clínica, Usuários e Painel.
4. **Áreas sem API:** conforme a decisão.
5. **Verificação:**
   - `npm run lint`, testes unitários, `npm run build` e `npm run build:pages`.
   - E2E reescritos: os 275 cenários atuais validam a demonstração local e o snapshot `dental_flow_demo_v1`, que deixam de ser a fonte de dados.
   - axe, reflow em 320 px, zoom de 200% e capturas da implementação.
6. **Documentos:** atualizar `frontend/AGENTS.md` e `README.md` (deixam de valer "preservar visual" e "dados locais"), arquitetura, fichas do brain e entrega com evidência.

## 12. Limites deste estudo

- As imagens são protótipos estáticos. Não provam implementação, desempenho nem comportamento real.
- As fontes e os ícones dos protótipos vêm do Google Fonts e do unpkg (lucide 0.469.0). Na implementação, os pacotes ficam no projeto.
- Os contrastes citados foram calculados pela fórmula WCAG só para os pares listados. Os demais serão verificados com axe na implementação.
- Não houve teste com a cliente nem com leitor de tela. Também não foram conferidos tablet, tema escuro nem o comportamento da API, porque o backend não estava em execução em `localhost:8080` durante o estudo.
- O índice do brain tem alterações locais de outra pessoa e não foi editado. A ficha deste estudo deve entrar quando essas alterações forem integradas.

## 13. Implementação (28/10/2026)

- **Frontend reconstruído na direção A.** Tokens com nomes semânticos do shadcn, componentes próprios sobre Radix com CSS Modules, lucide e Figtree. Telas: Entrar, Hoje, Agenda (semana em grade, dia por dentista, 3 dias no celular, mês), agendar/remarcar, Pacientes, Clínica, Painel, Mapa do dia e Estoque. Detalhes no `frontend/README.md`.
- **Integração** com axios sobre todas as rotas do guia de 28/10/2026, incluindo estoque e mapa do dia, que entraram nesta versão do guia. Sessão só em memória. Proxy do Vite, porque o backend não tem CORS.
- **Decisões tomadas por padrão** (as perguntas ficaram sem resposta):
  - Orçamentos, Caixa, Relatórios e auditoria saíram do menu e do código até existir API.
  - O menu usa "Dentistas".
  - Os botões de WhatsApp e ligar entraram, porque fazem parte das imagens aprovadas.
- **Verificação:**
  - Lint sem erros e 22 testes unitários aprovados.
  - `npm run build` e `npm run build:pages` aprovados.
  - `npm run test:e2e`: 34 aprovados e 8 ignorados (desktop 1440 px e celular 375 px, axe, reflow em 320 px), com a API simulada pelo contrato do guia.
  - `real_api.spec.js`: 2 aprovados contra a API local, com MySQL 8.4 em Docker.
  - Também houve revisão das capturas reais da implementação.
- **Problemas encontrados no backend** (contornados só no ambiente local, sem alterar o repositório):
  1. `schema.sql` falha no MySQL 8.0.16 ou superior: a checagem `chk_usuario_persona` usa `id_dentista`, que também está em `fk_usuario_dentista` com `ON UPDATE CASCADE`.
  2. Os testes de `InventoryAndDailyMapControllerTest` e `InventoryRepositoryImplTest` não compilam com as assinaturas atuais.
  3. Com `ddl-auto=validate`, a API não sobe: as entidades usam `BIGINT` e o schema cria `INT` (por exemplo, `agendamento.id_agendamento`).
  4. As respostas 401 e 403 do `SecurityConfig` saem sem `charset=UTF-8` (acentuação quebrada).
  5. O `pom.xml` pede Java 26, mas o projeto compila com 21.
  6. Sem o cabeçalho `X-Requested-With`, o 401 traz `WWW-Authenticate: Basic`, que abre a janela de login do navegador. O frontend já envia o cabeçalho.
- **Limites:** sem teste com a cliente, leitor de tela ou dispositivo físico; o pacote JavaScript tem 639 kB.

## 14. Ajustes depois do primeiro uso (28/10/2026)

- **Sessão:** credenciais em `sessionStorage`, codificadas. O F5 não desconecta; fechar a aba ou ficar 30 minutos sem uso encerra a sessão. Ao reabrir, o frontend confirma o acesso em `/auth/me`. É provisório: a equipe vai migrar para JWT no backend.
- **Correção no Estoque:** voltar de Equipamentos para Materiais quebrava a tela, porque os dados da aba anterior eram reaproveitados. Agora cada consulta só mostra dados da própria chave, e um erro numa tela aparece dentro do shell, com o menu.
- **Agenda:**
  - a linha "agora" atravessa a grade toda;
  - clicar num horário vazio abre o agendamento já preenchido;
  - as etapas da consulta mostram a situação atual como concluída e o próximo passo igual ao botão.
- **Novas situações (cor e forma):**
  - Agendado: tracejado e vazado.
  - Confirmado: verde.
  - Em atendimento: roxo cheio.
  - Concluído: cinza.
  - Cancelado e Faltou: hachurados.
- **Agendar consulta:** resumo fixo ao lado no computador, barra inferior no celular, horários livres por período e correções de responsividade de 320 a 1440 px.
- **Barra de cima:** o botão de busca solto foi removido.
- **Logotipo:** versões em PNG transparente geradas a partir do símbolo original (prancha em `frontend/scripts/brand/out/export/prancha_logotipo.png`). Escolha do usuário em 28/10/2026:
  - símbolo verde sem quadrado (versão 1) na barra de cima e na tela Entrar;
  - ícone com o dente branco sobre verde (versão 3) como favicon e ícone de atalho (32, 180 e 512 px).
