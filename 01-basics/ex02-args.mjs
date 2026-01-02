// Exercício 2: Altere o código anterior para que o evento mensagemRecebida aceite um
// argumento contendo a mensagem recebida e exiba essa mensagem no console.

import { EventEmitter } from "node:events";

const events = new EventEmitter();

events.on("mensagemRecebida", (msg) => console.log(msg));
events.emit("mensagemRecebida", "Nova mensagem");
