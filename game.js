class Board {
    constructor(designatedSizeX, designatedSizeY) {
        this.sizeX = designatedSizeX;
        this.sizeY = designatedSizeY;
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.board = [];

        this.setTiles(this.alphabet);
    }

    setTiles(tileValues) {
        let tileIndex = 0;
        this.board = [];
        for (let r = 0; r < this.sizeY; r++) {
            this.board.push([]);
            for (let c = 0; c < this.sizeX; c++) {
                if (tileIndex === 0 && tileValues === this.alphabet) {
                    this.board[r].push('0');
                } else {
                    if (tileValues === this.alphabet) {
                        this.board[r].push(tileValues.charAt(tileIndex - 1));
                    } else {
                        this.board[r].push(tileValues.charAt(tileIndex));
                    }
                }
                tileIndex++;
            }
        }
    }

    boardTileValuesInOrder() {
        let boardTileValuesInOrder = "";
        for (let r = 0; r < this.sizeY; r++) {
            for (let c = 0; c < this.sizeX; c++) {
                boardTileValuesInOrder += this.board[r][c];
            }
        }
        //console.log(boardTileValuesInOrder)
        return boardTileValuesInOrder;
    }

    mix() {
        const tileOrderValues = this.boardTileValuesInOrder();
        const newTileOrderValues = randomizeString(tileOrderValues);
        this.setTiles(newTileOrderValues);
    }

    move(tileToMove) {
        const tileOrderValues = this.boardTileValuesInOrder();
        const tileToMoveIndex = tileOrderValues.indexOf(tileToMove);
        const newTilePlacementIndex = tileOrderValues.indexOf('0');

        if (this.areTilesAdjacent(tileToMoveIndex, newTilePlacementIndex)) {
            const ch = tileOrderValues.split('');
            [ch[tileToMoveIndex], ch[newTilePlacementIndex]] = [ch[newTilePlacementIndex], ch[tileToMoveIndex]];
            this.setTiles(ch.join(''));
        } else {
            console.log("You can't move like that");
        }
    }

    areTilesAdjacent(indexOne, indexTwo) {
        const gridSize = this.sizeX;

        const rowOne = Math.floor(indexOne / gridSize);
        const colOne = indexOne % gridSize;
        const rowTwo = Math.floor(indexTwo / gridSize);
        const colTwo = indexTwo % gridSize;

        const rowDiff = Math.abs(rowOne - rowTwo);
        const colDiff = Math.abs(colOne - colTwo);

        /*console.log(indexOne)
        console.log(indexTwo)
        console.log(rowOne)
        console.log(colOne)
        console.log(rowTwo)
        console.log(colTwo)

        console.log(rowDiff)
        console.log(colDiff)*/

        return ((rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0));
    }

    render() {
        console.log("-----");
        for (let r = 0; r < this.sizeY; r++) {
            let currentRow = "";
            for (let c = 0; c < this.sizeX; c++) {
                currentRow += this.board[r][c] + " ";
            }
            console.log(currentRow);
        }
        console.log("-----");
    }

    won() {
        return (this.boardTileValuesInOrder() === this.alphabet.substring(0, this.boardTileValuesInOrder().length - 1) + "0");
    }
}

function randomizeString(str) {
  if (str.length === 0) {
      return "";
  }
  const index = Math.floor(Math.random() * (str.length + 1));
  const removedChar = str.charAt(index);
  const leftOver = str.substring(0, index) + str.substring(index + 1);
  const randomizedString = removedChar + randomizeString(leftOver);
  return randomizedString;
}

const board = new Board(4, 5);
board.mix();
board.render();

function gen() {
  board.move("A");
  board.render();
}