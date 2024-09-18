import { Command } from './command'; 
import { BUTTON, TButton } from './button';

export class KeyboardInputHandler {
  #button = {
    [BUTTON.W]: new Command(),
    [BUTTON.S]: new Command(),
    [BUTTON.A]: new Command(),
    [BUTTON.D]: new Command(),
    [BUTTON.Q]: new Command(),
  }

  #validatedButton(button: string) {
    // @ts-expect-error
    if (!Object.values(BUTTON).includes(button)) {
      throw new RangeError("Invalid button key");
    }
    return button as TButton
  }

  #validatedCommand(command: unknown) {
    if (!(command instanceof Command)) {
      throw new RangeError("Invalid button value");
    }
    return command as Command;
  }

  constructor(buttons?: Record<string, unknown>) {
    if (buttons instanceof Object) {
      for (const button in buttons) {
        const vButton = this.#validatedButton(button);
        const vCommand = this.#validatedCommand(buttons[vButton])
        this.#button[vButton] = vCommand
      }
    }
  }

  setHandler(button: TButton, command: Command) {
    const vButton = this.#validatedButton(button);
    const vCommand = this.#validatedCommand(command)
    this.#button[vButton] = vCommand;
  }

  handle(input: string) {
    switch (input) {
      case BUTTON.W:
        this.#button.w.execute();
        break;
      case BUTTON.S:
        this.#button.s.execute();
        break;
      case BUTTON.A:
        this.#button.a.execute();
        break;
      case BUTTON.D:
        this.#button.d.execute();
        break;
    }
  }
}