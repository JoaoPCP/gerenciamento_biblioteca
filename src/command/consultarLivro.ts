class consultarLivro implements Command {
  execute(arg: { codLivro: string }): string {
    const livro = db.acervo.find((livro) => livro.getCodigo() == arg.codLivro);
    if (!livro) {
      return "Livro não encontrado";
    }
    const reservas =
      livro.getReservas() > 0
        ? db.reservas.filter((reserva) => reserva.getLivro() == livro)
        : "Não há reservas para esse livro";
    let outputReserva = "";
    if (typeof reservas != "string") {
      let outputReserva = "";
      reservas.forEach((reserva) => {
        outputReserva += `Reserva feita por ${reserva.getUsuario()}\n`;
      });
    } else {
      outputReserva = reservas;
    }

    const exemplares = db.controleDeExemplares.filter(
      (exemplar) => exemplar.getLivro() == livro
    );
    let outputExemplares = "";
    exemplares.forEach((exemplar) => {
      outputExemplares += `Código: ${exemplar.getCodigoExemplar()} Status: ${exemplar.getStatus()}\n`;
    });

    const response = `Titulo:${livro.getTitulo()}\n
    Reservas feitas:${outputReserva}
    Exemplares:${outputExemplares}`;

    return response;
  }
}
