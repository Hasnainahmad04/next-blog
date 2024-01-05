const capatialize = (s: string): string => {
  const array = s.split(" ");
  const transformed = array.map(
    (str) => str.at(0)?.toUpperCase() + str.slice(1)
  );
  return transformed.join(" ");
};

export { capatialize };
