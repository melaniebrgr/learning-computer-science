type UUID = `${string}-${string}-${string}-${string}-${string}`;

interface Identifiable {
  get id(): UUID
}

interface Drawable {
  draw(): void
}

export type { Drawable, Identifiable, UUID }