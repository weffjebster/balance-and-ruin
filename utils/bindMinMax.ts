export const bindMinMax = (value: number, min: number, max: number) => {
  if (Number.isNaN(value)) {
    return min;
  }

  const bound = value < min ? min : value > max ? max : value;

  return bound;
};
