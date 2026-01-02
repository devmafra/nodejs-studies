// Exercício 10: Crie um programa Node.js que leia o conteúdo de um arquivo de texto e, ao
// terminar de ler, emita um evento fileReadSuccess com o conteúdo lido. Em seguida,
// escreva esse conteúdo em um novo arquivo e, ao finalizar a escrita, emita um evento
// fileWriteSuccess.

import { EventEmitter } from "node:events";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

class FileHandler extends EventEmitter {
  async readFile(file) {
    try {
      const fileContent = await readFile(file, "utf-8");
      this.emit("fileReadSuccess", path.basename(file), fileContent);
      return fileContent;
    } catch (error) {
      this.emit("error", new Error("Erro ao ler o arquivo: "), error);
      throw error;
    }
  }

  async writeFile(destinationFile, content) {
    try {
      await writeFile(destinationFile, content);
      this.emit("fileWriteSuccess", path.basename(destinationFile));
    } catch (error) {
      this.emit("error", new Error("Erro ao escrever o arquivo: "), error);
      throw error;
    }
  }
  async copyFile(source, destination) {
    try {
      const fileContent = await this.readFile(source);

      if (fileContent) {
        await this.writeFile(destination, fileContent);
      }
    } catch (error) {}
  }
}

const fileHandler = new FileHandler();
// -------------------------------------------------------------
fileHandler.on("fileReadSuccess", (file, fileContent) => {
  console.log(`[READ] Arquivo ${file} lido.`);
  console.log(
    `\n===== Conteúdo: =====\n${fileContent}.\n=====================\n`
  );
});

fileHandler.on("fileWriteSuccess", (file) => {
  console.log(`[WRITE] Arquivo ${file} salvo com sucesso!`);
});

fileHandler.on("error", (msg, err) => {
  console.error(`[ERROR] ${msg}: ${err.message}`);
});
// -------------------------------------------------------------
fileHandler.copyFile("./textFile.txt", "./textFile_copy.txt");
