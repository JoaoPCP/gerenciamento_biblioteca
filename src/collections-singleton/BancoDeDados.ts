import Reserva from "../emprestimo-reserva/reserva";
import Professor from "../usuarios/professor";
import AlunoGraduacao from "../usuarios/alunoGraduacao";
import Usuario from "../usuarios/usuario";
import AlunoPosGraduacao from "../usuarios/alunoPosGraduacao";
import Livro from "../livro-exemplar/livro";
import Exemplar from "../livro-exemplar/exemplar";

class BancoDeDados {
  static _instance: BancoDeDados;
  private readonly livros: Livro[];
  private readonly usuarios: Usuario[];
  private readonly exemplares: Exemplar[];


  private constructor() {
    this.livros = [
      new Livro(
        "100",
        "Engenharia de Software",
        "Addison Wesley",
        ["Ian Sommerville"],
        "6ª",
        "2000"
      ),
      new Livro(
        "101",
        "UML - Guia do Usuário",
        "Campus",
        ["Grady Booch", "James Rumbaugh", "Ivar Jacobson"],
        "7ª",
        "2000"
      ),
      new Livro(
        "200",
        "Code Complete",
        "Microsoft Press",
        ["Steve McConnell"],
        "2ª",
        "2014"
      ),
      new Livro(
        "201",
        "Agile Software Development, Principles, Patterns and Practices",
        "Prentice Hall",
        ["Robert Martin"],
        "1ª",
        "2002"
      ),
      new Livro(
        "300",
        "Refactoring: Improving the Design of Existing Code",
        "Addison Wesley Professional",
        ["Martin Fowler"],
        "1ª",
        "1999"
      ),
      new Livro(
        "301",
        "Software Metrics: A rigorous and Practical Approach",
        "CRC Press",
        ["Norman Fenton", "James Bieman"],
        "3ª",
        "2014"
      ),
      new Livro(
        "400",
        "Design Patterns: Element of Reusable Object-Oriented Software",
        "Addison Wesley Professional",
        ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
        "1ª",
        "1994"
      ),
      new Livro(
        "401",
        "UML Distilled: A Brief Guide to the Standard Object Modeling Language",
        "Addison Wesley Professional",
        ["Martin Fowler"],
        "3ª",
        "2003"
      ),
    ];
    this.usuarios = [
      new AlunoGraduacao("123", "João da Silva"),
      new AlunoPosGraduacao("456", "Luiz Fernando Rodrigues"),
      new AlunoGraduacao("789", "Pedro Paulo"),
      new Professor("100", "Carlos Lucena"),
    ];
    this.exemplares = [
      new Exemplar(this.livros.find((l) => l.getCodigo() === "100")!, "01"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "100")!, "02"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "101")!, "03"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "200")!, "04"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "201")!, "05"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "300")!, "06"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "400")!, "07"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "400")!, "08"),
      new Exemplar(this.livros.find((l) => l.getCodigo() === "400")!, "09"),
    ];
  }
  public static getInstance(): BancoDeDados {
    if (!BancoDeDados._instance) {
      BancoDeDados._instance = new BancoDeDados();
    }
    return BancoDeDados._instance;
  }

  get acervo(): Livro[] {
    return this.livros;
  }

  get listaDeUsuarios(): Usuario[] {
    return this.usuarios;
  }

  get controleDeExemplares(): Exemplar[] {
    return this.exemplares;
  }
}

export default BancoDeDados;
