class regraPosGraduacao implements regraEmprestimo {
  prazoEmprestimo(): number {
    return 5;
  }

  limiteEmprestimosEmAberto(): number {
    return 3;
  }
}
