import { Command } from './Command'; 
import { BUTTON, TButton } from './button';

export class InputHandler {
  #button = {
    [BUTTON.W]: new Command(() => {}),
    [BUTTON.S]: new Command(() => {}),
    [BUTTON.A]: new Command(() => {}),
    [BUTTON.D]: new Command(() => {}),
  }

  constructor(buttons?: Record<TButton, Command>) {
    if (buttons instanceof Object) {
      for (const button in buttons) {
        // @ts-expect-error
        if (!Object.values(BUTTON).includes(button)) {
          throw new RangeError("Invalid button type");
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
      throw new RangeError("Invalid button value");
    }
    this.#button[button] = command;
  }

  handle(input: string) {
    if (input === BUTTON.W) this.#button.w.execute();
    else if (input === BUTTON.S) this.#button.s.execute();
    else if (input === BUTTON.A) this.#button.a.execute();
    else if (input === BUTTON.D) this.#button.d.execute();
  }
}