# Decisão da stack e arquitetura do frontend

Status da decisão: confirmado pelo usuário em 06/10/2026.

## Contexto

Na referência inicial `bb3bcc7`, o frontend usava React, Vite, TypeScript/TSX e CSS Modules. Páginas concentravam apresentação e comportamento; `src/demo/store.tsx` concentrava regras, compatibilidade e persistência local. O usuário determinou JavaScript/JSX, CSS Modules e MVVM, além da atualização da documentação e de um brain acessível pelo Obsidian. O estado atual está no plano, sem confundir esta origem com a implementação refatorada.

## Decisão

- React e Vite continuam como base.
- Componentes com JSX usam `.jsx`; lógica, configurações e testes usam `.js`.
- Estilos de componentes e telas usam `.module.css`. Fontes, reset e tokens continuam globais.
- View contém apresentação e efeitos de interface, incluindo foco. ViewModel contém estado e comandos da tela. Model contém regras sem React/DOM. Repository coordena operações sobre o armazenamento.
- Dados compartilhados têm uma fonte central; cada formulário mantém seu rascunho local.
- `documentos` é a raiz do vault Obsidian. `_brain` contém mapas e resumos com links para fontes canônicas.

## Consequências

A remoção de TypeScript elimina a checagem estática atual. Lint, testes de regras e testes de comportamento oferecem verificações diferentes, não equivalentes. A migração foi executada por módulos, preservando snapshots, IDs, relações, regras confirmadas, interface e rotas; o plano contém as verificações. Mudanças futuras devem manter essas garantias.

MVVM se aplica à organização do frontend. Não define uma arquitetura de backend, endpoints, autenticação real, migração de banco ou novas regras clínicas.

## Fontes relacionadas

- [Arquitetura](../../1_SPC/b_technical/dental_flow_ap_clinic_SPC_frontend_architecture.md)
- [Plano de execução](../c_delivery/dental_flow_ap_clinic_SPC_frontend_refactor.md)
- [Entrada do brain](../../_brain/dental_flow_ap_clinic_SPC_index.md)
