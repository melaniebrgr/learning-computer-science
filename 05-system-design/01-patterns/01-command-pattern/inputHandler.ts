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

  constructor(buttons?: Record<TButton, Command>) {
    if (buttons instanceof Object) {
      for (const button in buttons) {
        // @ts-expect-error
        if (!Object.values(BUTTON).includes(button)) {
          throw new RangeError("Invalid button key");
        }
  
        if (!(buttons[button] instanceof Command)) {
          throw new RangeError("Invalid button value");
        }
  
        this.#button[button] = buttons[button]
      }
    }
  }

  setHandler(button: TButton, command: Command) {
    if (!Object.keys(BUTTON).includes(button)) {
      throw new RangeError("Invalid button key");
    }

    if (!(command instanceof Command)) {
      throw new RangeError("Invalid button value");
    }

    this.#button[button] = command;
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