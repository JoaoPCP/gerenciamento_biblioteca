import RegraProfessor from "../regras-de-emprestimos/regraProfessor";
import Observer from "./observer";
import Usuario from "./usuario";

class Professor extends Usuario implements Observer {
  private notificacoes: number;

  constructor(codigoUsuario: string, nome: string) {
    super(codigoUsuario, nome);
    this.regraEmprestimo = new RegraProfessor();
    this.notificacoes = 0;
  }

  public notificar(): void {
    this.notificacoes++;
    
  }

  public getNotificacoes(): number {
    return this.notificacoes;
  }
}

export default Professor;
