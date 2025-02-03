class RealizarEmprestimo implements Command {
  execute(arg: { codUsuario: string; codLivro: string }) {
    const usuario = db.listaDeUsuarios.find(
      (user) => user.getCodigoUsuario() == arg.codUsuario
    );

    const livro = db.acervo.find((livro) => livro.getCodigo() == arg.codLivro);

    const exemplaresLivro = db.controleDeExemplares.filter(
      (exemplar) =>
        exemplar.getLivro() == livro && exemplar.getStatus() == "Disponivel"
    );

    if (!usuario) {
      return "Usuário não encontrado";
    }
    if (!livro) {
      return "Livro não encontrado";
    }
    if (
      usuario.getEmprestimosFeitos().length >=
      usuario.getRegraEmprestimo().limiteEmprestimosEmAberto()
    ) {
      return "O usuário já está com o numéro máximo de emprestimos feitos permitidos";
    }
    if (usuario.isDevedor()) {
      return "O usuário não pode realizar empréstimos pois possui emprestimos atrasados";
    }
    if (!exemplaresLivro) {
      return "Não há exemplares disponíveis para esse livro";
    }
    if (livro.getReservas() > exemplaresLivro.length) {
      return "Os exemplares presentes estão todos reservados";
    }

    const reservaExistente = usuario.getReservasFeitas().find((reserva) => {
      reserva.getLivro() == livro;
    });
    if (reservaExistente) {
      usuario.removerReserva(reservaExistente);
      db.removerReserva(reservaExistente);
    }

    const exemplarParaEmprestimo = exemplaresLivro[0];
    exemplarParaEmprestimo.emprestar(usuario);
    usuario.guardarEmprestimo(new Emprestimo(livro, usuario, "em Curso"));
    return "Empréstimo realizado com sucesso";
  }
}
