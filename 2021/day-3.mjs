import { fetchData } from '../utils.mjs';

const input = (await fetchData(2021, 3)).split('\n');

// Part 1
let gamma = '', epsilon = '', sum = new Array(input[0].length).fill(0);
input.forEach((num) => {
  for (let i = 0; i < num.length; i++) {
    sum[i] += parseInt(num[i]);
  }
});

sum.forEach(el => {
  if (el / input.length > 0.5) {
    gamma += '1';
    epsilon += '0';
  } else {
    gamma += '0';
    epsilon += '1';
  }
});

console.log('Power consumption is', parseInt(gamma, 2) * parseInt(epsilon, 2));

// Part 2

function findRating(array, position, isMostCommon) {
  const thisSum = array.reduce((sum, el) => (sum + parseInt(el[position], 10)), 0);
  const ratio = thisSum / array.length;
  const condition = isMostCommon ? ratio >= 0.5 : ratio < 0.5;

  if (array.length === 1) {
    return array[0];
  } else {
    if (condition) {
      return findRating(array.filter(el => el[position] === '1'), position + 1, isMostCommon);
    } else {
      return findRating(array.filter(el => el[position] === '0'), position + 1, isMostCommon);
    }
  }
}

const oxygen = findRating(input, 0, true);
const co2 = findRating(input, 0, false);

console.log('Life support rating is', parseInt(oxygen, 2) * parseInt(co2, 2));
