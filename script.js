const statusBar = document.querySelector('#statusBar');
let emptyTileIndex = 15;
var transitionTime = 250;
var boardWidth = 4;
var boardHeight = 4;
var mixAmount = 25;

function addEventListeners() {
  // slide tile on click
  $('#grid .grid-tile').each(function(index, tile) {
    $(tile).on('click', function() {
      if (areTilesAdjacent(index, emptyTileIndex)) {
        slideTile(index, emptyTileIndex);
        emptyTileIndex = index;
      }
    });
  });
}
addEventListeners();

function areTilesAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / boardWidth);
  const col1 = index1 % boardWidth;
  const row2 = Math.floor(index2 / boardWidth);
  const col2 = index2 % boardWidth;

  return (
    (Math.abs(row1 - row2) === 1 && col1 === col2) ||
    (Math.abs(col1 - col2) === 1 && row1 === row2)
  );
}

function slideTile(fromIndex, toIndex) {
  const fromTile = $('#grid .grid-tile').get(fromIndex);
  const toTile = $('#grid .grid-tile').get(toIndex);

  const fromRect = fromTile.getBoundingClientRect();
  const toRect = toTile.getBoundingClientRect();

  const xOffset = fromRect.left - toRect.left;
  const yOffset = fromRect.top - toRect.top;

  fromTile.style.transition = 'transform '+transitionTime+'ms ease-in-out';

  fromTile.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  fromTile.style.pointerEvents = 'none';

  setTimeout(() => {
    fromTile.style.transition = '';
    fromTile.style.transform = 'translate(0, 0)';
    fromTile.style.left = '0';
    fromTile.style.top = '0';

    fromTile.style.pointerEvents = 'auto';
    
    //console.log("Moved "+fromTile.textContent+" ("+fromIndex+")")
    const temp = fromTile.textContent;
    fromTile.textContent = toTile.textContent;
    toTile.textContent = temp;
    checkForWin(); // completion check
  }, transitionTime);
}

function mix(lastIndex = null, timeToLive = mixAmount) {
  if (timeToLive <= 0) {
    return;
  }
  var tiles = getAdjacentTilesByEmpty();
  if (lastIndex != null) {
    tiles = tiles.filter(item => item !== lastIndex);
  }
  const tile =  tiles[Math.floor(Math.random() * tiles.length)];
  slideTile(tile, emptyTileIndex);
  lastIndex = emptyTileIndex;
  emptyTileIndex = tile;
  setTimeout(function() {
    mix(lastIndex, timeToLive-1)
  }, transitionTime);
}

function getAdjacentTilesByEmpty() {
  var tiles = [];
  $('#grid .grid-tile').each(function(index, tile) {
    if (areTilesAdjacent(index, emptyTileIndex)) {
      tiles.push(index)
    }
  });
  return tiles;
}

function checkForWin() {
  setTimeout(function() {
    var gridList = []
    $('#grid .grid-tile').each(function(index, tile) {
      gridList.push(parseInt(tile.textContent))
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

// on slider change
function changeBoardWidth(width) {
  boardWidth = width;
  $('#grid').empty()
  for (var i = 0; i <= boardWidth*boardHeight-1; i++) {
    if (i != boardWidth*boardHeight-1) {
      var tileHtml = '<div class="grid-tile" id="tile-' + i + '">' + (i + 1) + '</div>';
      $('#grid').append(tileHtml);
    } else {
      var tileHtml = '<div class="grid-tile" id="tile-' + i + '"></div>';
      $('#grid').append(tileHtml);
    }
  }
  emptyTileIndex = boardWidth*boardHeight-1;
  $('#grid').css('grid-template-columns', 'repeat('+boardWidth+', 1fr)');
  $('#grid').css('width', 100*boardWidth+15*(boardWidth-1)+'px');
  addEventListeners();
}
function changeBoardHeight(height) {
  boardHeight = height;
  $('#grid').empty()
  for (var i = 0; i <= boardWidth*boardHeight-1; i++) {
    if (i != boardWidth*boardHeight-1) {
      var tileHtml = '<div class="grid-tile" id="tile-' + i + '">' + (i + 1) + '</div>';
      $('#grid').append(tileHtml);
    } else {
      var tileHtml = '<div class="grid-tile" id="tile-' + i + '"></div>';
      $('#grid').append(tileHtml);
    }
  }
  emptyTileIndex = boardWidth*boardHeight-1;
  $('#grid').css('height', 100*boardHeight+15*(boardHeight-1)+'px');
  addEventListeners();
}
function changeAnimationSpeed(speed) {
  transitionTime = speed;
}
function changeMixAmount(amount) {
  mixAmount = amount;
}