let circleQty = 100;
let bigCircleSize = 200;
let smallCircleSize = 2;
let marginCircleSize = 2;
let bigCircleCenterX = 0;
let bigCircleCenterY = 0;
let zoomFactor = 1;
let randomness = 3;
let currentPalette = 0;
let overlappingOption = true;
let backgroundColor = 0;

let circles = []

const State = {
  CirclePacking: "CirclePacking",
  CircleGrid: "CircleGrid"
}
let currentState = State.CircleGrid;

let colorPalette = [
  ["#FFFFFF"],
  ["#FD2E5A","#FDE503","#1E99D2","#705791","#FE3509","#FD6E89","#7FB03B"],
  ["#B12B2B","#DAA12F","#2D6A86","#23143D","#246B53","#D1F0E0"],
  ["#F1EEEC","#25242A","#F2E5D3","#117989","#DBA799","#58AEBB"],
  ["#C94A01","#C2B09D"],
  ["#44B6C1","#E9BC44","#B8433D","#332B82"],
  ["#694BC3","#40B7BF","#47C2A1","#CB8962"],
  ["#822B5E","#EEE8CD","#1F1849"],
  ["#803295","#6A9CCD","#79AAD2","#010304"],
  ["#000000","#1C2A0E","#391D13","#391413"],
  ["#88CDD7","#D69285","#D1A075","#2F748E","#E4EFF6"],
  ["#A3A7E0","#608A2E","#316020","#B4C653","#C65553","#F9F7FC"],
  ["#0B0904","#3698A1","#FAF2F0","#C4A94F","#B46A3C"],
  ["#3872A8","#1F3E5C","#2F378E","#CB62C5","#DDECF4"],
  ["#BB9A3E","#9D8434","#6B5A24","#DFC89F"],
  ["#573EBB","#3C56B4","#D0BAE8","#E3ABD3"],
  ["#2D2C4C","#0060D8","#E71192"],
  ["#24213D","#FB0060","#06AFD6"],
  ["#24213D","#06AFD6","#DFA900"],
  ["#24213D","#FB0060","#06AFD6","#DFA900"],
  ["#24213D","#06AFD6","#DFA900"],
  ["#0F0D05","#FBEFEA","#F00F0F"],
  ["#A87438","#B0663B"] // "#A46E37"]
];

function setup() {
  createCanvas(windowWidth,windowHeight);
  createUIPalette();
  runGenerateDrawFunc();
}

function draw() {

}

function changeZoomFactor(size){
  zoomFactor = parseInt(size);
  runDrawFunc();
}

function changeSmallCircleSize(size){
  smallCircleSize = parseInt(size);
  runGenerateDrawFunc();
}

function changeCircleMargin(margin){
  marginCircleSize = parseInt(margin);
  runGenerateDrawFunc();
}

function changeGridRandomness(rand){
  randomness = parseInt(rand);
  runGenerateDrawFunc();
}

function changeOverlappingOption(overlapping){
  overlappingOption = overlapping;
  (overlapping)? currentState = State.CircleGrid : currentState = State.CirclePacking;
  runGenerateDrawFunc();
  changeUIState();
}

function selectPalette(paletteNr){
  currentPalette = paletteNr;
  changeRandomColorsFromPalette(colorPalette[currentPalette]);
  runDrawFunc();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  runDrawFunc();
}

function runDrawFunc(){
  background(backgroundColor);
  push();
    translate(width/2,height/2);
    scale(zoomFactor);
    drawAllCircles();
  pop();
}

function runGenerateDrawFunc(){
  if(currentState == State.CircleGrid){
    generateCirclesInGrid(true);
  } else if(currentState == State.CirclePacking){
    generateCirclePacking(true);
  }
  updateInfos();
}

function drawAllCircles(){
  circles.forEach(element => {
    element.show();
  });
}

function changeRandomColorsFromPalette(palette){
  let color;
  circles.forEach(element => {
    color = hexToRgb(palette[Math.floor(random(0,palette.length))]);
    element.color(color.levels[0],color.levels[1],color.levels[2]);
  });
}

