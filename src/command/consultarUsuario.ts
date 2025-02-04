import Sistema from "../sistema/biblioteca";
import Command from "./command";


class consultarUsuario implements Command {
  private sistema: Sistema;

  constructor(sistema: Sistema) {
    this.sistema = sistema;
  }

  public execute(usuCode: any): void {
    this.sistema.consultarUsuario(usuCode);

  }
}

export default consultarUsuario;


