import { fetchData } from '../utils.mjs';

const input = (await fetchData(2021, 2)).split('\n').map(cmd => cmd.split(' '));

// Part 1
let x = 0, y = 0;
input.forEach(cmd => {
  const units = parseInt(cmd[1]);
  switch (cmd[0]) {
    case 'forward':
      x += units;
      break;
    case 'down':
      y += units;
      break;
    case 'up':
      y -= units;
  }
});

console.log('Result of multiplying final horizontal position by final depth is', x * y);

// Part 2
x = 0;
y = 0;
let aim = 0;
input.forEach(cmd => {
  const units = parseInt(cmd[1]);
  switch (cmd[0]) {
    case 'forward':
      x += units;
      y += units * aim;
      break;
    case 'down':
      aim += units;
      break;
    case 'up':
      aim -= units;
  }
});

console.log('Result of multiplying final horizontal position by final depth when using aim is', x * y);
