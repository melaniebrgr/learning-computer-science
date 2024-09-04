export const BUTTON = {
  W: 'w',
  S: 's',
  A: 'a',
  D: 'd',
  Q: 'q',
} as const;

export type TButton = typeof BUTTON[keyof Pick<typeof BUTTON, "W" | "S" | "A" | "D">]