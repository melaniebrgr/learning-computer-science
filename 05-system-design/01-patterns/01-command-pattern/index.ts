// @ts-expect-error
import * as readline from 'node:readline/promises';
// @ts-expect-error
import { stdin, stdout } from 'node:process';
import { KeyboardInputHandler } from './inputHandler';
import { MoveLeftCommand, MoveRightCommand, MoveForwardCommand, MoveBackwardCommand, QuitCommand } from './command'
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

const rl = readline.createInterface({ input: stdin, output: stdout });

const keyboardInputHandler = new KeyboardInputHandler({
  [BUTTON.A]: new MoveLeftCommand(actor),
  [BUTTON.D]: new MoveRightCommand(actor),
  [BUTTON.W]: new MoveForwardCommand(actor),
  [BUTTON.S]: new MoveBackwardCommand(actor),
  [BUTTON.Q]: new QuitCommand(),
});

while (true) {
  const input = await rl.question('');
  keyboardInputHandler.handle(input);
}