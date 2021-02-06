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