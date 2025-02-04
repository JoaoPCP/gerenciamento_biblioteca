
import Sistema from "../sistema/biblioteca";
import Command from "./command";


class ConsultarLivro implements Command {
  private sistema: Sistema;

  constructor(sistema: Sistema) {
    this.sistema = sistema;
  }

  public execute(codLivro: any): void {
    this.sistema.consultaLivro(codLivro);
  }

}

export default ConsultarLivro;