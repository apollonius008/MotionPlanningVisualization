"use strict";

class DijkstraSolver {

    constructor(_board, _startingPoint, _endingPoint) {
        this.board = _board;
        this.startingPoint = _startingPoint;
        this.endingPoint = _endingPoint;

        this.minDist = [];
        this.visitedCell = [];
        for (let y = 0; y < this.board.rows; y++) {
            for (let x = 0; x < this.board.cols; x++) {
                this.minDist[y * this.board.cols + x] = Infinity;
                this.visitedCell[y * this.board.cols + x] = false;
            }
        }
    }
    
    
}