interface TCommand {
  execute: () => void;
  undo: () => void;
}

export class Command implements TCommand {
  execute() {}
  undo() {}
}

export class MoveLeftCommand extends Command implements TCommand {
  #actor: any;
  constructor(actor) {
    super();
    this.#actor = actor
  }
  execute() {
    this.#actor.moveLeft();
  }
  undo() {
    this.#actor.moveRight();
  }
}

export class MoveRightCommand extends Command implements TCommand {
  #actor: any;
  constructor(actor) {
    super();
    this.#actor = actor
  }
  execute() {
    this.#actor.moveRight();
  }
  undo() {
    this.#actor.moveLeft();
  }
}

export class MoveForwardCommand extends Command implements TCommand {
  #actor: any;
  constructor(actor) {
    super();
    this.#actor = actor
  }
  execute() {
    this.#actor.moveForward();
  }
  undo() {
    this.#actor.moveBackward();
  }
}

export class MoveBackwardCommand extends Command implements TCommand {
  #actor: any;
  constructor(actor) {
    super();
    this.#actor = actor
  }
  execute() {
    this.#actor.moveBackward();
  }
  undo() {
    this.#actor.moveForward();
  }
}