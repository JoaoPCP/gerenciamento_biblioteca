class Professor extends Usuario implements Observer {
    private notificacoes: number;

    constructor(codigoUsuario: string, nome: string) {
        super(codigoUsuario, nome);
        // this.regraEmprestimo = new RegraProfessor();
        this.notificacoes = 0;
    }

    public notificar(): void {
        this.notificacoes++;
    }

    public getNotificacoes(): number {
        return this.notificacoes;
    }
}