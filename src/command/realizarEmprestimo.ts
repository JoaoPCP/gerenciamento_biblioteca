class realizarEmprestimo implements Command {
  execute(arg: { codLivro: string; codUsuario: string }) {
    const db = BancoDeDados.instance();
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
    if (usuario.isDevedor()) {
      return "O usuário não pode realizar empréstimos pois possui emprestimos atrasados";
    }
    if (!exemplaresLivro) {
      return "Não há exemplares disponíveis para esse livro";
    }
    if (livro.getReservas() > exemplaresLivro.length) {
      return "Os exemplares presentes estão todos reservados";
    }
    if (
      usuario.getEmprestimosFeitos().length >=
      usuario.getRegraEmprestimo().limiteEmprestimosEmAberto()
    ) {
      return "O usuário já está com o numéro máximo de emprestimos feitos permitidos";
    }
    const exemplarParaEmprestimo = exemplaresLivro[0];
    exemplarParaEmprestimo.emprestar(usuario);
    usuario.guardarEmprestimo(new Emprestimo(livro, usuario, "em Curso"));
    return "Empréstimo realizado com sucesso";
  }
}
