// Arrays are iterable
for (const service of [
  'simple storage service',
  'elastic compute cloud',
  'relational database service',
]) {
  service;
}

// Strings are iterable
for (const letter of 's3') {
  letter;
}

// Sets are iterable
for (const service of new Set([
  'simple storage service',
  'elastic compute cloud',
  'relational database service',
])) {
  service;
}

// Maps are iterable
for (const [acronym, service] of new Map([
  ['s3', 'simple storage service'],
  ['ec2', 'elastic compute cloud'],
  ['rds', 'relational database service'],
])) {
  acronym;
  service;
}

// Iterators can be invoked manually (outside of for...of)
const services = [
  'simple storage service',
  'elastic compute cloud',
  'relational database service',
];
const servicesIt = services[Symbol.iterator]();
servicesIt.next(); // { value: 'simple storage service', done: false }
servicesIt.next(); // { value: 'elastic compute cloud', done: false }
servicesIt.next(); // { value: 'relational database service', done: false }
servicesIt.next(); // { value: undefined, done: true }
servicesIt.next(); // { value: undefined, done: true } and on...

// Iterators can be written by hand
const lambdaCreator = {
  [Symbol.iterator]() {
    return {
      next() {
        const enough = Math.random() > 0.80;
        return enough 
          ? { done: true }
          : { value: makeLambda(), done: false }
      }
    }
  }
};
for (const lambda of lambdaCreator) {
  lambda;
}

// Generators are syntactic sugar for iterator creation (kind of)
function* lambdaGenerator() {
  while (true) {
    const enough = Math.random() > 0.80;
    if (enough) return;
    yield makeLambda();
  }
}
for (const lambda of lambdaGenerator()) {
  lambda;
}

// AsyncIterators can be written by hand too
const asyncLambdaCreator = {
  [Symbol.asyncIterator]() {
    let lambdaCount = 0;
    return {
      next() {
        if (lambdaCount < 3) {
          lambdaCount++;
          return Promise.resolve({ value: makeLambda(), done: false });
        } else {
          return Promise.resolve({ value: undefined, done: true });
        }
      }
    }
  }
};
(async () => {
  for await (const lambda of asyncLambdaCreator) {
    lambda;
  }
})();

// Async generators are syntactic sugar for async iterator creation (kind of)
async function* asyncLambdaGenerator () {
  let lambdaCount = 0;
  while (lambdaCount < 3) {
    yield makeLambda();
    lambdaCount++;
  }
}
(async () => {
  for await (const lambda of asyncLambdaGenerator()) {
    lambda;
  }
})();

























// Extra helper stuff that can be ingored
function makeRandomNumber() {
  return Math.round(Math.random() * 1000000000);
}
function makeLambda() {
  return ({
    functionName: 'lambda-' + makeRandomNumber(),
    runtime: 'Node.js 20.x',
    architecture: 'arm64'
  });
}