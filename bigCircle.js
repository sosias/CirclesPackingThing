class BigCircle {
  
    constructor(x, y, bigCircleSize, smallCircleSize) {
      this.x = x;
      this.y = y;
      this.bigCircleSize = bigCircleSize;
      this.smallCircleSize = smallCircleSize;
      this.circles = []
      this.randomness = 3;
      this.colorPalette = ["#FFFFFF"];
      this.marginCircleSize = 2;
    }
    
    show() {
      this.circles.forEach(element => {
        element.show();
      });
    }

    generateCirclesInGrid(drawAlso = true){
      this.circles = [];
      //background(backgroundColor);
    
      //circle(0,0,bigCircleSize);
    
      //noStroke();
      //fill(backgroundColor);
      for(let currentX = -this.bigCircleSize/2; currentX<this.bigCircleSize/2; currentX = currentX+this.smallCircleSize) {
        for(let currentY = -this.bigCircleSize/2; currentY<this.bigCircleSize/2; currentY = currentY+this.smallCircleSize) {
          if(dist(0,0,currentX,currentY) < this.bigCircleSize/2){
            let currentCircle = new CircleS(currentX+random(0,this.randomness)-this.randomness/2,currentY+random(0,this.randomness)-this.randomness/2,this.smallCircleSize);
            let color = hexToRgb(this.colorPalette[Math.floor(random(0,this.colorPalette.length))]);
            currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
            if(drawAlso){
                currentCircle.show();
            }
            this.circles.push(currentCircle);
          }
        }
      }
    }

    generateCirclePacking(drawAlso = true){
      this.circles = [];
    
      let failTimesLimit = 30;
      let currentTimeFailed = failTimesLimit;
      let randomPoint;
      while(currentTimeFailed>0){
        randomPoint = BigCircle.getRandomPointInsideCircle(this.bigCircleSize/2);

        if(this.circles.length == 0 || this.#isEnoughSpaceInCircles(randomPoint)){
          let currentCircle = new CircleS(randomPoint.x,randomPoint.y,this.smallCircleSize);
          currentTimeFailed = failTimesLimit;
          let color = hexToRgb(this.colorPalette[Math.floor(random(0,this.colorPalette.length))]);
          currentCircle.color(color.levels[0],color.levels[1],color.levels[2]);
          if(drawAlso){
              currentCircle.show();
          }
          this.circles.push(currentCircle);
        } else {
          currentTimeFailed--;
        }
      }
    }

    #isEnoughSpaceInCircles(point){
      let isEnoughSpace = true;
      for(let i=0; i<this.circles.length; i++){
        if(dist(point.x, point.y, this.circles[i].x, this.circles[i].y) < this.smallCircleSize + this.marginCircleSize){
          return false;
        }
      }
      return isEnoughSpace;
    }
    
    static getRandomPointInsideCircle(radius){
      let angle = random(0, 2*PI);
        
      // https://programming.guide/random-point-within-circle.html
      // we use square root of random for equal distribution of points from the center
      let r = radius * sqrt(random(0, 1));
      
      let x = r * cos(angle);
      let y = r * sin(angle);
    
      return createVector(x, y);
    }

    changeRandomColorsFromPalette(palette){
      this.colorPalette = palette;
      let color;
      this.circles.forEach(element => {
        color = hexToRgb(this.colorPalette[Math.floor(random(0,this.colorPalette.length))]);
        element.color(color.levels[0],color.levels[1],color.levels[2]);
      });
    }

    getCirclesQty(){
      return this.circles.length;
    }

  }