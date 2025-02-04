import Sistema from "../sistema/biblioteca";
import Command from "./command";

class ConsultarNotificacoes implements Command {
  private sistema: Sistema;

  constructor(sistema: Sistema) {
    this.sistema = sistema;
  }

  public execute(obsCode: any): void {
    this.sistema.consultarProfessor(obsCode);

  }
}

export default ConsultarNotificacoes;