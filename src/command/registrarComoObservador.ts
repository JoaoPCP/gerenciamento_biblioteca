import Sistema from "../sistema/biblioteca";
import Command from "./command";


class RegistarComoObservador implements Command {
  private sistema: Sistema;

  constructor(sistema: Sistema) {
    this.sistema = sistema;
  }

  public execute(arg: { codUsuario: string; codLivro: string }): void {
    this.sistema.cadastraObservador(arg.codUsuario, arg.codLivro);
  }
}

export default RegistarComoObservador;
