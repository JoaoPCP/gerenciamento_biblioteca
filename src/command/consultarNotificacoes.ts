import BancoDeDados from "../collections-singleton/BancoDeDados";

class ConsultarNotificacoes implements Command {
  execute(arg: { obsCode: string }): string {
    const db = BancoDeDados.instance();
    const usuario = db.listaDeUsuarios.find((usuario) => {
      usuario.getCodigoUsuario() == arg.obsCode;
    });
    if (!usuario) {
      return "Usuario não foi encontrado";
    }
    if (usuario instanceof Observer) {
      return `Usuario: ${usuario.getNome()}\n
      Notificações recebidas: ${usuario.getNotificacoes()}`;
    }
    return "O usuário não é um observador, logo não possuiu notificações";
  }
}
