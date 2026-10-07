# Execução e verificação local do frontend

Os repositórios `frontend` e `documentos` devem estar lado a lado para os links locais. No repositório `frontend`, use Node.js 22.12 ou superior (verificado nesta refatoração com Node 24.19.0) e npm.

```powershell
npm ci
npm run dev
```

O endereço de desenvolvimento é `http://127.0.0.1:5178/`; a entrada usa `#/painel`. Login e Cadastro são rotas demonstrativas e podem ser abertos diretamente.

```powershell
npm run check
npm run test:e2e
```

`check` verifica lint, sete testes unitários e build normal. Playwright usa o Microsoft Edge instalado, executa desktop 1440 × 960 e mobile 375 × 812 e inicia o servidor de desenvolvimento quando `TEST_BASE_URL` estiver ausente. Não colocar credenciais reais nos testes.

Para conferir o build de hospedagem sob `/frontend/`, execute:

```powershell
npm run build:pages
npm run preview:pages
```

Em outro terminal do mesmo repositório:

```powershell
$env:TEST_BASE_URL = 'http://127.0.0.1:4178/frontend/'
npm run test:e2e
Remove-Item Env:TEST_BASE_URL
```

O relatório fica em `frontend/playwright-report/index.html`, ignorado pelo Git. A conclusão precisa indicar o resultado real da rodada e qual build foi usado. Preview é local; o workflow de publicação exige execução manual autorizada.

O snapshot fictício permanece em `dental_flow_demo_v1`, versão 1. Uma leitura ilegível bloqueia novas gravações até a restauração explícita na revisão; não apagar o armazenamento para ocultar uma falha. `Ctrl + Alt + R` abre os controles de revisão. Estoque não permite saldo negativo. Acesso não cria conta persistida ou sessão autenticada.

Para retomar a manutenção, consulte o [brain](../../_brain/dental_flow_ap_clinic_SPC_index.md), a ficha do módulo e o [plano/evidência](../../0_Context/c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md). Confirme o estado Git antes de editar. Commit, push e publicação são ações separadas.
