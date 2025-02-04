import Sistema from "../sistema/biblioteca";
import Command from "./command";


class realizarEmprestimo implements Command {
  private sistema: Sistema;

  constructor(sistema: Sistema) {
    this.sistema = sistema;
  }

  public execute(arg: { codUsuario: string; codLivro: string }): void {
    this.sistema.executarEmprestimo(arg.codUsuario, arg.codLivro);
  }
}

export default realizarEmprestimo;
