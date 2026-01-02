// Exercício 5: Modifique o código da classe Conversa para adicionar dois ouvintes diferentes
// para o evento mensagemRecebida. O primeiro ouvinte deve exibir o conteúdo da mensagem,
// e o segundo ouvinte deve contar quantas mensagens foram recebidas.

import { EventEmitter } from "node:events";

class Conversa extends EventEmitter {
  constructor() {
    super();
    this.messagesCount = 0;

    this.on("mensagemEnviada", (m) => {
      console.log(`Mensagem enviada: ${m}`);
    });

    this.on("mensagemRecebida", (m) => {
      console.log(`Mensagem recebida: ${m}`);
    });
    this.on("mensagemRecebida", () => {
      this.messagesCount++;
      console.log(`Total de mensagens recebidas: ${this.messagesCount}`);
    });
  }

  enviarMensagem(msg) {
    this.emit("mensagemEnviada", msg);
  }
  receberMensagem(msg) {
    this.emit("mensagemRecebida", msg);
  }
}

const novaConversa = new Conversa();
novaConversa.receberMensagem("Tudo sim, e você?");
novaConversa.receberMensagem("Quais os planos pro fim de semana?");
novaConversa.receberMensagem("Até mais.");
