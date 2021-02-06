let canvas;
const boxSize = 10;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('#canvas-window');
}

function draw() {
    background(255);
}

window.onresize = () => {
    resizeCanvas(window.innerWidth, window.innerHeight);
};

const drawBoard = (_boxSize, _width, _height, _color) => {
    stroke(_color);
    strokeWeight(4);
};