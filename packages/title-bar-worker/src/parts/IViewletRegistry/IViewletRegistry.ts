import type { StateTuple } from '../StateTuple/StateTuple.ts'

export interface IViewletRegistry<T> {
  readonly get: (uid: number) => StateTuple<T>
  readonly set: (uid: number, oldState: T, newState: T) => void
}
