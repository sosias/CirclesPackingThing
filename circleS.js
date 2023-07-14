class CircleS {
  
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.r = random(0, 255);
      this.g = random(0, 255);
      this.b = random(0, 255);
      this.radius = radius;
    }
    
    move() {
      this.x += random(-5, 5);
      this.y += random(-5, 5);
    }

    color(r,g,b){
        this.r = r;
        this.g = g;
        this.b = b;
    }
    
    show() {
      noStroke();
      fill(this.r, this.g, this.b);
      circle(this.x, this.y, this.radius);
    }
  }