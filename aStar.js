"use strict";

class AStar {

    constructor(_board, _startingX,_startingY, _endingX, _endingY) {
        this.board = _board;
        this.startingX = _startingX;
        this.startingY = _startingY;
        this.endingX = _endingX;
        this.endingY = _endingY;
        
        this.STATE_CHECKED = this.board.addState(color('#88c0d0'));
        this.STATE_VISITED = this.board.addState(color('#5e81ac'));
        this.STATE_PATH = this.board.addState(color('#b48ead'));

        this.minDist = [];
        this.visitedCell = [];
        this.parentCellX = [];
        this.parentCellY = [];
        this.distanceLeft = [];
        for (let y = 0; y < this.board.rows; y++) {
            for (let x = 0; x < this.board.cols; x++) {
                this.minDist[y * this.board.cols + x] = Infinity;
                this.visitedCell[y * this.board.cols + x] = false;
                this.parentCellX[y * this.board.cols + x] = null;
                this.parentCellY[y * this.board.cols + x] = null;
                
                const xDiff = Math.abs(endingX - x);
                const yDiff = Math.abs(endingY - y);
                
                if (xDiff <= yDiff) {
                    this.distanceLeft[y * this.board.cols + x] = xDiff + Math.abs(yDiff - xDiff);
                }
                else {
                    this.distanceLeft[y * this.board.cols + x] = yDiff + Math.abs(yDiff - xDiff);
                }
            }
        }
        this.minDist[this.startingX + this.startingY * this.board.cols] = 0;
        this.solved = false;;
    }
    
    markVisited(_x, _y) {
        this.visitedCell[_y * this.board.cols + _x] = true;
        this.board.setBoardState(_x, _y, this.STATE_VISITED);
    }
    
    isVisited(_x, _y) {
        return this.visitedCell[_y * this.board.cols + _x]; 
    }
    
    setMinDist(_x, _y, dist) {
        this.minDist[_x + _y * this.board.cols] = dist;
    }
    
    getMinDist(_x, _y) {
        return this.minDist[_x + _y * this.board.cols];
    }
    
    relax(_x, _y, _px, _py) {
        if (this.getMinDist(_px, _py) + 1 < this.getMinDist(_x, _y)) {
            const index = _x + _y * this.board.cols;
            this.minDist[index] = this.getMinDist(_px, _py) + 1;

            this.parentCellX[index] = _px;
            this.parentCellY[index] = _py;
        }
        
        this.board.setBoardState(_x, _y, this.STATE_CHECKED);
    }
    
   * solve(sX, sY) {
        this.markVisited(sX, sY);
        yield;

        if (this.isVisited(this.endingX, this.endingY)) {
            let cellX = this.endingX;
            let cellY = this.endingY;

            while(cellX != null) {
                this.board.setBoardState(cellX, cellY, this.STATE_PATH);
                
                const index = cellY * this.board.cols + cellX;
                cellX = this.parentCellX[index];
                cellY = this.parentCellY[index];
                
                this.solved = true;
            }
            
            yield;
        }
       
        let x, y;
       
        x = sX - 1;
        y = sY - 1;
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }
        
        x = sX - 1;
        y = sY; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }

        x = sX - 1;
        y = sY + 1; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }

        x = sX; 
        y = sY - 1; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }

        x = sX; 
        y = sY + 1; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }

        x = sX + 1; 
        y = sY - 1; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }
        x = sX + 1; 
        y = sY; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }
        x = sX + 1; 
        y = sY + 1; 
        
        if (!this.isVisited(x, y) && this.board.isValidBoardPos(x, y) && this.board.getBoardState(x, y) != this.board.STATE_BLOCK) {
            this.relax(x, y, sX, sY);
            this.board.setBoardState(x, y, this.STATE_CHECKED);
        }
       
        
       let minimumDistence = Infinity;
       let newSX = null, newSY = null;
        for (y = 0; y < this.board.rows; y++) {
            for (x = 0; x < this.board.cols; x++) {
                if (!this.isVisited(x, y) && this.getMinDist(x, y) + this.distanceLeft[y * this.board.cols + x]< minimumDistence) {
                    minimumDistence = this.getMinDist(x, y) + this.distanceLeft[y * this.board.cols + x];
                    newSX = x;
                    newSY = y;
                }
            }
        }
                
        if (newSX != null) {
            yield* this.solve(newSX, newSY);
        }
        else {
            this.solved = true;
            console.log(newSX, newSY);
        }
       
   }
}