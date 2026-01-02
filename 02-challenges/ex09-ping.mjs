// Exercício 9: Crie um EventEmitter que emite o evento ping a cada segundo. O evento ping
// deve ser emitido no máximo 5 vezes. Após a quinta emissão, o processo deve ser finalizado
// emitindo um evento pingFinished.

import { EventEmitter } from "node:events";

class Ping extends EventEmitter {
  pingCount = 1;
  intervalId = null;
  taskQueue = 0;

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.emit("ping", this.pingCount);
        this.pingCount++;

        if (this.pingCount > 5 && this.taskQueue > 0) {
          this.taskQueue--;
          this.pingCount = 1;
          this.emit("pingFinished");
        } else if (this.pingCount > 5 && this.taskQueue === 0) {
          this.emit("pingFinished");
          this.stop();
        }
      }, 1000);
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

ping.on("ping", (pingCount) => console.log("Ping: " + pingCount));
ping.on("pingFinished", () => console.log("Ping finalizado!"));

ping.start();
ping.start();
ping.start();
