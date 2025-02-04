abstract class Observer {
  abstract notificar(): void;
  abstract getNotificacoes(): number;
}
export default Observer;