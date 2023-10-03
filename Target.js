

class Target {
  constructor(pos, targetType, targetSpeed, targtStrength) {
    this.pos = pos;
    this.velocity = p5.Vector.random2D();
    this.targetType = targetType;
    this.targtStrength = targtStrength;
    this.targetSpeed = targetSpeed;
    this.center = createVector(width / 2, height / 2);
  }

  orbit() {
    let radius = p5.Vector.dist(this.pos, this.center);
    let angle = atan2(this.pos.y - this.center.y, this.pos.x - this.center.x);
    if (this.targetType) {
       angle -= radians(this.targetSpeed);
     } else {
       angle += radians(this.targetSpeed);
     }
    this.pos.x = this.center.x + radius * cos(angle);
    this.pos.y = this.center.y + radius * sin(angle);



  }

  show() {
    stroke(0,100);
    noFill();
    circle(this.pos.x,this.pos.y,50);
  }

 flow(){

 }

}