function generateCirclesInGrid(drawAlso = true){
  circles = [];
  background(backgroundColor);

  //circle(bigCircleCenterX,bigCircleCenterY,bigCircleSize);

  noStroke();
  fill(backgroundColor);
  for(let currentX = -bigCircleSize/2; currentX<bigCircleSize/2; currentX = currentX+smallCircleSize) {
    for(let currentY = -bigCircleSize/2; currentY<bigCircleSize/2; currentY = currentY+smallCircleSize) {
      if(dist(0,0,currentX,currentY) < bigCircleSize/2){
        let currentCircle = new CircleS(currentX+random(0,randomness)-randomness/2,currentY+random(0,randomness)-randomness/2,smallCircleSize);
        let color = hexToRgb(colorPalette[currentPalette][Math.floor(random(0,colorPalette[currentPalette].length))]);
        currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
        if(drawAlso){
          push();
            translate(width/2,height/2);
            scale(zoomFactor);
            currentCircle.show();
          pop();
        }
        circles.push(currentCircle);
      }
    }
  }
}

function generateCirclePacking(drawAlso = true){
  circles = [];
  background(backgroundColor);

  noStroke();
  fill(0);

  let failTimesLimit = 30;
  let currentTimeFailed = failTimesLimit;
  let randomPoint;
  while(currentTimeFailed>0){
    randomPoint = getRandomPointInsideCircle();

    if(circles.length == 0 || isEnoughSpaceInCircles(randomPoint)){
      let currentCircle = new CircleS(randomPoint.x,randomPoint.y,smallCircleSize);
      currentTimeFailed = failTimesLimit;
      let color = hexToRgb(colorPalette[currentPalette][Math.floor(random(0,colorPalette[currentPalette].length))]);
      currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
      if(drawAlso){
        push();
          translate(width/2,height/2);
          scale(zoomFactor);
          currentCircle.show();
        pop();
      }
      circles.push(currentCircle);
    } else {
      currentTimeFailed--;
    }
  }
}

function isEnoughSpaceInCircles(point){
  let isEnoughSpace = true;
  for(let i=0; i<circles.length; i++){
    if(dist(point.x, point.y, circles[i].x, circles[i].y) < smallCircleSize + marginCircleSize){
      return false;
    }
  }
  return isEnoughSpace;
}

function getRandomPointInsideCircle(){
  let angle = random(0, 2*PI);
    
  // https://programming.guide/random-point-within-circle.html
  // we use square root of random for equal distribution of points from the center
  let r = bigCircleSize/2 * sqrt(random(0, 1));
  
  let x = r * cos(angle);
  let y = r * sin(angle);

  return createVector(x, y);
}

function updateInfos(){
  document.querySelector("#circlesQty").innerHTML = circles.length;
  document.querySelector("#circlesSize").innerHTML = smallCircleSize;
}

function createUIPalette(){
  let paletteEl = document.querySelector("#palette");
  for(let i=0; i<colorPalette.length; i++){
    let singlePalette = "";
    for(let j=0; j<colorPalette[i].length; j++){
      singlePalette += '<span style="background: '+colorPalette[i][j]+'; height: 14px; width: 14px;"></span>';
    }
    paletteEl.innerHTML += '<div id="singlePalette" onclick="selectPalette('+i+')" style="display: flex; height: 15px;">'+singlePalette+'</div>';
  }
}

function changeUIState(){
  if(currentState == State.CircleGrid){
    document.querySelector("#cMargin").previousElementSibling.style.display = 'none';
    document.querySelector("#cMargin").style.display = 'none';

    document.querySelector("#cRand").previousElementSibling.style.display = 'block';
    document.querySelector("#cRand").style.display = 'block';
  } else if(currentState == State.CirclePacking) {
    document.querySelector("#cMargin").previousElementSibling.style.display = 'block';
    document.querySelector("#cMargin").style.display = 'block';

    document.querySelector("#cRand").previousElementSibling.style.display = 'none';
    document.querySelector("#cRand").style.display = 'none';
  }
}