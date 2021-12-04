import { fetchData } from '../utils.mjs';

const input = (await fetchData(2021, 1)).split('\n').map(meas => parseInt(meas));

// Part 1
let result = 0;
input.forEach((curValue, i) => {
  if (i === 0) return;
  if (curValue > input[i - 1]) result++;
});

console.log(result, 'measurements are larger than the previous measurement');

// Part 2
function sum(acc, num) {
  return acc + num;
}

result = 0;
for (let i = 1; i < input.length - 2; i += 1) {
  if (input.slice(i, i + 3).reduce(sum, 0) > input.slice(i - 1, i + 2).reduce(sum, 0)) result++;
}

console.log(result, 'sums are larger than the previous sum');
