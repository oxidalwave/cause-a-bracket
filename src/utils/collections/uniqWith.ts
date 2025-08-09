export const uniqWith = <T>(arr: T[], fn: (a: T, b: T) => boolean) =>
  arr.filter(
    (element, index) => arr.findIndex((step) => fn(element, step)) === index,
  );
