import RegraEmprestimo from "./regraEmprestimo";

class RegraPosGraduacao implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 5;
  }

  limiteEmprestimosEmAberto(): number {
    return 3;
  }
}


export default RegraPosGraduacao;