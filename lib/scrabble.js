const permuter = require("./permuter");
const words = require("./words.json");
// const words = {hello: "true", world: "true"};

const board = createBoard();
const points = {
  a: 1,
  b: 4,
  c: 4,
  d: 2,
  e: 1,
  f: 4,
  g: 3,
  h: 3,
  i: 1,
  j: 10,
  k: 5,
  l: 2,
  m: 4,
  n: 2,
  o: 1,
  p: 4,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 2,
  v: 5,
  w: 4,
  x: 8,
  y: 3,
  z: 10
};

function findBestWord() {
  const boards = [];
  //placeLetters(board, "hello", 7, 6, "h");
  placeLetters(board, "hello", 7, 7, "v");
  //placeLetters(board, "world", 4, 8, "v");

  const rackLetters = "rldwo".split("");
  const permutations = getAllPermutations(rackLetters);
  // console.log('permutations', permutations);
  for (let p = 0; p < permutations.length; p++) {
    permutation = permutations[p];
    for (let row = 0; row < board.length; row++) {
      // setup the permutation on the left outside the row (out of view)
      for (
        let letter = permutation.length - 1, i = -1;
        letter >= 0;
        letter--, i--
      ) {
        board[row][i] = permutation[letter];
      }

      const spots = [];

      // find empty spots in the row (by index)
      board[row].forEach((e, i) => {
        if (!e) {
          spots.push(i);
        }
      });

      // console.log('spots', spots);
      // console.log('permutation', permutation);

      const temp = board[row].slice();

      // sweep the permutation onto the row
      for (let i = 0; i < spots.length + permutation.length - 1; i++) {
        // reset the row
        board[row] = temp.slice();
        let j = 0;
        while (j <= permutation.length) {
          if (spots[i - j] != null) {
            board[row][spots[i - j]] = permutation[permutation.length - j - 1];
          }
          j++;
        }
 
        if (isValidBoard(board)) {
          printBoard(board);
          boards.push(board);
        }
        board[row] = temp.slice();
      }
    }
  }
  return boards;
}

function getAllPermutations(arr) {
  let all = [];
  for (let i = 2; i <= arr.length; i++) {
    all = all.concat(permuter.getPermutations(arr, i));
  }
  return Array.from(new Set(all)).map(permutation => permutation.split(""));
}

function createBoard() {
  const board = [];
  for (let rowIndex = 0; rowIndex < 15; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < 15; colIndex++) {
      row.push(undefined);
    }
    board.push(row);
  }
  return board;
}

function placeLetters(board, letters, row, col, orientation) {
  if (orientation === "h") {
    for (let i = 0; i < letters.length; i++) {
      board[row][col + i] = letters[i];
    }
  } else {
    for (let i = 0; i < letters.length; i++) {
      board[row + i][col] = letters[i];
    }
  }
}

function isValidBoard(board) {
  if (!board[7][7]) {
    console.log('Middle not populated');
    return false;
  }

  let strArr = [];

  // horizontal words
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      if (board[rowIndex][colIndex]) {
        strArr.push(board[rowIndex][colIndex]);
      } else {
        // console.log('strArr', strArr.join(""));
        if (strArr.length > 1 && !isWord(strArr.join(""))) {
          // console.log(strArr.join(''), 'Not a word - horizontal');
          return false;
        }
        strArr = [];
      }
    }
  }

  // vertical words
  for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (board[rowIndex][colIndex]) {
        strArr.push(board[rowIndex][colIndex]);
      } else {
        if (strArr.length > 1 && !isWord(strArr.join(""))) {
          // console.log(strArr.join(''), 'Not a word - vertical');
          return false;
        }
        strArr = [];
      }
    }
  }

  return areAllWordsConnected(board);
}

function isWord(str) {
  return words[str];
}

function areAllWordsConnected(board) {
  const visited = {};
  const counts = {};
  // count number of letters in connected components
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      counts[row + "_" + col] = dfs(board, visited, row, col);
    }
  }
  let alreadyFound = false;

  const values = Object.keys(counts).map(key => counts[key]);  
  
  for (let i = 0; i < values.length; i++) {
    if (values[i] > 0) {
      if (alreadyFound) {
        // console.log('All words not connected');
        return false;
      } else {
        alreadyFound = true;
      }
    }
  }
  return true;
}

function dfs(board, visited, row, col) {
  if (
    !board[row] ||
    !board[row][col] ||
    visited[row + "_" + col] ||
    row > board.length - 1 ||
    col > board[0].length - 1
  ) {
    return 0;
  }
  visited[row + "_" + col] = true;
  return (
    1 +
    dfs(board, visited, row + 1, col) +
    dfs(board, visited, row, col + 1) +
    dfs(board, visited, row - 1, col) +
    dfs(board, visited, row, col - 1)
  );
}

function printBoard(board) {
  console.log('----------Board--------');
  for (let row = 0; row < board.length; row++) {
    const arr = [];
    for (let col = 0; col < board[0].length; col++) {
      const cell = board[row][col] ? board[row][col] : '-';
      arr.push(cell);
    }
    console.log(arr.join(' '));
  }
}

module.exports = {
  findBestWord
};
