// Arrays are iterable
for (const service of [
  'simple storage service',
  'elastic compute cloud',
  'relational database service',
]) {
  service; // 'simple storage service' 'elastic compute cloud' 'relational database service'
}

// Strings are iterable
for (const letter of 's3') {
  letter; // 's' '3'
}

// Sets are iterable
for (const service of new Set([
  'simple storage service',
  'elastic compute cloud',
  'relational database service',
])) {
  service; // 'simple storage service' 'elastic compute cloud' 'relational database service'
}

// Maps are iterable
for (const [acronym, service] of new Map([
  ['s3', 'simple storage service'],
  ['ec2', 'elastic compute cloud'],
  ['rds', 'relational database service'],
])) {
  acronym; // 's3' 'ec2' 'rds'
  service; // 'simple storage service' 'elastic compute cloud' 'relational database service'
}

// The iterators can be invoked directly
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

// You can create an iterable by hand by writing out an iterator function
const makeRandomNumber = () => Math.round(Math.random() * 1000000000);
const makeLambda = () => ({
  functionName: 'lambda-' + makeRandomNumber(),
  runtime: 'Node.js 20.x',
  architecture: 'arm64'
})
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

// Any iterable can be converted to an array
[...lambdaCreator]; // [{ functionName: 'lambda-557803918', runtime: 'Node.js 20.x', architecture: 'arm64' }, ...and on ]

// Generators are syntactic sugar for iterator generation. Kind of.
function* lambdaGenerator() {
  while (true) {
    const enough = Math.random() > 0.80;
    if (enough) return;
    yield makeLambda();
  }
}
[...lambdaGenerator()]; // [{ functionName: 'lambda-557803918', runtime: 'Node.js 20.x', architecture: 'arm64' }, ...and on... or not because random ]
