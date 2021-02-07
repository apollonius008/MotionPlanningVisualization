"use strict";
/*
A class for board object
*/
class Board {

    constructor(screenWidth, screenHeight, cellWidth, cellHeight) {
        // All of the input arguments should be integers
        // Checking if they are integers
        if (!Number.isInteger(screenWidth) && screenWidth < 0) {
            console.error('screenWidth not a number. Value :', screenWidth, 'Type :', typeof(screenWidth));
        }
        if (Number.isInteger(screenHeight) && screenHeight < 0) {
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
        this.stateColor = [color('rgba(255, 255, 255, 255)'), color( 'rgba(0, 0, 0, 150)'), color('rgba(255, 0, 0, 255)' ), color( 'rgba(0, 255, 0, 255)')];
        
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
    
    isValidState(state) {
        if (Number.isInteger(state)) {
            return !(state < 0 || state >= this.stateColor.length);
        }
        
        return false;
    }
    
    // the given position is changed to starting position
    setStartingPoint(_x, _y) {
        if (this.isValidBoardPos(_x, _y)) {
            this.boardState[_y * this.cols + _x] = this.STATE_START;
        }
        else {
            console.error("(", _x, ',', _y, ') is a invalid board position');
        }
    }
    
    setEndingPoint(_x, _y) {
        if (this.isValidBoardPos(_x, _y)) {
            this.boardState[_y * this.cols + _x] = this.STATE_END;
        }
        else {
            console.error("(", _x, ',', _y, 'is a invalid board position');
        }
    }
    
    addObstacle(_x, _y) {
        if (this.isValidBoardPos(_x, _y)) {
            this.boardState[_y * this.cols + _x] = this.STATE_BLOCK;
        }
        else {
            console.error("(", _x, ',', _y, 'is a invalid board position');
        }
    }
    
    removeObstacle(_x, _y) {
        if (this.isValidBoardPos(_x, _y)) {
            this.boardState[_y * this.cols + _x] = this.STATE_BLANK;
        }
        else {
            console.error("(", _x, ',', _y, 'is a invalid board position');
        }
    }
    
    addState(myStateColor) {
        if (myStateColor.constructor == p5.Color) {
            this.stateColor.push(myStateColor);
            return this.stateColor.length - 1;
        }
        
        console.error(myStateColor, 'not of type color');
    }
    
    changeStateColor(state, myColor) {
        if (this.isValidState(state) && p5.Color === myColor.constructor) {
            this.stateColor[state] = myColor;
            return;
        }
        
        console.error("Error in arguments", state, myColor);
    }
    
    getBoardState(_x, _y) {
        if (this.isValidBoardPos(_x, _y)) {
            return this.boardState[_y * this.cols + _x];
        }
        
        console.error("(", _x, ',', _y, ") Invalid board position");
        return;
    }
    
    setBoardState(_x, _y, state) {
        if (!this.isValidBoardPos(_x, _y)) {
            console.error("(", _x, ',', _y, ") Invalid board position");
            return;
        }
        
        if (!this.isValidState(state)) {
            console.error(state, 'Invalid boardState');
            return;
        }
        
        this.boardState[_y * this.cols + _x] = state;
    }
    
    drawBoard(strokeColor) {
        stroke(strokeColor);
        strokeWeight(2);

        const screenWidth = this.cols * this.cellWidth;
        const screenHeight = this.rows * this.cellHeight;

        for (let i = 0; i <= this.cols; i++) {
            line(i * this.cellWidth, 0, i * this.cellWidth, screenHeight);
        }
        for (let i = 0; i <= this.rows; i++) {
            line(i * this.cellWidth, 0, i * this.cellWidth, screenWidth);
        }
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                fill(this.stateColor[this.boardState[y * this.cols + x]]);
                rect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
        noFill();
   }
    
   initRandomBoardState() {
       for (let y = 0; y < this.rows; y++) {
           for (let x = 0; x < this.cols; x++) {
               this.setBoardState(x, y, Math.floor(Math.random() * 2));
           }
       }
   }
    
};