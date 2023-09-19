var timeGl = 0;
function shufflePuzzle() {
  // Define the initial state of the puzzle
  let puzzle = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ];

  // Define valid moves for the empty space (0)
  const moves = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1]   // Right
  ];

  // Helper function to check if a move is valid
  function isValidMove(row, col) {
    return row >= 0 && row < 4 && col >= 0 && col < 4;
  }

  // Perform a fixed number of random moves to shuffle the puzzle
  const shuffleSteps = 50; // You can adjust this for more or less shuffling
  for (let step = 0; step < shuffleSteps; step++) {
    const emptyRow = puzzle.findIndex(row => row.includes(0));
    const emptyCol = puzzle[emptyRow].indexOf(0);

    // Randomly select a valid move
    let randomMove;
    do {
      randomMove = moves[Math.floor(Math.random() * moves.length)];
    } while (!isValidMove(emptyRow + randomMove[0], emptyCol + randomMove[1]));

    // Swap the empty space with the number in the selected direction
    const newRow = emptyRow + randomMove[0];
    const newCol = emptyCol + randomMove[1];
    puzzle[emptyRow][emptyCol] = puzzle[newRow][newCol];
    puzzle[newRow][newCol] = 0;
  }

  return puzzle;
}


class PuzzleNode {
  constructor(board, parent, move, depth, heuristic) {
    this.board = board;
    this.parent = parent;
    this.move = move;
    this.depth = depth;
    this.heuristic = heuristic;
  }

  isSolved() {
    return this.heuristic === 0;
  }
}




function solvePuzzle(initialBoard) {
  const currentDate1 = new Date();
  const unixTime1 = currentDate1.getTime();
  const targetBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0], // 0 represents the blank space
  ];

  const openSet = [];
  const closedSet = new Set();

  const heuristic = (board) => {
    let h = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] !== targetBoard[i][j]) {
          h++;
        }
      }
    }
    return h;
  };

  const initialNode = new PuzzleNode(initialBoard, null, null, 0, heuristic(initialBoard));
  openSet.push(initialNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.depth + a.heuristic - (b.depth + b.heuristic));
    const currentNode = openSet.shift();
    closedSet.add(JSON.stringify(currentNode.board));

    if (currentNode.isSolved()) {
      const currentDate2 = new Date();
      const unixTime2 = currentDate2.getTime();
      //console.log((unixTime2-unixTime1)+" ms");
      timeGl = unixTime2-unixTime1;
      return getPath(currentNode);
    }

    const [blankRow, blankCol] = findBlankPosition(currentNode.board);

    const moves = [
      [-1, 0, 'Up'],
      [1, 0, 'Down'],
      [0, -1, 'Left'],
      [0, 1, 'Right'],
    ];

    for (const [dr, dc, move] of moves) {
      const newRow = blankRow + dr;
      const newCol = blankCol + dc;
      //console.log("tick")

      if (isValidPosition(newRow, newCol)) {
        //console.log("ticker ###########")
        const newBoard = copyBoard(currentNode.board);
        [newBoard[blankRow][blankCol], newBoard[newRow][newCol]] = [newBoard[newRow][newCol], newBoard[blankRow][blankCol]];

        if (!closedSet.has(JSON.stringify(newBoard))) {
          //console.log("%%%%%")
          const newNode = new PuzzleNode(newBoard, currentNode, move, currentNode.depth + 1, heuristic(newBoard));
          openSet.push(newNode);
        }
      }
    }
    
    //console.log("###########################################")
  }
  console.log("/////////////////////////////////////////////")
  return null; // No solution found
}

function findBlankPosition(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
}

function isValidPosition(row, col) {
  return row >= 0 && row < 4 && col >= 0 && col < 4;
}

function copyBoard(board) {
  return board.map((row) => [...row]);
}

function getPath(node) {
  const path = [];
  while (node.parent !== null) {
    path.unshift(node.move);
    node = node.parent;
  }
  return path;
}

// Example usage:
const initialBoard = [
  [4, 12, 2, 8],
  [13, 5, 6, 0],
  [3, 14, 7, 10],
  [9, 1, 15, 11],
];
const initialBoard2 = [
  [1, 2, 4, 8],
  [10, 5, 0, 6],
  [3, 9, 7, 11],
  [13, 14, 15, 12],
];
const initialBoard3 = [
  [7, 2, 1, 4],
  [6, 0, 3, 12],
  [5, 11, 8, 15],
  [9, 10, 13, 14],
];

for (let index = 0; index < 1; index++) {
  const shuffledPuzzle = shufflePuzzle();
  //console.log(shuffledPuzzle)
  const solution = solvePuzzle(initialBoard3);
  if (solution) {
    //console.log('Solution:', solution);
    console.log(timeGl+"	"+ solution.length);
  } else {
    console.log('No solution found.');
  }
}