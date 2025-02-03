import BancoDeDados from "../collections-singleton/BancoDeDados";


class consultarUsuario implements Command {
  execute(arg: { codUsuario: string }): string {
    const db = BancoDeDados.instance();
    const usuario = db.listaDeUsuarios.find(
      (usuario) => usuario.getCodigoUsuario() == arg.codUsuario
    );
    if (!usuario) {
      return "Usuario não encontrado";
    }

    let outputEmprestimos = "";
    const emprestimos = usuario.getEmprestimosFeitos();
    if (emprestimos.length > 0) {
      emprestimos.forEach((emprestimo) => {
        outputEmprestimos += `Livro: ${emprestimo.getLivro().getTitulo()}\n
        Data Do Emprestimo: ${emprestimo
          .getDataEmprestimo()
          .toLocaleString("pt-br")}\n
        Status do empréstimo: ${emprestimo.getStatus()}\n
        Data de devolução: ${emprestimo
          .getDataDevolucao()
          .toLocaleString("pt-br")}\n`;
      });
    } else {
      outputEmprestimos = "O usuário nunca realizou um empréstimo";
    }

    let outputReserva = "";
    const reserva = usuario.getReservasFeitas();
    if (reserva.length > 0) {
      reserva.forEach((reserva) => {
        outputReserva += `Livro: ${reserva.getLivro().getTitulo()}\n
      Data:${reserva.getDataReserva().toLocaleString("pt-br")}`;
      });
    } else {
      outputReserva = "O usuário não tem reservas";
    }

    const response = `Usuario:${usuario.getNome()}\n
    Emprestimos feitos:${outputEmprestimos}
    Reservas feitas:${outputReserva}\n`;

    return response;
  }
}
