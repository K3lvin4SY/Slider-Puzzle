class PuzzleNode {
  constructor(board, parent, move, depth, similarity) {
    this.board = board;  // current state of the puzzle
    this.parent = parent; // parent node
    this.move = move; // what moves that has been done
    this.depth = depth; // Amount of moves made
    this.similarity = similarity; // amount of tiles that is in the correct location and order.
  }

  isSolved() {
    return this.similarity === 0; // clompletly similar (solved)
  }

  getPath() {
    const path = [];
    var node = this;
    while (node.parent !== null) {
      path.unshift(node.move);
      node = node.parent;
    }
    return path; 
  }
}

function solvePuzzle(initialBoard) {
  const targetBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0], // 0 is the empty tile
  ];
  
  // initializes open and closed sets
  const openSet = []; // contains nodes that has not been fully explored yet
  const closedSet = new Set(); // contains nodes that has been explored

  function similarity(board) { // needs work by soriting more correctly
    let h = 0;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (board[x][y] !== targetBoard[x][y]) {
          h++;
        }
      }
    }
    return h;
  };

  const initialNode = new PuzzleNode(initialBoard, null, null, 0, similarity(initialBoard));
  openSet.push(initialNode);

  while (openSet.length > 0) {
    // sorting openSets to expolre the sets with more potential
    openSet.sort((a, b) => a.depth + a.similarity - (b.depth + b.similarity)); // smallest -> biggest number (number == depth + similarity)
    const currentNode = openSet.shift(); // returns openSet[0] and removes it from openSet
    closedSet.add(JSON.stringify(currentNode.board)); // adds current node to the explored sets (closedSet)

    if (currentNode.isSolved()) { // checks if current node is solved
      return currentNode.getPath();
    }

    // Y = Rows   =
    // X = Colums ||
    const [blankX, blankY] = findBlankPosition(currentNode.board);

    const moves = [
      [0, -1, 'Up'],
      [0, 1, 'Down'],
      [-1, 0, 'Left'],
      [1, 0, 'Right'],
    ];

    for (let [dx, dy, move] of moves) {
      const newX = blankX + dx // X position of tile that will switch with the empty spot
      const newY = blankY + dy // Y position of tile that will switch with the empty spot
      
      if (isValidPosition(newX, newY)) {
        const newBoard = copyBoard(currentNode.board);
        // following line moves tile one step to the empty slot
        [newBoard[blankX][blankY], newBoard[newX][newY]] = [newBoard[newX][newY], newBoard[blankX][blankY]];

        if (!closedSet.has(JSON.stringify(newBoard))) { // if newly created board timestamp hasn't already been explored
          const newNode = new PuzzleNode(newBoard, currentNode, move, currentNode.depth + 1, similarity(newBoard));
          openSet.push(newNode);
        }
      }
    }
  }
  return null; // No solution found =(
}

// checks if a pair of cordinates is inside the boundries of the grid
function isValidPosition(x, y) {
  return y >= 0 && y < 4 && x >= 0 && x < 4;
}

function copyBoard(board) {
  return board.map((row) => [...row]);
}

function findBlankPosition(board) {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (board[x][y] === 0) {
        return [x, y];
      }
    }
  }
}

const initialBoard2 = [
  [1, 2, 4, 8],
  [10, 5, 0, 6],
  [3, 9, 7, 11],
  [13, 14, 15, 12],
];
const solution = solvePuzzle(initialBoard2);
if (solution) {
  console.log('Solution:', solution);
  console.log(solution.length);
} else {
  console.log('No solution found.');
}