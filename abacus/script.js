//document.addEventListener("DOMContentLoaded", () => {
    //random constants
    const columns = document.querySelectorAll('.column'); // Replace '.column' with the appropriate selector
    let columnCount = 0;
    for (let i = 0; i < columns.length; i++) {
    columnCount++;
    }
    const columnamount = columnCount/2
    let topValues = Array(columnamount).fill(0); // Default top row values (0)
    let bottomValues = Array(columnamount).fill(0); // Default bottom row values (0)
    let mousedown = false;
//mouseup, mousedown detection
document.addEventListener('mousedown', () => {
    mousedown = true;
});
document.addEventListener('mouseup', () => {
    mousedown = false; 
});

// Handle click events for the grid (top row)
document.querySelectorAll('.top-row .column').forEach((column, colIndex) => {
    column.querySelectorAll('.space, .bead').forEach((grid, rowIndex) => {
        grid.addEventListener('mouseover', (event) => {
            event.preventDefault();
            // Check if the top row was clicked
            if (grid.dataset.row === 'top' && mousedown === true) {
                updateTopRow(colIndex, rowIndex);
                updateDisplay();
            }
            
        });
        grid.addEventListener('mousedown', (event) => {
            event.preventDefault();
            // Check if the top row was clicked
            if (grid.dataset.row === 'top') {
                updateTopRow(colIndex, rowIndex);
                updateDisplay();
            }
            
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
                updateDisplay();
            }
            
        });
        grid.addEventListener('mousedown', (event) => {
            event.preventDefault();
            // Check if the bottom row was clicked
            if (grid.dataset.row === 'bottom') {
                updateBottomRow(colIndex, rowIndex);
                updateDisplay();
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
        document.getElementById('valueDisplay2').textContent = topValues.join(' ');
        document.getElementById('valueDisplay3').textContent = bottomValues.join(' ');
        document.getElementById('valueDisplay').textContent = combinedValues.join(' ');
        let textvalues = combinedValues;
        while (textvalues[0] < 1) {
            textvalues.shift()
        }

 
        numberInput.value = textvalues.join('');
    }

    //number input to abacus code
    const numberInput = document.getElementById('numberInput');
    const resetbutton = document.getElementById('resetbutton');
    let lastinput = ''
    numberInput.addEventListener('input', () => {
        let inputValue = parseInt(numberInput.value, 10); // Get the input value as an integer
        if (!isNaN(inputValue) && inputValue >= 0 && numberInput.value.length <= columnamount) { // Check if the input is a valid non-negative number
            updateAbacus(inputValue); // Call the function to update the abacus
            lastinput = inputValue;
        } else if (numberInput.value === ''){
            lastinput = 0
        } else {
            numberInput.value = lastinput;
        }
    });
    resetbutton.addEventListener('click', () => {
        updateAbacus(0);
        numberInput.value=0;
    });

    function updateAbacus(value) {  
        let arrayValue = Array.from(String(value), Number);
        
        // Fill with leading zeros
        while (arrayValue.length < columnamount) {
            arrayValue.unshift(0);
        }
    
        arrayValue.forEach((digit, i) => {
            let top = digit >= 5 ? 5 : 0;
            let bottom = digit >= 5 ? digit - 5 : digit;
            
            updateTopRow(i, top === 5 ? 0 : 1);
            updateBottomRow(i, bottom);
        });
        
        let combinedValues = topValues.map((topVal, colIndex) => {
            return topVal + bottomValues[colIndex];
        });

        // Display the combined array as a string
        document.getElementById('valueDisplay2').textContent = topValues.join(' ');
        document.getElementById('valueDisplay3').textContent = bottomValues.join(' ');
        document.getElementById('valueDisplay').textContent = combinedValues.join(' ');

    }

    //hotkey time
    document.addEventListener('keydown', (event) => {
        if (document.activeElement === numberInput) {
        } else {
        if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'].includes(event.key)) {
            event.preventDefault();
        }  // Prevent default behavior of function keys
    
        const keyMap = {
            'F1': { type: 'top', column: 0 }, '2': { type: 'bottom', column: 0, beads: 1 }, 'w': { type: 'bottom', column: 0, beads: 2 }, 's': { type: 'bottom', column: 0, beads: 3 }, 'x': { type: 'bottom', column: 0, beads: 4 },
            'F2': { type: 'top', column: 1 }, '3': { type: 'bottom', column: 1, beads: 1 }, 'e': { type: 'bottom', column: 1, beads: 2 }, 'd': { type: 'bottom', column: 1, beads: 3 }, 'c': { type: 'bottom', column: 1, beads: 4 },
            'F3': { type: 'top', column: 2 }, '4': { type: 'bottom', column: 2, beads: 1 }, 'r': { type: 'bottom', column: 2, beads: 2 }, 'f': { type: 'bottom', column: 2, beads: 3 }, 'v': { type: 'bottom', column: 2, beads: 4 },
            'F4': { type: 'top', column: 3 }, '5': { type: 'bottom', column: 3, beads: 1 }, 't': { type: 'bottom', column: 3, beads: 2 }, 'g': { type: 'bottom', column: 3, beads: 3 }, 'b': { type: 'bottom', column: 3, beads: 4 },
            'F5': { type: 'top', column: 4 }, '6': { type: 'bottom', column: 4, beads: 1 }, 'y': { type: 'bottom', column: 4, beads: 2 }, 'h': { type: 'bottom', column: 4, beads: 3 }, 'n': { type: 'bottom', column: 4, beads: 4 },
            'F6': { type: 'top', column: 5 }, '7': { type: 'bottom', column: 5, beads: 1 }, 'u': { type: 'bottom', column: 5, beads: 2 }, 'j': { type: 'bottom', column: 5, beads: 3 }, 'm': { type: 'bottom', column: 5, beads: 4 }
          };
        const mapping = keyMap[event.key];
    if (mapping) {
        if (mapping.type === 'top') {
            toggleTopBead(mapping.column); // Toggle the top bead between 0 and 1
        } else if (mapping.type === 'bottom') {
            toggleBottomBeads(mapping.column, mapping.beads); // Toggle the bottom beads
        }
        updateDisplay();
    }}
});

function toggleTopBead(column) {
    // Toggles the top bead between 0 and 1
    topValues[column] = topValues[column] === 0 ? 5 : 0;
    updateTopRow(column, topValues[column] === 5 ? 0 : 1);
}

function toggleBottomBeads(column, beads) {
    // This function toggles the selected number of beads for the bottom row.
    const currentBottomValue = bottomValues[column];
    
    if (currentBottomValue < beads) {
        // If there are fewer beads already up, push the required number up
        bottomValues[column] = beads;
    } else {
        // If the required beads are already up, pull them down by one
        bottomValues[column] = beads-1;
    }

    // Update the abacus display accordingly
    updateBottomRow(column, bottomValues[column]);
    
}
    
    


//});
