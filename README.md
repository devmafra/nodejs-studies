# 🚀 Node.js Studies: Event Emitters & Async

Este repositório contém uma série de exercícios práticos focados no núcleo do **Node.js**, especificamente no módulo `events` (EventEmitter), manipulação de classes e operações assíncronas.

O objetivo é solidificar o entendimento sobre a **Arquitetura Orientada a Eventos** que é a base do Node.js.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **JavaScript (ES6+)**
- **Módulo `events`** (EventEmitter)
- **Módulo `fs`** (File System)

## 📂 Lista de Exercícios

Os exercícios foram divididos em duas etapas: Fundamentos e Desafios Práticos.

### Parte 1: Fundamentos de EventEmitter

- [x] **Ex 01:** Criação simples de um emissor e ouvinte para "mensagemRecebida".
- [x] **Ex 02:** Passagem de argumentos (payload) através dos eventos.
- [x] **Ex 03:** Criação de classes (`class Conversa`) herdando de `EventEmitter`.
- [x] **Ex 04:** Implementação de múltiplos eventos em classes filhas.
- [x] **Ex 05:** Múltiplos _listeners_ para o mesmo evento (Log + Contador).

### Parte 2: Desafios de Lógica e Assincronismo

- [x] **Ex 06 - Sistema de Login:** Simulação de autenticação assíncrona com callbacks e eventos de sucesso/falha.
- [x] **Ex 07 - Task Queue:** Implementação de uma fila de processamento que executa tarefas a cada 2 segundos.
- [x] **Ex 08 - Logger Diário:** Sistema que registra logs em memória e emite um relatório "diário" simulado.
- [x] **Ex 09 - Ping/Pong com Limite:** Controle de fluxo para finalizar processos após um número definido de eventos.
- [x] **Ex 10 - File System I/O:** Leitura e escrita de arquivos (`fs`) orquestrada via eventos.

## 📦 Como rodar os exercícios

Para executar qualquer um dos arquivos, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. Clone o repositório:
   ```bash
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
   ```
2. Navegue até a pasta:
   cd NOME-DO-REPO
3. Execute o exercício desejado:
   node exercicio01.js

# ou

node desafio-login.js
