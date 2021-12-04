import { fetchData } from '../utils.mjs';

const input = (await fetchData(2021, 4)).split('\n\n');

// Part 1
const numbers = input[0].split(',').map(num => parseInt(num));
let boards = input.slice(1).map(board => board.split('\n').map(row => row.trim().split(/ +/).map(num => parseInt(num))));

function checkBoard(board, numArr) {
  for (let row of board) {
    if (row.every(num => numArr.includes(num))) return true;
  }
  const transposedBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  for (let row of transposedBoard) {
    if (row.every(num => numArr.includes(num))) return true;
  }
  return false;
}

let j, checkedNumbers;
for (let i = 0; i < numbers.length; i++) {
  checkedNumbers = numbers.slice(0, i + 1);
  let found = false;
  for (j = 0; j < boards.length; j++) {
    if (checkBoard(boards[j], checkedNumbers)) {
      found = true;
      break;
    }
  }
  if (found) break;
}

let boardNums = [].concat(...boards[j]);
checkedNumbers.forEach(num => {
  let i = boardNums.indexOf(num);
  while (i !== -1) {
    boardNums.splice(i, 1);
    i = boardNums.indexOf(num);
  }
});

console.log('Final score for the board which will win first is', boardNums.reduce((acc, el) => (acc + el), 0) * checkedNumbers[checkedNumbers.length - 1]);

// Part 2
checkedNumbers = null;

for (let i = 0; i < numbers.length; i++) {
  let found = false;
  checkedNumbers = numbers.slice(0, i + 1);
  boards = boards.filter(el => el !== null);
  for (let j = 0; j < boards.length; j++) {
    if (checkBoard(boards[j], checkedNumbers)) {
      if (boards.length === 1) {
        found = true;
        break;
      }
      boards[j] = null;
    }
  }
  if (found) break;
}

boardNums = [].concat(...boards[0]);
checkedNumbers.forEach(num => {
  let i = boardNums.indexOf(num);
  while (i !== -1) {
    boardNums.splice(i, 1);
    i = boardNums.indexOf(num);
  }
});

console.log('Final score for the board which will win last is', boardNums.reduce((acc, el) => (acc + el), 0) * checkedNumbers[checkedNumbers.length - 1]);
