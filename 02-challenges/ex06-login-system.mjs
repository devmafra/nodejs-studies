// Exercício 6: Crie um sistema de login que herda de EventEmitter. O sistema deve emitir
// um evento loginAttempt toda vez que uma tentativa de login é feita. Se o usuário e senha
// forem corretos, emita o evento loginSuccess, caso contrário, loginFailure. Use um
// callback para simular uma operação assíncrona (como consultar um banco de dados) que leva
// 1 segundo.

import { EventEmitter } from "node:events";

function userAuthDB(userInput, passwordInput) {
  const usersData = [
    { username: "james", password: "123" },
    { username: "clair97", password: "blackcat" },
  ];

  const currentUser = usersData.find(
    (userData) => userData.username === userInput
  );

  return !!currentUser && currentUser.password === passwordInput;
}

class App extends EventEmitter {
  login(username, password) {
    const now = new Date().toLocaleString();

    this.emit("loginAttempt", username, now);
    setTimeout(() => {
      if (userAuthDB(username, password)) {
        this.emit("loginSuccess", username);
      } else {
        this.emit("loginFailure", username);
      }
    }, 1000);
  }
}

const app = new App();

app.on("loginAttempt", (username, now) =>
  console.log(
    `Tentativa de login iniciada... [Usuário: ${username}][Timestamp: ${now}]`
  )
);
app.on("loginSuccess", (username) =>
  console.log(`Login concluído com sucesso para ${username}!`)
);
app.on("loginFailure", (username) =>
  console.error(
    `Erro ao efetuar login para ${username}. Credenciais inválidas.`
  )
);

console.log("--- Iniciando Sistema ---");
app.login("clair97", "blackcat");
app.login("clair97", "123");
app.login("james", "blackcat");
