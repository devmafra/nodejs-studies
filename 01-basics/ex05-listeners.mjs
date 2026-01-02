// Exercício 5: Modifique o código da classe Conversa para adicionar dois ouvintes diferentes
// para o evento mensagemRecebida. O primeiro ouvinte deve exibir o conteúdo da mensagem,
// e o segundo ouvinte deve contar quantas mensagens foram recebidas.

import { EventEmitter } from "node:events";

class Conversa extends EventEmitter {
  messagesCount = 0;

  constructor() {
    super();

    this.on("mensagemRecebida", (m) => {
      console.log("Nova mensagem recebida: " + m);
    });

    this.on("mensagemRecebida", () => {
      console.log(`Quantidade de mensagens: ${this.messagesCount}`);
      console.log("==========================");
    });
  }

  enviarMensagem(msg) {
    this.messagesCount++;
    this.emit("mensagemRecebida", msg);
  }
}

const novaConversa = new Conversa();
novaConversa.enviarMensagem("Olá, tudo bem?");
novaConversa.enviarMensagem("Quais os planos pro fim de semana?");
novaConversa.enviarMensagem("Até logo!");
