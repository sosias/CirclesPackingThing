let circleQty = 100;
let bigCircleSize = 200;
let smallCircleSize = 2;
let marginCircleSize = 2;
let bigCircleCenterX;
let bigCircleCenterY;
let relativeSize = 1;
let randomness = 3;
let currentPalette = 0;
let overlappingOption = true;

let circles = []

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
  bigCircleCenterX = width/2;
  bigCircleCenterY = height/2;
  createUIPalette();
  changeRelativeSize(1);
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

function changeCircleMargin(margin){
  marginCircleSize = margin;
  runDrawFunc();
}

function changeGridRandomness(rand){
  randomness = rand;
  runDrawFunc();
}

function changeOverlappingOption(overlapping){
  overlappingOption = overlapping;
  runDrawFunc();
  changeUIState();
}

function selectPalette(paletteNr){
  currentPalette = paletteNr;
  runDrawFunc();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  runDrawFunc();
}

function runDrawFunc(){
  bigCircleCenterX = width/2;
  bigCircleCenterY = height/2;

  if(overlappingOption){
    drawCirclesInGrid();
  } else {
    drawCirclePacking();
  }
  updateInfos();
}

function drawCirclesInGrid(){
  circles = [];
  background(0);

  //circle(bigCircleCenterX,bigCircleCenterY,bigCircleSize);
  let relBigCircleSize = bigCircleSize * relativeSize;
  let relSmallCircleSize = smallCircleSize * relativeSize;
  let relRandomness = randomness * smallCircleSize * relativeSize;
  noStroke();
  fill(0);
  for(let currentX = bigCircleCenterX-relBigCircleSize/2; currentX<width; currentX = currentX+relSmallCircleSize*2) {
    for(let currentY = bigCircleCenterY-relBigCircleSize/2; currentY<height; currentY = currentY+relSmallCircleSize*2) {
      if(dist(currentX,currentY,bigCircleCenterX,bigCircleCenterY) < relBigCircleSize/2){
        //circle(currentX,currentY,2);
        let currentCircle = new CircleS(currentX+random(0,relRandomness)-relRandomness/2,currentY+random(0,relRandomness)-relRandomness/2,relSmallCircleSize);
        let color = hexToRgb(colorPalette[currentPalette][Math.floor(random(0,colorPalette[currentPalette].length))]);
        currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
        currentCircle.show();
        circles.push(currentCircle);
      }
    }
  }
}

function drawCirclePacking(){
  circles = [];
  background(0);
  let relBigCircleSize = bigCircleSize * relativeSize;
  let relSmallCircleSize = smallCircleSize * relativeSize;
  let relRandomness = randomness * relativeSize;
  noStroke();

  fill(0);

  let failTimesLimit = 30;
  let currentTimeFailed = failTimesLimit;
  let randomPoint;
  while(currentTimeFailed>0){
    randomPoint = getRandomPointInsideCircle();
    

    if(circles.length == 0 || isEnoughSpaceInCircles(randomPoint)){
      let currentCircle = new CircleS(randomPoint.x,randomPoint.y,relSmallCircleSize);
      currentTimeFailed = failTimesLimit;
      let color = hexToRgb(colorPalette[currentPalette][Math.floor(random(0,colorPalette[currentPalette].length))]);
      currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
      currentCircle.show();
      circles.push(currentCircle);
    } else {
      currentTimeFailed--;
    }
  }
}

function isEnoughSpaceInCircles(point){
  let isEnoughSpace = true;
  for(let i=0; i<circles.length; i++){
    if(dist(point.x, point.y, circles[i].x, circles[i].y) < smallCircleSize * relativeSize + marginCircleSize * relativeSize){
      return false;
    }
  }
  return isEnoughSpace;
}

function getRandomPointInsideCircle(){
  let relBigCircleSize = (bigCircleSize/2) * relativeSize;

  let angle = random(0, 2*PI);
    
  // https://programming.guide/random-point-within-circle.html
  // we use square root of random for equal distribution of points from the center
  r = relBigCircleSize * sqrt(random(0, 1));
  
  x = bigCircleCenterX + r * cos(angle);
  y = bigCircleCenterY + r * sin(angle);

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
  if(overlappingOption){
    document.querySelector("#cMargin").previousElementSibling.style.display = 'none';
    document.querySelector("#cMargin").style.display = 'none';

    document.querySelector("#cRand").previousElementSibling.style.display = 'block';
    document.querySelector("#cRand").style.display = 'block';
  } else {
    document.querySelector("#cMargin").previousElementSibling.style.display = 'block';
    document.querySelector("#cMargin").style.display = 'block';

    document.querySelector("#cRand").previousElementSibling.style.display = 'none';
    document.querySelector("#cRand").style.display = 'none';
  }
}