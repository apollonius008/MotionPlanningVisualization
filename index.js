"use strict";

let canvas;
const boxSize = 30;
let board;

// UI ELEMENTS
let customOption, randomOption,
editDoneBtn, startBtn, endBtn,
dijkstraOption, aStarOption,
visualizeBtn, resetBtn;

let ui_state;

let chosenAlgo = null;
let solver = null;
let startingX, startingY;
let endingX, endingY;

const timeStep = 0;
let timeDeposit = 0;
let iterator;

let pmouseCellX, pmouseCellY;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('#canvas-window');
    
    window.onresize = () => {
        resizeCanvas(window.innerWidth, window.innerHeight);
        initializeProgram();
    };
    
    initializeProgram();

}

function draw() {
    background(255);
    board.drawBoard(color(255));
    // console.log(mouseX, mouseY);
    
    if (ui_state == "edit env") {
        customEnviromentCreation();
    }
    else if (ui_state == "select start") {
        selectStartPosition();
    }
    else if (ui_state == "select end") {
        selectEndPosition();
    }
    else if (ui_state == "running") {
        if (timeDeposit >= timeStep) {
            iterator.next();
            timeDeposit -= timeStep;
            
            if (solver.solved) {
                ui_state = "done";
            }
        }
        else {
            timeDeposit += deltaTime;
        }
    }
}

function getUIElements() {
    customOption = select('#customizeOpt');
    randomOption = select('#randomizeOpt');
    editDoneBtn = select('#editDoneBtn');
    startBtn = select('#chooseStartBtn');
    endBtn = select('#chooseEndBtn')
    dijkstraOption = select('#dijkstraOpt');
    aStarOption = select('#aStarOpt');
    visualizeBtn = select('#visualiseBtn');
    resetBtn = select('#resetBtn');
}

function initializeUI() {
    customOption.mouseClicked(()=> {
        if (ui_state == "initial") {
            ui_state = "edit env";
            editDoneBtn.removeAttribute('disabled');
        }
    });

    randomOption.mouseClicked(() => {
        if (ui_state == "initial") {
            ui_state = "edit env";
            board.initRandomBoardState();
            ui_state = "env created";
            startBtn.removeAttribute('disabled');
            // console.log('random clickd');
        }
    });

    editDoneBtn.attribute('disabled', '');
    editDoneBtn.mouseClicked(() => {
        ui_state = "env created";
        editDoneBtn.attribute('disabled', '');
        startBtn.removeAttribute('disabled');
    });

    startBtn.attribute('disabled', '');
    startBtn.mouseClicked(() => {
        ui_state = "select start";
        startBtn.attribute('disabled', '');
    });

    endBtn.attribute('disabled', '');
    endBtn.mouseClicked(() => {
        ui_state = "select end";
        endBtn.attribute('disabled', '');
    });

    visualizeBtn.attribute('disabled', '');
    visualizeBtn.mouseClicked(() => {

        if (chosenAlgo == "Dijkstra Shortest Path") {
            visualizeBtn.attribute('disabled', '');
            solver = new DijkstraSolver(board, startingX, startingY, endingX, endingY);
            iterator = solver.solve(startingX, startingY);
        }
        else if(chosenAlgo == "A* Search") {
            visualizeBtn.attribute('disabled', '');
        }
        ui_state = "running";
        
        iterator.next();
    })

    dijkstraOption.mouseClicked(() => {
        chosenAlgo = "Dijkstra Shortest Path";
        
        if (ui_state == "full env set") {
            visualizeBtn.removeAttribute('disabled');
        }
    });

    aStarOption.mouseClicked(() => {
        chosenAlgo = "A* Search";
        
        if (ui_state == "full env set") {
            visualizeBtn.removeAttribute('disabled');
        }
    });

    resetBtn.mouseClicked(initializeProgram);
}

function initializeProgram() {
    board = new Board(width, height, boxSize, boxSize);
    getUIElements();
    initializeUI();
    ui_state = "initial";
}

function customEnviromentCreation() {
    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height)
        return;

    const mouseCellX = Math.floor(mouseX / board.cellWidth);
    const mouseCellY = Math.floor(mouseY / board.cellHeight);
    
    if (mouseIsPressed) {
        console.log(mouseCellX, mouseCellY, pmouseCellX, pmouseCellY);
        if (mouseCellX != pmouseCellX || mouseCellY != pmouseCellY) {
            
            if (board.getBoardState(mouseCellX, mouseCellY) == board.STATE_BLANK) {
                board.addObstacle(mouseCellX, mouseCellY);
                // console.log(mouseX, mouseY);
            }
            else {
                board.removeObstacle(mouseCellX, mouseCellY);
                // console.log(mouseX, mouseY);
            }
            
            pmouseCellX = mouseCellX;
            pmouseCellY = mouseCellY;
        }
    }
    else{
        fill(color(150, 0, 0, 150));
        rect(mouseCellX * board.cellWidth, mouseCellY * board.cellHeight, board.cellWidth, board.cellHeight);
    }
}

function selectStartPosition() {
    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height)
        return;

    const mouseCellX = Math.floor(mouseX / board.cellWidth);
    const mouseCellY = Math.floor(mouseY / board.cellHeight);
    
    if (mouseIsPressed) {
        board.setStartingPoint(mouseCellX, mouseCellY);
        ui_state = "selected start";
        endBtn.removeAttribute('disabled');
        startingX = mouseCellX;
        startingY = mouseCellY;
    }
    else{
        fill(color(150, 0, 0, 150));
        rect(mouseCellX * board.cellWidth, mouseCellY * board.cellHeight, board.cellWidth, board.cellHeight);
    }
}

function selectEndPosition() {
    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height)
        return;

    const mouseCellX = Math.floor(mouseX / board.cellWidth);
    const mouseCellY = Math.floor(mouseY / board.cellHeight);
    
    if (mouseIsPressed) {
        board.setEndingPoint(mouseCellX, mouseCellY);
        ui_state = "full env set";

        endingX = mouseCellX;
        endingY = mouseCellY;
        
        if (chosenAlgo != null) {
            visualizeBtn.removeAttribute('disabled');
        }
    }
    else{
        fill(color(150, 0, 0, 150));
        rect(mouseCellX * board.cellWidth, mouseCellY * board.cellHeight, board.cellWidth, board.cellHeight);
    }
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
//