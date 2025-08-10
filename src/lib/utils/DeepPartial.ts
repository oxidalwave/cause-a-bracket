export type DeepPartial<T extends object> = {
  [P in keyof T]?: T[P] extends (...args: unknown[]) => unknown
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};
