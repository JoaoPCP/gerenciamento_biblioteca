import BancoDeDados from "../collections-singleton/BancoDeDados";


class registarComoObservador implements Command {
  execute(arg: { codUsuario: string; codLivro: string }) {
    const db = BancoDeDados.instance();
    const usuario = db.listaDeUsuarios.find(
      (usuario) => usuario.getCodigoUsuario() == arg.codUsuario
    );
    const livro = db.acervo.find((livro) => livro.getCodigo() == arg.codLivro);
    if (!usuario) {
      return "Usuário não encontrado";
    }
    if (!livro) {
      return "Livro não encontrado";
    }
    if (usuario instanceof Observer) {
      livro.adicionarObservador(usuario);
    }
    return "Usuário registrado como Observador";
  }
}
