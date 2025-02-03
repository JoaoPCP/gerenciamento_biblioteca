import { deflate } from "zlib";

interface RegraEmprestimo {
  prazoEmprestimo(): number;
  limiteEmprestimosEmAberto(): number;
}

export default RegraEmprestimo;