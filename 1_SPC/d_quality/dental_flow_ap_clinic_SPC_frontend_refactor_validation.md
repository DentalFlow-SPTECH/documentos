# Verificação da refatoração do frontend

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
