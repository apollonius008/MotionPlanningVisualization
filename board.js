"use strict";
import {Point} from "./cell.js"
/*
A class for board object
*/
class Board {

    constructor(screenWidth, screenHeight, cellWidth, cellHeight) {
        if (Number.isNaN(screenWidth)) {
            console.error('screenWidth not a number. Value :', screenWidth, 'Type :', typeof(screenWidth));
        }
        if (Number.isNaN(screenHeight)) {
            console.error('screenHeight not a number. Value :', screenHeight, 'Type :', typeof(screenHeight));
        }
        if (Number.isNaN(cellWidth)) {
            console.error('cellWidth not a number. Value :', cellWidth, 'Type :', typeof(cellWidth));
        }
        if (Number.isNaN(cellHeight)) {
            console.error('cellHeight not a number. Value :', cellHeight, 'Type :', typeof(cellHeight));
        }

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.rows = Math.floor(screenHeight / cellHeight);
        this.cols = Math.floor(screenWidth / cellWidth);
        this.startingPos = null;
        this.endingPos = null;
        this.obstacleList = [];
    }
    
    setStartingPosition(_x, _y) {
        this.startingPos = new Point(_x, _y);
    }
    
    setEndingPosition(_x, _y) {
        this.endingPos = new Point(_x, _y);
    }
    
    addObstacle(_x, _y) {
        const p = new Point(_x, _y);
        // if the obstacle is already in list no need to add it
        // The for loop checks if the point is in list
        for (let i = 0; i < this.obstacleList.length; i++) {
            if (p.equal(this.obstacleList[i]))
                return;
        }
        
        // if the point is not in list add it to list
        this.obstacleList.push(p);
    }
}