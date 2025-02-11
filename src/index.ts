import Console from "./console";
import Exemplar from "./livro-exemplar/exemplar";
import Livro from "./livro-exemplar/livro";
import Sistema from "./sistema/biblioteca";
import AlunoGraduacao from "./usuarios/alunoGraduacao";
import AlunoPosGraduacao from "./usuarios/alunoPosGraduacao";
import Professor from "./usuarios/professor";
import BancoDeDados from "./collections-singleton/BancoDeDados";


const comunicacao = Console.getInstance();
const db = BancoDeDados.getInstance();

const livros = db.acervo;
const usuarios = db.listaDeUsuarios;
const exemplares = db.controleDeExemplares;

const sistema = new Sistema(livros, exemplares, usuarios);

comunicacao.processarComando(sistema);
