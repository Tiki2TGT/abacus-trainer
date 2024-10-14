//document.addEventListener("DOMContentLoaded", () => {
    const columns = document.querySelectorAll('.column'); // Replace '.column' with the appropriate selector
    let columnCount = 0;

    for (let i = 0; i < columns.length; i++) {
    columnCount++;
    }
    
    const columnamount = columnCount/2
    let topValues = Array(columnamount).fill(0); // Default top row values (0)
    let bottomValues = Array(columnamount).fill(0); // Default bottom row values (0)
    let mousedown = false;

document.addEventListener('mousedown', () => {
    mousedown = true;
});

document.addEventListener('mouseup', () => {
    mousedown = false; 
});
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
            console.log('test')
            textvalues.shift()
        }

 
        numberInput.value = textvalues.join('');
    }

    // Get references to the input box and the button
const numberInput = document.getElementById('numberInput');
let lastinput = ''
// Add an event listener to the button
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

//numberInput.addEventListener('input', () => {
//    console.log('Text box value has changed:', numberInput.value);
//  });
//
// Function to update the abacus based on the input value
function updateAbacus(value) {  
    let arrayValue = Array.from(String(value), Number);
    while (arrayValue.length < columnamount) {
        arrayValue.unshift(0)
    }

    for (let i = 0; i < arrayValue.length; i++) {
        if (arrayValue[i] >= 5 ) {
            updateTopRow(i,0);
            arrayValue[i] = arrayValue[i]-5;
        } else {
            updateTopRow(i,1)
        };
        if (arrayValue[i] <= 4) {
            updateBottomRow(i, arrayValue[i])
            arrayValue[i] = 0
        } else {
            updateBottomRow(i,0)
        }
    }
    
    let combinedValues = topValues.map((topVal, colIndex) => {
        return topVal + bottomValues[colIndex];
    });

    // Display the combined array as a string
    document.getElementById('valueDisplay2').textContent = topValues.join(' ');
    document.getElementById('valueDisplay3').textContent = bottomValues.join(' ');
    document.getElementById('valueDisplay').textContent = combinedValues.join(' ');

}

//});
