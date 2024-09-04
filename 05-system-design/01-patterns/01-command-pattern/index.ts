// @ts-expect-error
import * as readline from 'node:readline/promises';
// @ts-expect-error
import { stdin, stdout } from 'node:process';
import { InputHandler } from './InputHandler';
import { Command } from './Command';
import { BUTTON  } from './button';

const rl = readline.createInterface({ input: stdin, output: stdout });

let input;

const actor = {
  moveForward() {
    console.log('Move forward')
  },
  moveBackward() {
    console.log('Move backward')
  },
  moveLeft() {
    console.log('Move left')
  },
  moveRight() {
    console.log('Move right')
  }
}

const inputHandler = new InputHandler({
  [BUTTON.A]: new Command(actor.moveLeft),
  [BUTTON.D]: new Command(actor.moveRight),
  [BUTTON.W]: new Command(actor.moveForward),
  [BUTTON.S]: new Command(actor.moveBackward),
});

while (input !== BUTTON.Q) {
  input = await rl.question('');
  inputHandler.handle(input);
}

rl.close();
