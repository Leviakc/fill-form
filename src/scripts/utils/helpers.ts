export const $ = function <T extends Element>(args: string): T | null {
  return document.querySelector(args);
};

export const $$ = function <T extends Element>(
  args: string,
): NodeListOf<T> | null {
  return document.querySelectorAll(args);
};
