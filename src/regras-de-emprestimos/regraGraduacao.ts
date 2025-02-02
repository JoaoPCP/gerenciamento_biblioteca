class RegraGraduacao implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 4;
  }

  limiteEmprestimosEmAberto(): number {
    return 3;
  }
}
