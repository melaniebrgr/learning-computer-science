function takeSomeNumber(n: number | undefined): number {
  return (n ?? 0) * 5;
}

console.log(takeSomeNumber(undefined));
console.log(takeSomeNumber(5));