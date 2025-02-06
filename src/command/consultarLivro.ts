import Sistema from "../sistema/biblioteca";
import Command from "./command";
import Console from "../console";
import Usuario from "../usuarios/usuario";
import Professor from "../usuarios/professor";

class ConsultarNotificacoes implements Command {
  private sistema: Sistema;
  private codigoUsuario: string;
  private console: Console = Console.getInstance();

  constructor(sistema: Sistema, codigoUsuario: string) {
    this.sistema = sistema;
    this.codigoUsuario = codigoUsuario;
  }

  public execute(): void {
    const usuario = this.sistema.getUsuarioByCodigo(this.codigoUsuario)

    if (!usuario) {
      this.console.setOutput("Usuário não encontrado.");
      return;
    }

    const professor = usuario as Professor;
    const numeroNotificacoes = professor.getNotificacoes();
    this.console.setOutput(`O professor ${professor.getNome()} foi notificado ${numeroNotificacoes} vezes.`);
  }
}

export default ConsultarNotificacoes;
