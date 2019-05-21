// Board
//     Has 81 cells
//     Generates cells one by one
//     Checks Rows, Columns, and Sections for each cell
//         Eliminates used values from cell's value array
//         Chooses a value from remaining array
//     If any cell has an empty value array, reset it and go back a cell

// Cell
//     Row
//     Col
//     RowSect
//     ColSect
//     Values
//     Value

// GLOBAL VARIABLES
// ======================================

let board;


// CLASSES
// ======================================

class Board {
    constructor() {
        this.solution = [];
        this.cells = [];
    }

    getCells() {
        return this.cells;
    }

    getSolution() {
        return this.solution;
    }

    // Generates a new 9x9 Sudoku game
    getNewGame() {

        this.solution = [];
        let row = 0;
        let col = 0;
        let rowSect = 0;
        let colSect = 0;
        let limit = 0; // Sets upper limit to prevent infinite loop

        // Generate 81 new cells and populate solution
        while (this.solution.length < 81 && limit < 10000) {

            row = Math.floor(this.solution.length / 9);
            col = this.solution.length % 9;
            rowSect = Math.floor(row / 3);
            colSect = Math.floor(col / 3);

            let cell = new Cell(row, col);

            // Eliminate non-viable numbers from value array
            for (var c in this.solution) {

                // Check row
                if (this.solution[c].getRow() == row) {
                    cell.removeValueFromArray(this.solution[c].getValue());
                }

                // Check col
                if (this.solution[c].getCol() == col) {
                    cell.removeValueFromArray(this.solution[c].getValue());
                }

                // Check section
                if (this.solution[c].getRowSect() == rowSect && this.solution[c].getColSect() == colSect) {
                    cell.removeValueFromArray(this.solution[c].getValue());
                }
            }

            // If value array is empty, reset it and move back a cell
            if (cell.getValueArray().length == 0) {
                cell.resetValueArray();

                for (var i=0; i<9 && i<this.solution.length; i++) {
                    this.solution.pop();
                }
            }
            // If value array not empty, choose a value for cell
            else {
                cell.setValue();
                this.solution.push(cell);
            }

            limit += 1;
        }

        displayGame(this.solution);
    }
}

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.rowSect = Math.floor(row / 3);
        this.colSect = Math.floor(col / 3);
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.value = 0;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getRowSect() {
        return this.rowSect;
    }

    getColSect() {
        return this.colSect;
    }

    getValue() {
        return this.value;
    }

    getValueArray() {
        return this.values;
    }

    // Randomly selects value from value array
    // Splices chosen value from value array
    setValue() {
        let index = Math.floor(Math.random() * this.values.length);
        this.value = this.values[index];
        this.values.splice(index, 1);
    }

    removeValueFromArray(value) {
        let idx = this.values.indexOf(value);

        if (idx >= 0) {
            this.values.splice(idx, 1)
        };
    }

    // Resets value array to having full list of numbers
    resetValueArray() {
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

}


// FUNCTIONS
// ======================================

// Generates board with new Sudoku game
function createBoard() {
    board = new Board();
    board.getNewGame();
}

// Shows Sudoku game on screen
// Randomly chooses which squares to leave blank
function displayGame(solution) {

    let blanks = [];
    let b = 0;

    while (b < 81) {

        if (Math.random() > 0.5) {
            blanks.push(b.toString());
        }
        
        b += 1;
    }

    for (var cell in solution) {

        let background = "white";

        if (solution[cell].getRowSect() % 2 == 0 && solution[cell].getColSect() % 2 == 0) {
            background = "#efefef";
        }
        if (solution[cell].getRowSect() == 1 && solution[cell].getColSect() == 1) {
            background = "#efefef";
        }

        let text = "";
        
        if (blanks.indexOf(cell) == -1) {
            text = solution[cell].getValue();
        }

        let cellDiv = $("<input type='text'>")
            .addClass("cellDiv")
            .css("background", background)
            .attr("value", text);

        $("#sudoku")
            .append(cellDiv);
    }
}

// Displays solution on page
function showSolution(solution) {  

    $("#sudoku").empty();

    for (var cell in solution) {

        let cellDiv = $("<input type='text'>")
            .addClass("cellDiv")
            .attr("value", solution[cell].getValue());

        $("#sudoku")
            .append(cellDiv);
    }
}

createBoard();


// EVENT LISTENERS
// ======================================

$("#newGame").on("click", function() {
    $("#sudoku").empty();
    createBoard();
});

$("#showSolution").on("click", function() {
    let solution = board.getSolution();
    showSolution(solution);
});
