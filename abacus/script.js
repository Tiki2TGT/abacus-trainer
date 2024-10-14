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
        console.log(textvalues)
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
        console.log(numberInput.value);
        let inputValue = parseInt(numberInput.value, 10); // Get the input value as an integer
        if (!isNaN(inputValue) && inputValue >= 0 && numberInput.value.length <= columnamount) { // Check if the input is a valid non-negative number
            updateAbacus(inputValue); // Call the function to update the abacus
            lastinput = inputValue;
        } else if (numberInput.value === ''){
            lastinput = 0
        } else {
            alert('Please enter a valid number.'); // Alert for invalid input
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
    


//});
