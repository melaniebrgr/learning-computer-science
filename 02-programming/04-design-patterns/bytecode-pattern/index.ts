import { setHealth, setAgility, setWisdom, playSound, spawnParticles, getHealth } from './src/behaviours';
import { INST, Instruction } from './src/instructions';

class VM {
  #stack: number[] = [];
  #instructions: Instruction[] = [];
  static MAX_STACK_SIZE = 128;

  constructor(instructions: Instruction[]) {
    this.#instructions = instructions;
  }

  interpret() {
    for (let i = 0; i < this.#instructions.length; i++) {
      switch (this.#instructions[i]) {
        case INST.GET_HEALTH: {
          const wizard = this.#pop();
          this.#push(getHealth(wizard))
          break;
        }
        case INST.SET_HEALTH: {
          const amount = this.#pop();
          const wizard = this.#pop();
          setHealth(wizard, amount)
          break;
        }
        case INST.SET_WISDOM: {
          const amount = this.#pop();
          const wizard = this.#pop();
          setWisdom(wizard, amount)
          break;
        }
        case INST.SET_AGILITY: {
          const amount = this.#pop();
          const wizard = this.#pop();
          setAgility(wizard, amount)
          break;
        }
        case INST.PLAY_SOUND: {
          const id = this.#pop();
          playSound(id)
          break;
        }
        case INST.SPAWN_PARTICLES: {
          const id = this.#pop();
          spawnParticles(id)
          break;
        }
        case INST.LITERAL: {
          this.#push(this.#instructions[++i])
          break
        }
        default:
          throw new Error(`Unknown instruction: ${i}`);
      }
    }
  }

  #push(value: Instruction) {
    if (this.#stack.length <= VM.MAX_STACK_SIZE) {
      this.#stack.push(value);
    } else {
      throw new Error('Stack overflow');
    }
  }

  #pop(): number {
    if (this.#stack.length > 0) {
      return this.#stack.pop() as number;
    } else {
      throw new Error('Stack empty');
    }
  }
}

const instructionsForMyNewWand = [
  INST.LITERAL,
  0,
  INST.LITERAL,
  10,
  INST.SET_HEALTH,
  INST.LITERAL,
  0,
  INST.LITERAL,
  42,
  INST.SET_AGILITY,
  INST.LITERAL,
  0,
  INST.LITERAL,
  1,
  INST.GET_HEALTH,
  INST.SET_WISDOM,
]

const vm = new VM(instructionsForMyNewWand);

console.log("What my new wand does:")

vm.interpret();