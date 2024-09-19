// 🔴⚫️⚫️ --go--> ⚫️⚫️🟢 --wait--> ⚫️🟡⚫️ --stop--> 🔴⚫️⚫️

const TRANSITION = {
  GO: 'go',
  WAIT: 'wait',
  STOP: 'stop',
} as const;

type Transition = typeof TRANSITION[keyof typeof TRANSITION];

const STOPLIGHT = {
  RED: '🔴⚫️⚫️',
  GREEN: '⚫️⚫️🟢',
  YELLOW: '⚫️🟡⚫️',
} as const;

type Stoplight = typeof STOPLIGHT[keyof typeof STOPLIGHT];

class RedStoplightState {
  color = STOPLIGHT.RED;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
      if (transition === TRANSITION.GO) {
        stoplight.updateState(StoplightState.green);
      }
  }
}

class GreenStoplightState {
  color = STOPLIGHT.GREEN;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
    if (transition === TRANSITION.WAIT) {
      stoplight.updateState(StoplightState.Yellow);
    }
  }
}

class YellowStoplightState {
  color = STOPLIGHT.YELLOW;

  handleTransition(stoplight: StoplightState, transition: Transition): void {
    if (transition === TRANSITION.STOP) {
      stoplight.updateState(StoplightState.red);
    }
  }
}

class StoplightState {
  #state;
  static red = new RedStoplightState();
  static green = new GreenStoplightState();
  static Yellow = new YellowStoplightState();

  handleTransition(transition: Transition) {
    this.#state.handleTransition(this, transition);
  }

  updateState(newState: RedStoplightState | GreenStoplightState | YellowStoplightState) {
    this.#state = newState;
  }

  getState(): Stoplight {
    return this.#state.color;
  }
}



const stoplight = new StoplightState();
stoplight.updateState(StoplightState.red);

const transitions = [TRANSITION.GO, TRANSITION.WAIT, TRANSITION.STOP]

let i = 0;

setInterval(() => {
  stoplight.handleTransition(transitions[i]);
  console.log(stoplight.getState());
  i = i + 1;
  if (i === 3) i = 0;
}, 1000)