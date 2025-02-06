import Emprestimo from "../emprestimo-reserva/emprestimo";
import Reserva from "../emprestimo-reserva/reserva";
import Professor from "../usuarios/professor";
import Usuario from "../usuarios/usuario";
import Console from "../console";
import Exemplar from "../livro-exemplar/exemplar";
import Livro from "../livro-exemplar/livro";
import Observer from "../usuarios/observer";

class Sistema {
  private livros: Livro[];
  private exemplares: Exemplar[];
  private usuarios: Usuario[];
  private reservas: Reserva[];
  private console: Console = Console.getInstance();

  constructor(livros: Livro[], exemplares: Exemplar[], usuarios: Usuario[]) {
    this.livros = livros;
    this.exemplares = exemplares;
    this.usuarios = usuarios;
    this.reservas = [];
  }

  private getUsuarioByCodigo(codigoUsuario: string): Usuario | null {
    return (
      this.usuarios.find(
        (usuario) => usuario.getCodigoUsuario() === codigoUsuario
      ) || null
    );
  }

  private getLivroByCodigo(codigoLivro: string): Livro | null {
    return (
      this.livros.find((livro) => livro.getCodigo() === codigoLivro) || null
    );
  }

  private getExemplaresByLivro(livro: Livro): Exemplar[] {
    return this.exemplares.filter((exemplar) => exemplar.getLivro() === livro);
  }

  public executarEmprestimo(codigoUsuario: string, codigoLivro: string): void {
    const usuario = this.getUsuarioByCodigo(codigoUsuario);
    if (!usuario) {
      this.console.setOutput("Usuário não encontrado.");
      return;
    }

    const livro = this.getLivroByCodigo(codigoLivro);
    if (!livro) {
      this.console.setOutput("Livro não encontrado.");
      return;
    }

    let reservasLivro = 0;
    let reservaRemover: Reserva | null = null;

    for (const reserva of this.reservas) {
      if (reserva.getLivro() === livro) {
        reservasLivro++;
        if (!reservaRemover && reserva.getUsuario() === usuario) {
          reservaRemover = reserva;
        }
      }
    }

    let exemplarDisponivel: Exemplar | null = null;
    for (const exemplar of this.getExemplaresByLivro(livro)) {
      if (exemplar.getStatus() === "Disponivel") {
        exemplarDisponivel = exemplar;
        break;
      }
    }

    if (!exemplarDisponivel) {
      this.console.setOutput(
        `Empréstimo falhou. Não há exemplares disponíveis para o livro: ${livro.getTitulo()}`
      );
    } else if (usuario.isDevedor()) {
      this.console.setOutput(
        "Empréstimo falhou. O usuário está com livro em atraso."
      );
    } else if (usuario instanceof Professor) {
      if (reservaRemover) {
        this.reservas = this.reservas.filter(
          (reserva) => reserva !== reservaRemover
        );
        usuario.removerReserva(reservaRemover);
        console.log(usuario.getReservasFeitas());
      }
      exemplarDisponivel.emprestar(usuario);
      usuario.guardarEmprestimo(new Emprestimo(livro, usuario));
      this.console.setOutput(
        `Empréstimo realizado com sucesso. Usuário: ${usuario.getNome()}, Livro: ${livro.getTitulo()}`
      );
    } else {
      if (!usuario.podePegarEmprestimo()) {
        this.console.setOutput(
          "Empréstimo falhou. O usuário já está com o limite de empréstimos em aberto."
        );
      } else if (
        !reservaRemover &&
        reservasLivro >= this.getExemplaresByLivro(livro).length
      ) {
        this.console.setOutput(
          "Empréstimo falhou. O número de Exemplares disponíveis é menor que o número de reservas e o usuário não tem uma reserva."
        );
      } else if (usuario.hasEmprestimoAberto(livro)) {
        this.console.setOutput(
          `Empréstimo falhou. O usuário já está com um empréstimo do Livro: ${livro.getTitulo()}`
        );
      } else {
        if (reservaRemover) {
          this.reservas = this.reservas.filter(
            (reserva) => reserva !== reservaRemover
          );
          usuario.removerReserva(reservaRemover);
        }
        exemplarDisponivel.emprestar(usuario);
        usuario.guardarEmprestimo(new Emprestimo(livro, usuario));
        this.console.setOutput(
          `Empréstimo realizado com sucesso. Usuário: ${usuario.getNome()}, Livro: ${livro.getTitulo()}`
        );
      }
    }
  }

  public executarReserva(codigoUsuario: string, codigoLivro: string): void {
    const usuario = this.getUsuarioByCodigo(codigoUsuario);
    if (!usuario) {
      this.console.setOutput("Usuário não encontrado.");
      return;
    }

    const livro = this.getLivroByCodigo(codigoLivro);
    if (!livro) {
      this.console.setOutput("Livro não encontrado.");
      return;
    }

    for (const reserva of this.reservas) {
      if (reserva.getLivro() === livro && reserva.getUsuario() === usuario) {
        this.reservas.splice(this.reservas.indexOf(reserva), 1);
        break;
      }
    }

    let reservasSimutaneas = 0;

    for (const reserva of this.reservas) {
      if (reserva.getLivro() === livro) {
        reservasSimutaneas++;
      }
    }

    if (usuario.getReservasFeitas().length === 3) {
      this.console.setOutput(
        `Reserva falhou. O usuário ${usuario.getNome()} já tem 3 reservas ativas.`
      );
      return;
    }

    if (reservasSimutaneas + 1 > 2) {
      livro.notificarObservadores();
    }

    const novaReserva = new Reserva(livro, usuario);
    this.reservas.push(novaReserva);
    usuario.guardarReserva(novaReserva);
    this.console.setOutput(
      `Reserva realizada com sucesso. Usuário: ${usuario.getNome()}, Livro: ${livro.getTitulo()}`
    );
  }

