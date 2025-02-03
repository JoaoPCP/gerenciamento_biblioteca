class realizarReserva implements Command {
  execute(arg: { codUsuario: string; codLivro: string }): string {
    const usuario = db.listaDeUsuarios.find(
      (user) => user.getCodigoUsuario() == arg.codUsuario
    );

    const livro = db.acervo.find((livro) => livro.getCodigo() == arg.codLivro);

    if (!usuario) {
      return "Usuário não encontrado";
    }
    if (!livro) {
      return "Livro não encontrado";
    }
    if (usuario.getReservasFeitas().length > 2) {
      return "O usuário ja tem o número máximo de reservas";
    }
    usuario.guardarReserva(new Reserva(livro, usuario));
    return "Reserva realizada com sucesso!";
  }
}
