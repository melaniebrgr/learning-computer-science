import { TRANSITION, Stoplight, Transition } from "./src/types";
import { RedStoplightState, GreenStoplightState, YellowStoplightState } from "./src/stoplight";

export class StoplightState {
  #state;
  
  static red = new RedStoplightState();
  static green = new GreenStoplightState();
  static Yellow = new YellowStoplightState();

  constructor(state = StoplightState.red) {
    this.#state = state;
  }

  handleTransition(transition: Transition) {
    this.#state.handleTransition(this, transition);
  }

  set state(newState: RedStoplightState | GreenStoplightState | YellowStoplightState) {
    this.#state = newState;
  }

  get state(): Stoplight {
    return this.#state.color;
  }
}

let i = 0;
const transitions = [TRANSITION.GO, TRANSITION.WAIT, TRANSITION.STOP]
const stoplight = new StoplightState();

setInterval(() => {
  stoplight.handleTransition(transitions[i]);
  console.log(stoplight.state);
  if (++i === 3) i = 0;
}, 1000)