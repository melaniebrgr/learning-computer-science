// @ts-expect-error
import * as readline from 'node:readline/promises';
// @ts-expect-error
import { stdin, stdout } from 'node:process';
import { KeyboardInputHandler } from './InputHandler';
import { MoveLeftCommand, MoveRightCommand, MoveForwardCommand, MoveBackwardCommand } from './Command';
import { BUTTON  } from './button';

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
};

const keyboardInputHandler = new KeyboardInputHandler({
  [BUTTON.A]: new MoveLeftCommand(actor),
  [BUTTON.D]: new MoveRightCommand(actor),
  [BUTTON.W]: new MoveForwardCommand(actor),
  [BUTTON.S]: new MoveBackwardCommand(actor),
});

const rl = readline.createInterface({ input: stdin, output: stdout });

let input;

while (input !== BUTTON.Q) {
  input = await rl.question('');
  keyboardInputHandler.handle(input);
}

rl.close();
