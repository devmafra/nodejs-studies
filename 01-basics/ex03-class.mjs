// Exercício 3: Crie uma classe chamada Conversa que herde de EventEmitter. A classe
// deve ter um método chamado enviarMensagem que emita o evento mensagemEnviada. O
// evento deve aceitar um argumento com a mensagem enviada e exibir no console quando a
// mensagem for enviada

import { EventEmitter } from "node:events";

class Conversa extends EventEmitter {
  constructor() {
    super();
    this.on("mensagemEnviada", (m) => {
      console.log(m);
    });
  }
  enviarMensagem(msg) {
    this.emit("mensagemEnviada", msg);
  }
}

const novaConversa = new Conversa();
novaConversa.enviarMensagem("Mensagem usando a classe");
