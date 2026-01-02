// Exercício 7: Crie um sistema de fila que herde de EventEmitter. A fila deve permitir
// adicionar "tarefas" (strings) e processá-las uma por vez a cada 2 segundos, emitindo um evento
// taskProcessed cada vez que uma tarefa for completada. Quando todas as tarefas forem
// processadas, emita um evento allTasksProcessed

import { EventEmitter } from "node:events";

class Queue extends EventEmitter {
  #taskList = [];
  #intervalId = null;

  addTask(task) {
    console.log(`Adicionada [${task}] à fila!`);
    this.#taskList.push(task);

    if (!this.#intervalId) {
      this.#startProcessing();
    }
  }

  #startProcessing() {
    this.#intervalId = setInterval(() => {
      if (this.#taskList.length > 0) {
        const activeTask = this.#taskList.shift();
        this.emit("taskProcessed", activeTask);
      }
      if (this.#taskList.length === 0) {
        this.#stopProcessing();
        this.emit("allTasksProcessed");
      }
    }, 2000);
  }

  #stopProcessing() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }
}

const newQueue = new Queue();

newQueue.on("taskProcessed", (task) =>
  console.log(`Tarefa [${task}] processada!`)
);

newQueue.on("allTasksProcessed", (task) =>
  console.log(`Todas as tarefas processadas! Aguardando novas...`)
);

newQueue.addTask("Lavar louças");
newQueue.addTask("Fazer compras");
newQueue.addTask("Fazer um relatório");
