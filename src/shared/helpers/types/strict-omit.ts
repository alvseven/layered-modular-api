/*
  A stricter version of the built-in Omit utility type, designed to improve developer experience (DX) by enhancing autocomplete.

  Omit<T, K> is used here because it preserves the homomorphic nature of mapped types, making it a simple and effective way to maintain structure.

  Since Omit<T, K> is already homomorphic under the hood, this provides a convenient shortcut.
*/

export type StrictOmit<T, K extends keyof T> = Omit<T, K>;
