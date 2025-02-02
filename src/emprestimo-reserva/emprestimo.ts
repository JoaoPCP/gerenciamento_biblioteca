class Emprestimo {
  private readonly dataEmprestimo: Date;
  private readonly dataDevolucao: Date;
  constructor(
    // private readonly livro: Livro
    private readonly usuario: Usuario,
    private status: string
  ) {
    // this.livro = livro
    this.usuario = usuario;
    this.status = "Em curso";
    this.dataEmprestimo = new Date();
    this.dataDevolucao = this.calculaDevolucao();
  }
  getDataEmprestimo(): Date {
    return this.dataEmprestimo;
  }

  getDataDevolucao(): Date {
    return this.dataDevolucao;
  }

  getUsuario(): Usuario {
    return this.usuario;
  }

  getStatus(): string {
    return this.status;
  }
  finalizarEmprestimo(): void {
    this.status = "Finalizado";
  }
  calculaDevolucao(): Date {
    const dataDevolucao = this.dataEmprestimo;
    dataDevolucao.setDate(
      dataDevolucao.getDate() +
        this.usuario.getRegraEmprestimo().prazoEmprestimo()
    );
    return dataDevolucao;
  }
}
