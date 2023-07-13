let circleQty = 100;
let bigCircleSize = 200;
let smallCircleSize = 2;
let bigCircleCenterX;
let bigCircleCenterY;
let relativeSize = 1;
let randomness = 8;

function setup() {
  createCanvas(windowWidth,windowHeight);
  changeRelativeSize(1)
  runDrawFunc();
}

function draw() {

}

function changeRelativeSize(size){
  relativeSize = size;
  runDrawFunc();
}

function changeSmallCircleSize(size){
  smallCircleSize = size;
  runDrawFunc();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  runDrawFunc();
}

function runDrawFunc(){
  drawCirclesInGrid();
  updateInfos();
}

function drawCirclesInGrid(){
  circleQty = 0;
  background(0);
  bigCircleCenterX = width/2;
  bigCircleCenterY = height/2;
  //circle(bigCircleCenterX,bigCircleCenterY,bigCircleSize);
  let relBigCircleSize = bigCircleSize * relativeSize;
  let relSmallCircleSize = smallCircleSize * relativeSize;
  let relRandomness = randomness * relativeSize;
  noStroke();
  fill(0);
  for(let currentX = bigCircleCenterX-relBigCircleSize/2; currentX<width; currentX = currentX+relSmallCircleSize*2) {
    for(let currentY = bigCircleCenterY-relBigCircleSize/2; currentY<height; currentY = currentY+relSmallCircleSize*2) {
      if(dist(currentX,currentY,bigCircleCenterX,bigCircleCenterY) < relBigCircleSize/2){
        //circle(currentX,currentY,2);
        let a = new CircleS(currentX+random(0,relRandomness),currentY+random(0,relRandomness),relSmallCircleSize*2);
        a.color(255,255,255);
        a.show();
        circleQty++;
      }
    }
  }
}

function updateInfos(){
  document.querySelector("#circlesQty").innerHTML = circleQty;
  document.querySelector("#circlesSize").innerHTML = smallCircleSize;
}