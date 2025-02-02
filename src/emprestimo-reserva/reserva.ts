class Reserva {
  constructor(
    // private readonly livro: Livro,
    private readonly usuario: Usuario,
    private readonly dataReserva: Date
  ) {
    // this.livro = livro;
    this.usuario = usuario;
    this.dataReserva = new Date();
  }
  //   get getLivro(): Livro {
  //     return this.livro;
  //   }
  getUsuario(): Usuario {
    return this.usuario;
  }

  getDataReserva(): Date {
    return this.dataReserva;
  }
}