  public executarDevolucao(codigoUsuario: string, codigoLivro: string): void {
    const usuario = this.getUsuarioByCodigo(codigoUsuario);
    if (!usuario) {
      this.console.setOutput("Usuario não encontrado.");
      return;
    }

    const livro = this.getLivroByCodigo(codigoLivro);
    if (!livro) {
      this.console.setOutput("Livro não encontrado.");
      return;
    }

    const exemplar = this.getExemplaresByLivro(livro).find(
      (exemplar) => exemplar.getDetentor() === usuario
    );
    if (exemplar) {
      exemplar.devolver();
      usuario.devolverlivro(livro);
      this.console.setOutput(
        `Devolução realizada com sucesso. Usuário: ${usuario.getNome()}, Livro: ${livro.getTitulo()}`
      );
    } else {
      this.console.setOutput(
        `Devolução falhou. Não há empréstimo em aberto para o usuário: ${usuario.getNome()} e livro: ${livro.getTitulo()}`
      );
    }
  }

  public cadastraObservador(codigoUsuario: string, codigoLivro: string): void {
    const usuario = this.getUsuarioByCodigo(codigoUsuario);
    if (!usuario) {
      this.console.setOutput("Usuario não encontrado.");
      return;
    }

    const livro = this.getLivroByCodigo(codigoLivro);
    if (!livro) {
      this.console.setOutput("Livro não encontrado.");
      return;
    }
    const professor = usuario as Professor;
    livro.adicionarObservador(professor);
    this.console.setOutput(
      `Observador ${usuario.getNome()} cadastrado com sucesso no livro: ${livro.getTitulo()}`
    );
  }

  public consultaLivro(codigoLivro: string): void {
    const livro = this.getLivroByCodigo(codigoLivro);

    if (!livro) {
      this.console.setOutput("Livro não encontrado.");
      return;
    }

    this.console.setOutput(`\nTítulo: ${livro.getTitulo()}`);

    const usuariosReservaram: Usuario[] = [];
    for (const reserva of this.reservas) {
      if (reserva.getLivro() === livro) {
        usuariosReservaram.push(reserva.getUsuario());
      }
    }

    this.console.setOutput(
      `Quantidade de Reservas: ${usuariosReservaram.length}`
    );

    if (usuariosReservaram.length > 0) {
      this.console.setOutput("Usuários que realizaram reservas:");
      for (const usuario of usuariosReservaram) {
        this.console.setOutput(`- ${usuario.getNome()}`);
      }
    }

    this.console.setOutput("Exemplares:");
    for (const exemplar of this.getExemplaresByLivro(livro)) {
      let texto = `- Código: ${exemplar.getCodigoExemplar()}\n Status: ${exemplar.getStatus()}\n`;

      if (exemplar.getStatus() === "Emprestado") {
        const detentor = exemplar.getDetentor();

        if (detentor !== null) {
          texto +=
            `Atualmente com o usuário: ${detentor.getNome()}\n` +
            `Data de Empréstimo: ${detentor.consultaDataEmprestimo(livro)}\n` +
            `Data de Devolução: ${detentor.consultaDataDevolucao(livro)}\n`;
        }
      }

      this.console.setOutput(texto);
    }
  }

  public consultarUsuario(codigoUsuario: string): void {
    let output = "";

    const usuario = this.getUsuarioByCodigo(codigoUsuario);
    if (!usuario) {
      return this.console.setOutput("Usuário não encontrado");
    }

    output += "Empréstimos:\n\n";
    for (const emprestimo of usuario.getEmprestimosFeitos()) {
      const dataDevolucao = emprestimo.getDataDevolucao()
        ? emprestimo.getDataDevolucao().toString()
        : "Não definida";
      output += `Livro: ${emprestimo
        .getLivro()
        .getTitulo()}\nData do Empréstimo: ${emprestimo.getDataEmprestimo()}\nStatus: ${emprestimo.getStatus()}\nData de Devolução: ${dataDevolucao}\n\n`;
    }

    output += "Reservas:\n\n";
    for (const reserva of usuario.getReservasFeitas()) {
      output += `Livro: ${reserva
        .getLivro()
        .getTitulo()}\nData da Reserva: ${reserva.getDataReserva()}\n\n`;
    }

    this.console.setOutput(output.trim());
  }

  public consultarProfessor(codigoUsuario: string): void {
    const usuario = this.usuarios.find(
      (usuario) => usuario.getCodigoUsuario() === codigoUsuario
    );
    if (!usuario) {
      return;
    } else {
      const professor = usuario as Professor;
      const numeroNotificacoes = professor.getNotificacoes();
      this.console.setOutput(
        `O professor ${professor.getNome()} foi notificado ${numeroNotificacoes} vezes.`
      );
    }
  }
}
export default Sistema;
