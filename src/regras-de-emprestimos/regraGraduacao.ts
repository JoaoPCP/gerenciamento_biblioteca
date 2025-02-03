import RegraEmprestimo from "./regraEmprestimo";

class RegraGraduacao implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 4;
  }

  limiteEmprestimosEmAberto(): number {
    return 3;
  }
}

export default RegraGraduacao;