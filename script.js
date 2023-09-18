const grid = document.getElementById('grid');
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach(item => {
    item.addEventListener('click', () => {
        const emptyCell = document.querySelector('.empty');
        const currentItemX = parseInt(item.getAttribute('data-x'));
        const currentItemY = parseInt(item.getAttribute('data-y'));
        const emptyCellX = parseInt(emptyCell.getAttribute('data-x'));
        const emptyCellY = parseInt(emptyCell.getAttribute('data-y'));

        if ((Math.abs(currentItemX - emptyCellX) === 1 && currentItemY === emptyCellY) ||
            (Math.abs(currentItemY - emptyCellY) === 1 && currentItemX === emptyCellX)) {
            // Swap the positions of the clicked item and the empty cell
            item.setAttribute('data-x', emptyCellX);
            item.setAttribute('data-y', emptyCellY);
            emptyCell.setAttribute('data-x', currentItemX);
            emptyCell.setAttribute('data-y', currentItemY);

            // Swap their visual positions using CSS Grid
            grid.insertBefore(emptyCell, item);
        }
    });
});
