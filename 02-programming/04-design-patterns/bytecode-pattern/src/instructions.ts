export const INST = {
  SET_HEALTH: 0,
  SET_WISDOM: 1,
  SET_AGILITY: 2,
  PLAY_SOUND: 3,
  SPAWN_PARTICLES: 4,
  LITERAL: 5,
  GET_HEALTH: 6,
} as const;

export type Instruction = number;