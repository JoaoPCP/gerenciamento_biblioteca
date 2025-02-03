class Reserva {
  private readonly dataReserva: Date;
  constructor(
    private readonly livro: Livro,
    private readonly usuario: Usuario
  ) {
    this.livro = livro;
    this.usuario = usuario;
    this.dataReserva = new Date();
  }
  getLivro(): Livro {
    return this.livro;
  }
  getUsuario(): Usuario {
    return this.usuario;
  }

  getDataReserva(): Date {
    return this.dataReserva;
  }
}
