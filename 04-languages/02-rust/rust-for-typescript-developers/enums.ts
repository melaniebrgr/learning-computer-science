type Custom = {
  age: number;
  name: string;
};

type Item = number | string | Custom;

function append(items: Item[]) {
  items.push('Hello Fem!');
}

const stringItems: string[] = ['Meeeee'];

append(stringItems);

console.log(stringItems);

const numItems: number[] = [1,2,3];

append(numItems);

console.log(numItems);



