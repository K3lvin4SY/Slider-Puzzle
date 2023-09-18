class Board {
    constructor(designatedSizeX, designatedSizeY) {
        this.sizeX = designatedSizeX;
        this.sizeY = designatedSizeY;
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.board = [];

        this.board = this.alphabet.split("");
    }

    getBoardString() {
        return this.board.toString();
    }

    mix() {
      const tileOrderValues = this.board;
      const newTileOrderValues = randomize(tileOrderValues);
      //this.setTiles(newTileOrderValues);

      newTileOrderValues.forEach(tile => {
        $("#tileNr_"+tile).prependTo("#grid");
        
      });
      this.board = newTileOrderValues;
    }

    move(tileToMove) {
        const tileOrderValues = this.board;
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
      var index = 0;
      $('#grid').children().each(
        function() {
          if (index != 15) {
            $(this).text("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]);
          } else {
            $(this).text("");
          }
          index += 1;
        }
      );
    }

    won() {
        return (this.board === this.alphabet.split("").slice(0, this.sizeX*this.sizeY).push("0"));
    }
}

function randomize(list) {
  if (list.length === 0) {
      return [];
  }
  const index = Math.floor(Math.random() * (list.length + 1));
  const removedItem = list.slice(index, index+1);
  const leftOver = list.slice(0, index).concat(list.slice(index + 1));
  const randomizedString = removedItem.concat(randomize(leftOver));
  return randomizedString;
}

const board = new Board(4, 4);

function gen() {
  board.render();
}

function gen2() {
  board.mix()
}

function gen3() {
  board.move("A")
}