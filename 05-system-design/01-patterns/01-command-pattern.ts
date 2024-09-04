// @ts-expect-error
import * as readline from 'node:readline/promises';
// @ts-expect-error
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });

let input;

const action = (input: string) => {
  if (input === 'w') {
    console.log('Move forward');
  }
  if (input === 's') {
    console.log('Move backward');
  }
  if (input === 'a') {
    console.log('Move left');
  }
  if (input === 'd') {
    console.log('Move right');
  } 
};

while (input !== 'q') {
  input = await rl.question('');
  action(input);
}

rl.close();
