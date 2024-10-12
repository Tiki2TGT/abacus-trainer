document.addEventListener("DOMContentLoaded", () => {
    let topValues = Array(6).fill(0); // Default top row values (0)
    let bottomValues = Array(6).fill(0); // Default bottom row values (0)
    let mousedown = false;

document.addEventListener('mousedown', () => {
    mousedown = true;
    console.log(mousedown)
});

document.addEventListener('mouseup', () => {
    mousedown = false; 
    console.log(mousedown)
});
document.querySelectorAll('.top-row .column').forEach((column, colIndex) => {
    column.querySelectorAll('.space, .bead').forEach((grid, rowIndex) => {
        grid.addEventListener('mouseover', (event) => {
            event.preventDefault();
            // Check if the top row was clicked
            if (grid.dataset.row === 'top' && mousedown === true) {
                updateTopRow(colIndex, rowIndex);
            }
            updateDisplay();
        });
        grid.addEventListener('mousedown', (event) => {
            event.preventDefault();
            // Check if the top row was clicked
            if (grid.dataset.row === 'top') {
                updateTopRow(colIndex, rowIndex);
            }
            updateDisplay();
        });
    });
});

// Handle click events for the grid (bottom row)
document.querySelectorAll('.bottom-row .column').forEach((column, colIndex) => {
    column.querySelectorAll('.space, .bead').forEach((grid, rowIndex) => {
        grid.addEventListener('mouseover', (event) => {
            event.preventDefault();
            // Check if the bottom row was clicked
            if (grid.dataset.row === 'bottom' && mousedown === true) {
                updateBottomRow(colIndex, rowIndex);
            }
            updateDisplay();
        });
        grid.addEventListener('mousedown', (event) => {
            event.preventDefault();
            // Check if the bottom row was clicked
            if (grid.dataset.row === 'bottom') {
                updateBottomRow(colIndex, rowIndex);
            }
            updateDisplay();
        });
    });
});


    function updateTopRow(colIndex, rowIndex) {
        let column = document.querySelectorAll('.top-row .column')[colIndex];

        // Reset all grids to bead
        column.querySelectorAll('.space, .bead').forEach(grid => {
            grid.classList.remove('space');
            grid.classList.add('bead');
        });

        // Set the clicked grid to space
        let clickedGrid = column.querySelectorAll('.space, .bead')[rowIndex];
        clickedGrid.classList.remove('bead');
        clickedGrid.classList.add('space');

        // Update top row value
        topValues[colIndex] = rowIndex === 0 ? 5 : 0;
    }

    function updateBottomRow(colIndex, rowIndex) {
        let column = document.querySelectorAll('.bottom-row .column')[colIndex];

        // Reset all grids to bead
        column.querySelectorAll('.space, .bead').forEach(grid => {
            grid.classList.remove('space');
            grid.classList.add('bead');
        });

        // Set the clicked grid to space
        let clickedGrid = column.querySelectorAll('.space, .bead')[rowIndex];
        clickedGrid.classList.remove('bead');
        clickedGrid.classList.add('space');

        // Update bottom row value based on space position
        bottomValues[colIndex] = rowIndex;
    }

    function updateDisplay() {
        let combinedValues = topValues.map((topVal, colIndex) => {
            return topVal + bottomValues[colIndex];
        });

        // Display the combined array as a string
        document.getElementById('valueDisplay').textContent = combinedValues.join(', ');
    }
});
