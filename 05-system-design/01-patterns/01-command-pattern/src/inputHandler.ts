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
        this.setHandler(button, buttons[button])
      }
    }
  }

  setHandler(button: string, command: Command) {
    // @ts-expect-error
    if (!Object.values(BUTTON).includes(button)) {
      throw new RangeError(`Invalid button key '${button}'`);
    }

    if (!(command instanceof Command)) {
      throw new RangeError(`Invalid button value '${command}'`);
    }

    this.#button[button] = command;
  }

  handle(input: string) {
    this.#button[input].execute();
  }
}