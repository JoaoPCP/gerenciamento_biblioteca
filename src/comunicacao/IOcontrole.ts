export class IOControle {
  static controle: IOControle;
  private constructor() {
    console.log("Sistema Iniciado");
  }
  static instance() {
    if (!this.controle) {
      this.controle = new IOControle();
    }
    return this.controle;
  }
  readCode(input: string): void {
    let command: Command;
    let arg: object;
    const req = input.split(" ");
    const actionCode = req[0];
    switch (actionCode) {
      case "emp":
        if (req.length < 3) {
          console.log("Argumentos insuficientes para realização da ação");
          return;
        }
        arg = {
          codUsuario: req[1],
          codLivro: req[2],
        };
        command = new RealizarEmprestimo();
        break;

      // case "dev":
      case "res":
        if (req.length < 3) {
          console.log("Argumentos insuficientes para realização da ação");
          return;
        }
        arg = {
          codUsuario: req[1],
          codLivro: req[2],
        };
        command = new RealizarReserva();
        break;
      case "obs":
        if (req.length < 3) {
          console.log("Argumentos insuficientes para realização da ação");
          return;
        }
        arg = {
          codUsuario: req[1],
          codLivro: req[2],
        };
        command = new RegistrarComoObservador();
        break;
    }
    command.execute(arg);
  }
}
