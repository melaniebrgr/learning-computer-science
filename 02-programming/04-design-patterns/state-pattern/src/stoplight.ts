import { STOPLIGHT, TRANSITION, Transition } from "./types"; 
import { StoplightState } from '../index';

export class RedStoplightState {
  color = STOPLIGHT.RED;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
      if (transition === TRANSITION.GO) {
        stoplight.state = StoplightState.green;
      }
  }
}

export class GreenStoplightState {
  color = STOPLIGHT.GREEN;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
    if (transition === TRANSITION.WAIT) {
      stoplight.state  = StoplightState.Yellow;
    }
  }
}

export class YellowStoplightState {
  color = STOPLIGHT.YELLOW;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
    if (transition === TRANSITION.STOP) {
      stoplight.state = StoplightState.red;
    }
  }
}