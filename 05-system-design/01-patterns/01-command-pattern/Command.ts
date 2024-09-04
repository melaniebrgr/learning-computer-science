export class Command {
  constructor(private action: () => void) {}

  execute() {
    this.action();
  }
}