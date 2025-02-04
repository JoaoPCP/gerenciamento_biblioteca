import Console from "./console";
import Exemplar from "./livro-exemplar/exemplar";
import Livro from "./livro-exemplar/livro";
import Sistema from "./sistema/biblioteca";
import AlunoGraduacao from "./usuarios/alunoGraduacao";
import AlunoPosGraduacao from "./usuarios/alunoPosGraduacao";
import Professor from "./usuarios/professor";


const comunicacao = Console.getInstance();

const livro1 = new Livro("100", "Engenharia de Software", "AddisonWesley", ["Ian Sommervile"], "6", "2000");
const livro2 = new Livro("101", "UML - Guia do Usuário", "Campus", ["Grady Booch", "James Rumbaugh", "Ivar Jacobson"], "7", "2000");
const livro3 = new Livro("200", "Code Complete", "Microsoft Press", ["Steve McConnell"], "2", "2014");
const livro4 = new Livro("201", "Agile Software Development, Principles, Patterns, and Practices", "Pretince Hall", ["Robert Martin"], "1", "2002");
const livro5 = new Livro("300", "Refactoring: Improving the Design of Existing Code", "Addison-Wesley Professional", ["Martin Fowler"], "1", "1999");
const livro6 = new Livro("301", "Software Metrics: A Rigorous and Practical Approach", "CRC Press", ["Norman Fenton", "James Bieman"], "3", "2014");
const livro7 = new Livro("400", "Design Patterns: Elements of Reusable Object-Oriented Software", "Addison-Wesley Professional", ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"], "1", "1994");
const livro8 = new Livro("401", "UML Distilled: A Brief Guide to the Standard Object Modeling Language", "Addison-Wesley Professional", ["Martin Fowler"], "3", "2003");

const aluno1 = new AlunoGraduacao("123", "João da Silva");
const aluno2 = new AlunoGraduacao("789", "Pedro Paulo");
const alunopg = new AlunoPosGraduacao("456", "Luiz Fernando Rodrigues");
const professor = new Professor("100", "Carlos Lucena");

const exemplar1 = new Exemplar(livro1, "001");
const exemplar2 = new Exemplar(livro1, "002");
const exemplar3 = new Exemplar(livro2, "003");
const exemplar4 = new Exemplar(livro3, "004");
const exemplar5 = new Exemplar(livro4, "005");
const exemplar6 = new Exemplar(livro5, "006");
const exemplar7 = new Exemplar(livro5, "007");
const exemplar8 = new Exemplar(livro7, "008");
const exemplar9 = new Exemplar(livro7, "009");

const livros = [livro1, livro2, livro3, livro4, livro5, livro6, livro7, livro8];
const usuarios = [aluno1, aluno2, alunopg, professor];
const exemplares = [exemplar1, exemplar2, exemplar3, exemplar4, exemplar5, exemplar6, exemplar7, exemplar8, exemplar9];

const sistema = new Sistema(livros, exemplares, usuarios);

comunicacao.processarComando(sistema);
