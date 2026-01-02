// Exercício 8: Crie um sistema de log que herda de EventEmitter e registra todos os eventos
// emitidos, como login, logout e error. O sistema deve armazenar as mensagens de log e,
// ao final de cada dia (simulado por um intervalo de tempo de 5 segundos), emita um evento
// dailyLogReport com um resumo de todos os logs do dia.

import { EventEmitter } from "node:events";

function userAuthDB(userInput, passwordInput) {
  const usersData = [
    { username: "james", password: "12345" },
    { username: "clair97", password: "blackcat" },
  ];

  const currentUser = usersData.find(
    (userData) => userData.username === userInput
  );

  return !!currentUser && currentUser.password === passwordInput;
}

class EventLogger extends EventEmitter {
  dailyLogList = [];
  loggedUsers = [];
  dayCount = 0;
  timer = null;

  timestamp() {
    return new Date().toISOString();
  }

  login(userName, password) {
    if (userAuthDB(userName, password) && !this.isLoggedIn(userName)) {
      this.loggedUsers.push({
        id: this.loggedUsers.length,
        username: userName,
        password: password,
      });
      this.emit("login", userName, this.timestamp());
    } else if (this.isLoggedIn(userName)) {
      this.emit(
        "error",
        new Error(`Erro ao efetuar login para ${userName}.Usuário já logado.`),
        this.timestamp()
      );
    } else {
      this.emit(
        "error",
        new Error(
          `Erro ao efetuar login para ${userName}. Credenciais inválidas.`
        ),
        this.timestamp()
      );
    }
  }

  isLoggedIn(userName) {
    return this.loggedUsers.find((user) => user.username === userName);
  }

  logout(userName) {
    if (this.isLoggedIn(userName)) {
      const index = this.loggedUsers.indexOf(this.isLoggedIn(userName));

      this.loggedUsers.splice(index, 1);

      this.emit("logout", userName, this.timestamp());
    } else {
      this.emit(
        "error",
        new Error(
          `Erro ao efetuar logout para ${userName}. Usuário não logado.`
        ),
        this.timestamp()
      );
    }
  }

  addLog(log) {
    this.dailyLogList.push(log);
  }

  clearLogs() {
    this.dailyLogList = [];
  }

  dailyLogReport() {
    this.dayCount++;
    this.emit("dailyLogReport", this.dailyLogList.join("\n"), this.dayCount);
    this.clearLogs();
  }

  startSystem() {
    console.log("--- Sistema Iniciado ---");
    this.timer = setInterval(() => {
      this.dailyLogReport();
    }, 5000);
  }

  stopSystem() {
    clearInterval(this.timer);
    console.log("--- Sistema Finalizado ---");
  }
}

const eventLogger = new EventLogger();
eventLogger.startSystem();

eventLogger.on("login", (user, timestamp) => {
  const log = `[${timestamp}] User ${user} logged in!`;
  eventLogger.addLog(log);
});

eventLogger.on("error", (err, timestamp) => {
  const log = `[${timestamp}] ${err.message}`;
  eventLogger.addLog(log);
});

eventLogger.on("logout", (user, timestamp) => {
  const log = `[${timestamp}] User ${user} logged out!`;
  eventLogger.addLog(log);
});

eventLogger.on("dailyLogReport", (dailyLog, day) => {
  console.log(`\n============ RELATÓRIO DO DIA ${day} ============`);
  console.log(dailyLog);
  console.log("==============================================\n");
});

// Simulando 1º dia
eventLogger.login("james", "12345");
eventLogger.login("karen", "abcd");
eventLogger.login("clair97", "blackcat");
eventLogger.logout("james");

// Simulando 2º dia
setTimeout(() => {
  eventLogger.logout("james");
  eventLogger.logout("karen");
  eventLogger.login("clair97", "blackcat");
}, 6000);

setTimeout(() => {
  eventLogger.stopSystem();
}, 11000);
