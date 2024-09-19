// 🔴⚫️⚫️ --go--> ⚫️⚫️🟢 --wait--> ⚫️🟡⚫️ --stop--> 🔴⚫️⚫️

export const TRANSITION = {
  GO: 'go',
  WAIT: 'wait',
  STOP: 'stop',
} as const;

export type Transition = typeof TRANSITION[keyof typeof TRANSITION];

export const STOPLIGHT = {
  RED: '🔴⚫️⚫️',
  GREEN: '⚫️⚫️🟢',
  YELLOW: '⚫️🟡⚫️',
} as const;

export type Stoplight = typeof STOPLIGHT[keyof typeof STOPLIGHT];