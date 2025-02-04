import Observer from "../usuarios/observer";

class Livro {
  private readonly codigo: string;
  private readonly titulo: string;
  private readonly editora: string;
  private readonly autores: string[];
  private readonly edicao: string;
  private readonly anoPublicacao: string;
  private observadores: Observer[];
  private unidadesReservados: number = 0;

  constructor(
    codigo: string,
    titulo: string,
    editora: string,
    autores: string[],
    edicao: string,
    anoPublicacao: string
  ) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.editora = editora;
    this.autores = autores;
    this.edicao = edicao;
    this.anoPublicacao = anoPublicacao;
    this.observadores = [];
  }

  public adicionarObservador(observador: Observer): void {
    this.observadores.push(observador);
  }

  public removerObservador(observador: Observer): void {
    const index = this.observadores.indexOf(observador);
    if (index !== -1) {
      this.observadores.splice(index, 1);
    }
  }
  public notificarObservadores(): void {
    for (const observer of this.observadores) {
      observer.notificar();
    }
  }

  public getCodigo(): string {
    return this.codigo;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public fazerReserva(): void {
    this.unidadesReservados++;
    if (this.unidadesReservados > 2) {
      this.notificarObservadores;
    }
  }
  public removerReserva(): void {
    this.unidadesReservados--;
  }

  public getReservas(): number {
    return this.unidadesReservados;
  }
}


export default Livro;