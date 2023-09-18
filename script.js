const statusBar = document.querySelector('#statusBar');
const cells = document.querySelectorAll('.grid-cell');
let emptyCellIndex = 15;
const transitionTime = 250;

// Add click event listeners to the neighbor cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (areTilesAdjacent(index, emptyCellIndex)) {
      slideCell(index, emptyCellIndex);
      emptyCellIndex = index;
    }
  });
});

function areTilesAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 4);
  const col1 = index1 % 4;
  const row2 = Math.floor(index2 / 4);
  const col2 = index2 % 4;

  return (
    (Math.abs(row1 - row2) === 1 && col1 === col2) ||
    (Math.abs(col1 - col2) === 1 && row1 === row2)
  );
}

function slideCell(fromIndex, toIndex) {
  const fromCell = cells[fromIndex];
  const toCell = cells[toIndex];

  const fromRect = fromCell.getBoundingClientRect();
  const toRect = toCell.getBoundingClientRect();

  const xOffset = fromRect.left - toRect.left;
  const yOffset = fromRect.top - toRect.top;

  fromCell.style.transition = 'transform '+transitionTime+'ms ease-in-out';

  fromCell.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  fromCell.style.pointerEvents = 'none';

  setTimeout(() => {
    fromCell.style.transition = '';
    fromCell.style.transform = 'translate(0, 0)';
    fromCell.style.left = '0';
    fromCell.style.top = '0';

    fromCell.style.pointerEvents = 'auto';

    const temp = fromCell.textContent;
    fromCell.textContent = toCell.textContent;
    toCell.textContent = temp;
  }, transitionTime);
}

function mix(lastIndex = null, timeToLive = 25) {
  if (timeToLive <= 0) {
    return;
  }
  var tiles = getAdjacentTilesByEmpty();
  if (lastIndex != null) {
    tiles = tiles.filter(item => item !== lastIndex);
  }
  const tile =  tiles[Math.floor(Math.random() * tiles.length)];
  slideCell(tile, emptyCellIndex);
  lastIndex = emptyCellIndex;
  emptyCellIndex = tile;
  checkForWin();
  setTimeout(function() {
    mix(lastIndex, timeToLive-1)
  }, transitionTime);
}

function getAdjacentTilesByEmpty() {
  var tiles = [];
  cells.forEach((cell, index) => {
    if (areTilesAdjacent(index, emptyCellIndex)) {
      tiles.push(index)
    }
  });
  return tiles;
}

// win check
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    checkForWin();
  });
});
function checkForWin() {
  setTimeout(function() {
    var gridList = []
    cells.forEach((cell, index) => {
      gridList.push(parseInt(cell.textContent))
    });
    //console.log(gridList)
    for (let i = 0; i < gridList.length - 1; i++) {
      if (isNaN(gridList[i]) && !(i == gridList.length-1 || i == 0)) {
        statusBar.style.backgroundColor = "#ff7676";
        return;
      }
      if (gridList[i] > gridList[i + 1]) {
        statusBar.style.backgroundColor = "#ff7676";
        return;
      }
      statusBar.style.backgroundColor = "#51ff5f";
    }
  }, transitionTime);
}

// button animation
const buttons = document.querySelectorAll('.tools button');
buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 80);
  });
});
