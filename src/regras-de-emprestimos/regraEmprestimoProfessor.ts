class RegraEmprestimoProfessor implements RegraEmprestimo {
  prazoEmprestimo(): number {
    return 8;
  }

  limiteEmprestimosEmAberto(): number {
    return 0;
  }
}
