import RegraEmprestimo from "./regraEmprestimo";

class RegraProfessor implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 8;
  }

  limiteEmprestimosEmAberto(): number {
    return 0;
  }
}

export default RegraProfessor;