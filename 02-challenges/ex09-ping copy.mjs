import { EventEmitter } from "node:events";

class Ping extends EventEmitter {
  pingCount = 0;
  intervalId = null;
  taskQueue = 0;
  maxPings = 5;

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.emit("ping", this.pingCount);
        this.pingCount++;

        // Verifica Ciclo + Fila:
        // Se atingiu o máximo (5) E ainda tem tarefas na fila (> 0)
        if (this.pingCount >= this.maxPings && this.taskQueue > 0) {
          this.taskQueue--; // Remove um da fila
          this.pingCount = 0; // Reseta o contador para o próximo da fila
          this.emit("pingFinished"); // Avisa que UM dos ciclos acabou

          // Verifica Fim Total:
          // Se atingiu o máximo E a fila está vazia
        } else if (this.pingCount >= this.maxPings && this.taskQueue === 0) {
          this.emit("pingFinished");
          this.stop(); // Encerra o setInterval definitivamente
        }
      }, 1000);

      // Gestão de Concorrência:
      // Se chamarem start() enquanto o motor já está rodando, apenas enfileira.
    } else if (this.intervalId) {
      this.taskQueue++;
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

const ping = new Ping();

ping.on("ping", (pingCount) => console.log(`Ping: ${pingCount + 1}`));
ping.on("pingFinished", () => console.log("Ping finalizado!"));

// O 1º start liga o motor. O 2º e 3º apenas incrementam a taskQueue.
ping.start();
ping.start();
ping.start();
