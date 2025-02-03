import RegraPosGraduacao from "../regras-de-emprestimos/regraPosGraduacao";
import Usuario from "./usuario";

class AlunoPosGraduacao extends Usuario {
  regraEmprestimo: RegraPosGraduacao;
  constructor(codigoUsuario: string, nome: string) {
    super(codigoUsuario, nome);
    this.regraEmprestimo = new RegraPosGraduacao();
  }
}

export default AlunoPosGraduacao;