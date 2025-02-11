import RegraEmprestimo from "./regraEmprestimo";

class RegraGraduacao implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 4;
  }

  limiteEmprestimosEmAberto(): number {
    return 2;
  }
}

export default RegraGraduacao;