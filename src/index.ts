import Singleton from "./collections-singleton/Singleton";
import Console from "./console";
import Sistema from "./sistema/biblioteca";

const db = Singleton.instance();
const livros = db.acervo;
const exemplares = db.controleDeExemplares;
const usuarios = db.listaDeUsuarios;

const comunicacao = Console.getInstance();

const sistema = new Sistema(livros, exemplares, usuarios);

comunicacao.processarComando(sistema);
