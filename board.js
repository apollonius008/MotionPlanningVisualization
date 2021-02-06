"use strict";
/*
A class for board object
*/
class Board {

    constructor(screenWidth, screenHeight, cellWidth, cellHeight) {
        // All of the input arguments should be integers
        // Checking if they are integers
        if (!Number.isInteger(screenWidth)) {
            console.error('screenWidth not a number. Value :', screenWidth, 'Type :', typeof(screenWidth));
        }
        if (Number.isInteger(screenHeight)) {
            console.error('screenHeight not a number. Value :', screenHeight, 'Type :', typeof(screenHeight));
        }
        //additionally cellWidth and cellHeight cannot be zero
        // This also checks for division by zero erroir
        if (Number.isInteger(cellWidth) && cellWidth == 0) {
            console.error('cellWidth not a number. Value :', cellWidth, 'Type :', typeof(cellWidth));
        }
        if (Number.isInteger(cellHeight) && cellHeight == 0) {
            console.error('cellHeight not a number. Value :', cellHeight, 'Type :', typeof(cellHeight));
        }

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        
        //calculates the no of rows and columns from screenWidth, cellWidth, screenHeight and cellHeight
        this.rows = Math.floor(screenHeight / cellHeight);
        this.cols = Math.floor(screenWidth / cellWidth);
        
        // a mapping which contains the map from state(int) to color
        // A array is used for mapping
        // index represents the state number and the value represents the color for the state
        // 0 -> Blank state, 1 -> Obstacle, 2 -> starting Pos, 3 -> Ending Pos
        this.stateColor = [color('rgba(0, 0, 0, 0)'), color( 'rgba(255, 255, 255, 0)'), color('rgba(255, 0, 0, 0)' ), color( 'rgba(0, 255, 0, 0)')];
        
        //remembering the number of every board state is hard so these variables are used
        this.STATE_BLANK = 0;
        this.STATE_BLOCK = 1;
        this.STATE_START = 2;
        this.STATE_END = 3;

        // a flattened 2D array containing board state for all board positions
        // initializing all positions with 0 i.e. blank state
        this.boardState = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.boardState[y * this.cols + x] = this.STATE_BLANK;
            }
        }
    }
    
    // checks if a board position given is valid or not
    // The pos is invalid if any of the arguments are non integers
    // Board postions are bounded between 0 and row - 1, col - 1
    isValidBoardPos(_x, _y) {
        if (Number.isInteger(_x) && Number.isInteger(_y)) {
            return !(_x < 0 || _x >= this.cols || _y < 0 || _y >= this.rows);
        }
        
        return false;
    }
}