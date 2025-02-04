import Usuario from "../usuarios/usuario";
import Livro from "./livro";

class Exemplar {
    private readonly livro: Livro;
    private readonly codigoExemplar: string;
    private status: string;
    private detentor: Usuario | null;

    constructor(livro: Livro, codigoExemplar: string) {
        this.livro = livro;
        this.codigoExemplar = codigoExemplar;
        this.status = "Disponivel";
        this.detentor = null;
    }

    public emprestar(usuario: Usuario): void {
        this.status = "Emprestado";
        this.detentor = usuario;
    }

    public devolver(): void {
        this.status = "Disponivel";
        this.detentor = null;
    }

    public getDetentor(): Usuario | null {
        return this.detentor;
    }

    public getStatus(): string {
        return this.status;
    }

    public getCodigoExemplar(): string {
        return this.codigoExemplar;
    }

    public getLivro(): Livro {
        return this.livro;
    }

    public isEmprestado(): boolean {
        return this.status === "Emprestado";
    }
}

export default Exemplar;