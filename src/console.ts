// import consultarLivro from "./command/consultarLivro";
import sistema from "./sistema/biblioteca";
import * as readline from "readline";


class Console {
  private static instance: Console;
  private rl: readline.Interface;

  private constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public static getInstance(): Console {
    if (!Console.instance) {
      Console.instance = new Console();
    }
    return Console.instance;
  }

  public getInput(): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question("Digite um comando: ", (answer) => {
        resolve(answer);
      });
    });
  }

  public setOutput(message: string): void {
    console.log(message);
  }

  public async processarComando(sistema: sistema): Promise<void> {
    const comando = await this.getInput();
    const partes = comando.split(" ");

    if (comando === "sai") {
      this.setOutput("Sistema encerrado.");
      this.rl.close();
      process.exit(0);
    }

    if (partes.length < 2) {
      this.setOutput("Comando inválido.");
      return this.processarComando(sistema);
    }

    const acao = partes[0];
    const primeiroCodigo = partes[1];
    const segundoCodigo = partes.length > 2 ? partes[2] : null;

    if (!primeiroCodigo) {
      this.setOutput("Usuário não informado.");
      return this.processarComando(sistema);
    }

    switch (acao) {
      case "dev":
        if (segundoCodigo) {
          sistema.executarDevolucao(primeiroCodigo, segundoCodigo);
        } else {
          this.setOutput("Código de devolução não informado.");
        }
        break;
      case "res":
        if (segundoCodigo) {
          sistema.executarReserva(primeiroCodigo, segundoCodigo);
        } else {
          this.setOutput("Código de reserva não informado.");
        }
        break;
      case "obs":
        if (segundoCodigo) {
          sistema.cadastraObservador(primeiroCodigo, segundoCodigo);
        } else {
          this.setOutput("Observador não informado.");
        }
        break;
      case "liv":
        sistema.consultaLivro(primeiroCodigo);
        break;
      case "usu":
        sistema.consultaProfessor(primeiroCodigo);
        break;
      case "ntf":
        sistema.consultaProfessor(primeiroCodigo);
        break;
      case "emp":
        if (segundoCodigo) {
          sistema.executarEmprestimo(primeiroCodigo, segundoCodigo);
        } else {
          this.setOutput("Código de empréstimo não informado.");
        }
        break;
      default:
        this.setOutput("Comando desconhecido.");
    }
  

    return this.processarComando(sistema);
  }
}

export default Console;
