// Exercício 4: Modifique o código da classe Conversa para herdar a emissão de eventos e
// adicione um novo evento chamado mensagemRecebida. Ao receber a mensagem, exiba
// "Nova mensagem recebida!" e a própria mensagem.

import { EventEmitter } from "node:events";

class Conversa extends EventEmitter {
  constructor() {
    super();
    this.on("mensagemRecebida", (m) => {
      console.log("Nova mensagem recebida:");
      console.log(m);
    });
  }

  enviarMensagem(msg) {
    this.emit("mensagemRecebida", msg);
  }
}

const novaConversa = new Conversa();
novaConversa.enviarMensagem("Olá, tudo bem?");
