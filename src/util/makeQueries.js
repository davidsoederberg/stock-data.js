async function symbolsQuery(symbols, size) {
  if (typeof symbols === 'string') {
    return [symbols];
  }
  const queries = [];
  const iterations = Math.ceil(symbols.length / size);
  for (let i = 0; i < iterations; i += 1) {
    const currentIndex = size * i;
    queries.push(symbols.slice(currentIndex, currentIndex + size).join(','));
  }
  return queries;
}

module.exports = symbolsQuery;
