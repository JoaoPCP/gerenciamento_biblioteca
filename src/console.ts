// import consultarLivro from "./command/consultarLivro";
import sistema from "./sistema/biblioteca";
import ConsultarLivro from "./command/consultarLivro";  
import ConsultarNotificacoes from "./command/consultarNotificacoes";
import consultarUsuario from "./command/consultarUsuario";
import realizarEmprestimo from "./command/realizarEmprestimo";
import RealizarReserva from "./command/realizarReserva";
import RegistarComoObservador from "./command/registrarComoObservador";
import realizarDevolucao from "./command/realizarDevolucao";
import * as readline from "readline";

class Console {
  private static instance: Console;
  private rl: readline.Interface;
  private commandMap: Map<string, Function>;

  private constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.commandMap = new Map([
      ["dev", (sistema: sistema, usuario: string, livro: string) => new realizarDevolucao(sistema).execute({ codUsuario: usuario, codLivro: livro })],
      ["res", (sistema: sistema, usuario: string, livro: string) => new RealizarReserva(sistema).execute({ codUsuario: usuario, codLivro: livro })],
      ["obs", (sistema: sistema, usuario: string, livro: string) => new RegistarComoObservador(sistema).execute({ codUsuario: usuario, codLivro: livro })],
      ["liv", (sistema: sistema, usuario: string) => new ConsultarLivro(sistema).execute(usuario)],
      ["usu", (sistema: sistema, usuario: string) => new consultarUsuario(sistema).execute(usuario)],
      ["ntf", (sistema: sistema, usuario: string) => new ConsultarNotificacoes(sistema).execute(usuario)],
      ["emp", (sistema: sistema, usuario: string, livro: string) => new realizarEmprestimo(sistema).execute({ codUsuario: usuario, codLivro: livro })],
    ]);
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

    const command = this.commandMap.get(acao);
    if (command) {
      command(sistema, primeiroCodigo, segundoCodigo);
    } else {
      this.setOutput("Comando desconhecido.");
    }

    return this.processarComando(sistema);
  }
}

export default Console;
