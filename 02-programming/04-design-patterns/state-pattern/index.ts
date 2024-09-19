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

class StoplightState {
  #state;

  handleTransition(transition: Transition) {
    this.#state.handleTransition(this, transition);
  }

  updateState(newState: StoplightState) {
    this.#state = newState;
  }

  getState(): Stoplight {
    return this.#state.color;
  }
}

interface StoplightState {
  color: Stoplight;
  handleTransition(self: any, transition: Transition): void;
}

class RedStoplightState implements StoplightState {
  color = STOPLIGHT.RED;

  handleTransition(self: any, transition: Transition): void {
      // if (transition === TRANSITION.GO) {
        self.updateState(new GreenStoplightState());
      // }
  }
}

class GreenStoplightState extends StoplightState implements StoplightState {
  color = STOPLIGHT.GREEN;

  handleTransition(self, transition: Transition): void {
    // if (transition === TRANSITION.WAIT) {
      self.updateState(new YellowStoplightState());
    // }
  }
}

class YellowStoplightState extends StoplightState implements StoplightState {
  color = STOPLIGHT.YELLOW;

  handleTransition(self, transition: Transition): void {
    // if (transition === TRANSITION.STOP) {
      self.updateState(new RedStoplightState());
    // }
  }
}

const stoplight = new StoplightState();
stoplight.updateState(new RedStoplightState());

const transitions = [TRANSITION.GO, TRANSITION.WAIT, TRANSITION.STOP]

let i = 0;

setInterval(() => {
  stoplight.handleTransition(transitions[i]);
  console.log(stoplight.getState());
  i = i + 1;
  if (i === 3) i = 0;
}, 1000)