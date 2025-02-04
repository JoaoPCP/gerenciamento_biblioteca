import Emprestimo from "../emprestimo-reserva/emprestimo";
import Reserva from "../emprestimo-reserva/reserva";
import Livro from "../livro-exemplar/livro";
import RegraEmprestimo from "../regras-de-emprestimos/regraEmprestimo";

abstract class Usuario {
  protected codigoUsuario: string;
  protected nome: string;
  protected regraEmprestimo!: RegraEmprestimo;
  protected emprestimosFeitos: Emprestimo[];
  protected reservasFeitas: Reserva[];

  constructor(codigoUsuario: string, nome: string) {
    this.codigoUsuario = codigoUsuario;
    this.nome = nome;
    this.emprestimosFeitos = [];
    this.reservasFeitas = [];
  }

  public guardarEmprestimo(emprestimo: Emprestimo): void {
    this.emprestimosFeitos.push(emprestimo);
  }

  public guardarReserva(reserva: Reserva): void {
    this.reservasFeitas.push(reserva);
  }

  public devolverlivro(livro: Livro): void {
    const emprestimo = this.emprestimosFeitos.find(
      (emprestimoFeito) => livro === emprestimoFeito.getLivro()
    );
    if (emprestimo) {
      emprestimo.finalizarEmprestimo();
    }
  }

  public isDevedor(): boolean {
    const hoje = new Date();
    return this.emprestimosFeitos.some(
      (emprestimoFeito) =>
        emprestimoFeito.getStatus() === "Em curso" &&
        hoje > emprestimoFeito.getDataDevolucao()
    );
  }

  public podePegarEmprestimo(): boolean {
    const emprestimosEmAberto = this.emprestimosFeitos.filter(
      (emprestimoFeito) => emprestimoFeito.getStatus() === "Em curso"
    ).length;
    return (
      emprestimosEmAberto < this.regraEmprestimo.limiteEmprestimosEmAberto()
    );
  }

  public consultaDataEmprestimo(livro: Livro): Date | null {
    const emprestimo = this.emprestimosFeitos.find(
      (emprestimoFeito) => livro === emprestimoFeito.getLivro()
    );
    return emprestimo ? emprestimo.getDataEmprestimo() : null;
  }

  public consultaDataDevolucao(livro: Livro): Date | null {
    const emprestimo = this.emprestimosFeitos.find(
      (emprestimoFeito) => livro === emprestimoFeito.getLivro()
    );
    return emprestimo ? emprestimo.getDataDevolucao() : null;
  }

  public hasEmprestimoAberto(livro: Livro): boolean {
    return this.emprestimosFeitos.some(
      (emprestimoFeito) =>
        livro === emprestimoFeito.getLivro() &&
        emprestimoFeito.getStatus() === "Em curso"
    );
  }

  public getCodigoUsuario(): string {
    return this.codigoUsuario;
  }

  public getNome(): string {
    return this.nome;
  }

  public getRegraEmprestimo(): RegraEmprestimo {
    return this.regraEmprestimo;
  }

  public getEmprestimosFeitos(): Emprestimo[] {
    return this.emprestimosFeitos;
  }

  public getReservasFeitas(): Reserva[] {
    return this.reservasFeitas;
  }
  removerReserva(reservaToRemove: Reserva): void {
    this.reservasFeitas = this.reservasFeitas.filter(
      (reserva) => reserva != reservaToRemove
    );
}

}

export default Usuario;