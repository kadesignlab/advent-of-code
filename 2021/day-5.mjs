import { fetchData } from '../utils.mjs';

const input = (await fetchData(2021, 5)).split('\n');

let fieldSize = 0;
const lines = input.map(row => row.split(' -> ').map(coords => coords.split(',')
  .map(coord => {
    const int = parseInt(coord.trim());
    if (int > fieldSize) fieldSize = int;
    return int;
  })));

function sortStraightCoords(line) {
  line.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
}

function sortDiagonalCoords(line) {
  line.sort((a, b) => a[0] - b[0]);
}

function fillStraightLine(field, line) {
  sortStraightCoords(line);
  for (let i = line[0][0]; i <= line[1][0]; i++) {
    for (let j = line[0][1]; j <= line[1][1]; j++) {
      field[i][j]++;
    }
  }
}

function isDiagonal(line) {
  return line[0][0] !== line[1][0] && line[0][1] !== line[1][1];
}

function getDiagonalLineDirection(line) {
  return line[0][1] < line[1][1] ? 1 : -1;
}

function fillDiagonalLine(field, line) {
  sortDiagonalCoords(line);
  const direction = getDiagonalLineDirection(line);

  for (let i = line[0][0], j = line[0][1]; i !== line[1][0] + 1 && j !== line[1][1] + direction; i++, j += direction) {
    field[i][j]++;
  }
}

function countOverlapsGreaterThan(field, threshold) {
  return [].concat(...field).filter(val => val > threshold).length;
}

function draw(field) {
  console.log(field.map(row => row.map(val => val === 0 ? '.' : val).join(' ')).join('\n'));
}

// Part 1
let field = new Array(fieldSize + 1).fill(0).map(() => (new Array(fieldSize + 1).fill(0)));

lines.forEach(line => {
  if (isDiagonal(line)) return;
  fillStraightLine(field, line);
});

//draw(field); // Doesn't work for huge fields
console.log('Overlaps greater than 1 excluding diagonal lines: ', countOverlapsGreaterThan(field, 1));

// Part 2
field = field.map(row => row.map(() => 0));

lines.forEach(line => {
  if (isDiagonal(line)) {
    try {
      fillDiagonalLine(field, line);
    } catch (e) {
      console.log(line);
      throw e;
    }
  } else {
    fillStraightLine(field, line);
  }
});

//draw(field); // Doesn't work for huge fields
console.log('Overlaps greater than 1 including diagonal lines: ', countOverlapsGreaterThan(field, 1));