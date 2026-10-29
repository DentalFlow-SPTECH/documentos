---
kind: module
status: reviewed_against_current_frontend
---
# Especificação SDD

Entrega solicitada: planilha e arquivo Markdown condizentes com o frontend atual. Revisão de 29/10/2026, commit `87fbfcd0148346079a5476bd37de54cbea5c4f5d`.

- [Planilha SDD](../../0_Context/b_brief/dental_flow_ap_clinic_SPC_frontend_brief.xlsx): preserva as abas principais e os identificadores; acrescenta comparação dos 52 RFs antigos em Auditoria de Escopo.
- [Markdown SDD](../../1_SPC/c_design/dental_flow_ap_clinic_SPC_design.md): 22 telas lógicas, tokens atuais, componentes, conteúdo extraído do código, fluxos, acessibilidade, regras e rastreabilidade.

Estado atual: API integrada; perfis DENTISTA/RECEPCIONISTA; Hoje, Agenda, Pacientes, Clínica, Painel, Mapa do dia e Estoque. Sem rotas atuais de Orçamentos, Caixa independente, auditoria ou recuperação automática. Não reutilizar IDs históricos para funcionalidades diferentes. RF-53 a RF-63 documentam capacidades atuais adicionais, sem aprovação clínica implícita.

Verificação: `npm run check` aprovado, com 32 testes unitários; `npm run test:e2e`: 60 aprovados, 12 ignorados, nenhuma falha, Edge desktop/mobile com API simulada. API real, leitor de tela, dispositivo físico e publicação não executados nesta entrega. Bundle 658,52 kB mantém o aviso de tamanho. Inspeção estrutural e visual da planilha e referências cruzadas dos dois artefatos.

Limites: Basic Auth provisório em sessionStorage; conflito de agenda é aviso; pendências de toque/contraste; sem garantia de regra do backend apenas a partir do frontend. A SDD registra divergência entre textos de mapa aberto/fechado e inclusão no painel. Consultar as lacunas antes de alterar código.
