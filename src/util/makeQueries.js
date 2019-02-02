async function symbolsQuery(symbols) {
  if (typeof symbols === 'string') {
    return [symbols];
  }
  const queries = [];
  const iterations = Math.ceil(symbols.length / 5);
  for (let i = 0; i < iterations; i += 1) {
    const currentIndex = 5 * i;
    queries.push(symbols.slice(currentIndex, currentIndex + 5).join(','));
  }
  return queries;
}

module.exports = symbolsQuery;
