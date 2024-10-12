document.addEventListener("DOMContentLoaded", () => {
    let topValues = Array(6).fill(0); // Default top row values (0)
    let bottomValues = Array(6).fill(0); // Default bottom row values (0)
    let isMouseDown = false; // Track if the mouse button is held down

    // Function to handle hover update
    function handleHoverUpdate(grid, colIndex, rowIndex) {
        if (grid.dataset.row === 'top') {
            updateTopRow(colIndex, rowIndex);
        } else if (grid.dataset.row === 'bottom') {
            updateBottomRow(colIndex, rowIndex);
        }
        updateDisplay();
    }

    // Handle mousedown events for starting the hover
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    // Handle mouseup events for stopping the hover
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Handle mouseenter events for the grid (top and bottom rows)
    document.querySelectorAll('.top-row .column, .bottom-row .column').forEach((column, colIndex) => {
        column.querySelectorAll('.space, .bead').forEach((grid, rowIndex) => {
            grid.addEventListener('mouseenter', (event) => {
                if (isMouseDown) {
                    handleHoverUpdate(grid, colIndex, rowIndex);
                }
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
