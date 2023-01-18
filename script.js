//Initia Data
let currentColor = 'black';
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let canEraser = false;
let cleaned = false;
let mouseX = 0;
let mouseY = 0;

//Events
ajustScreen();
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', colorClick);
});
document.querySelectorAll('.colorArea.toolOptions .tool').forEach(tool => {
    tool.addEventListener('click', toolsClick);
})
document.querySelector('.tool.resize').addEventListener('click', () => {
    location.reload();
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.tool.eraser').addEventListener('click', ()=>{
    canEraser = true;
    currentColor = '';
    screen.style.cursor = 'url("eraser-solid.svg"), auto';
});
document.querySelector('.tool.pencil').addEventListener('click', () => {
    canEraser = false;
    cleaned = false;
    screen.style.cursor = 'crosshair';
});
document.querySelector('.tool.clear').addEventListener('click', () => {
    canEraser = false;
    canDraw = false;
    cleaned = true;
});
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelectorAll('.tool').forEach(item => {
    item.addEventListener('mouseover', () => {
        let top = item.offsetTop;
        let span = item.querySelector('span');
        span.style.top = `${top + 40}px`;
        span.style.display = 'block';
    });
});

//Functions
function colorClick(e) {
    currentColor = e.target.getAttribute('data-color');
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}
function toolsClick(e) {
    screen.style.cursor = 'crosshair';
    document.querySelector('.tool.active').classList.remove('active');
    let div = e.target.parentNode;
    div.classList.add('active');
}
function mouseDownEvent(e) {
    if (cleaned === false) {
        canDraw = true;
        mouseX = e.pageX - screen.offsetLeft;
        mouseY = e.pageY - screen.offsetTop;
    }
}
function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}
function mouseUpEvent() {
    canDraw = false;
}
function draw(x, y) {
    console.log('Está desenhando!');
    console.log(`Draw: ${canDraw}`);
    console.log(`Eraser: ${canEraser}`);
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    if(canEraser) {
        ctx.globalCompositeOperation = "destination-out"; //apaga o que foi desenhado
        ctx.lineWidth = 10;
    } else {
        ctx.globalCompositeOperation = "source-over"
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
    }
    
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//Functions to resizes
function ajustScreen() {
    let canvas = document.querySelector('.canvas');
    let canvasArea = getComputedStyle(canvas);
    screen.width = parseInt(canvasArea.getPropertyValue('width'));
    screen.height = (parseInt(canvasArea.getPropertyValue('height')) - 32);
}