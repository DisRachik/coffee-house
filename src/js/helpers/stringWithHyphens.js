export const stringWithHyphens = (str) =>
  str
    .split('')
    .map((ch) => {
      if (ch === ' ') {
        return '-';
      }
      return ch.toLowerCase();
    })
    .join('');
