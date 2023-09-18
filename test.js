const cells = document.querySelectorAll('.grid-cell');
let emptyCellIndex = 0;

// Add click event listeners to the neighbor cells
cells.forEach((cell, index) => {
    if (index !== emptyCellIndex || true) {
        cell.addEventListener('click', () => {
            if (areTilesAdjacent(index, emptyCellIndex)) {
                slideCell(index, emptyCellIndex);
                emptyCellIndex = index;
            }
        });
    }
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

  fromCell.style.transition = 'transform 0.2s ease-in-out';

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
  }, 200);
}

