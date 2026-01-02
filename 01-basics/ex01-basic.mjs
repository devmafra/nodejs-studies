// Exercício 1: Crie um programa Node.js onde você tenha um EventEmitter. Emita um evento
// chamado mensagemRecebida e ouça esse evento para exibir a mensagem "Mensagem recebida com sucesso!"

import { EventEmitter } from "node:events";

const events = new EventEmitter();

events.on("mensagemRecebida", () =>
  console.log("Mensagem recebida com sucesso!")
);
events.emit("mensagemRecebida");
