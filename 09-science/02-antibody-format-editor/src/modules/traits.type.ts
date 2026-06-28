import type { UUID } from "../core/uuid"

interface Identifiable {
  get id(): UUID
}

interface Drawable {
  draw(): void
}

export type { Drawable, Identifiable }