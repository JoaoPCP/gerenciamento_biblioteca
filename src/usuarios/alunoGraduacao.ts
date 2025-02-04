import RegraGraduacao from "../regras-de-emprestimos/regraGraduacao";
import Usuario from "./usuario";

class AlunoGraduacao extends Usuario {
  constructor(codigoUsuario: string, nome: string) {
    super(codigoUsuario, nome);
    this.regraEmprestimo = new RegraGraduacao();
  }
}


export default AlunoGraduacao;