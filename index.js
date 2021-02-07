"use strict";

let canvas;
const boxSize = 15;
let board;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('#canvas-window');
    
    window.onresize = () => {
        resizeCanvas(window.innerWidth, window.innerHeight);
    };
}

function draw() {
    background(255);
    //board.drawBoard(color(0));
}


// function boardTestInit(){
//     //Code for testing board.js
//     board = new Board(width, height, boxSize, boxSize);
//     for (let y = 0; y < board.rows; y++) {
//         for (let x = 0; x < board.cols; x++) {
//             board.setBoardState(x, y, Math.floor(Math.random() * 2));
//         }
//     }
//     board.setStartingPoint(Math.floor(Math.random() * board.cols), Math.floor(Math.random() * board.rows));
//     board.setEndingPoint(Math.floor(Math.random() * board.cols), Math.floor(Math.random() * board.rows));
//     board.changeStateColor(board.STATE_BLOCK, color(100))
// }