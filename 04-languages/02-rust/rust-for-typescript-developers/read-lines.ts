// import { open } from 'node:fs/promises';

// (async () => {
//   const file = await open('./lines.txt');

//   for await (const line of file.readLines()) {
//     console.log(line);
//   }
// })();

import fs from "fs";

const file = fs.readFileSync("lines.txt");

file
  .toString()
  .split("\n")
  .filter((_, i) => i % 2 === 0)
  .filter((_, i) => i > 1)
  .filter((_, i) => i < 2)
  .forEach((line) => console.log(line));