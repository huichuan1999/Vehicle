

class Target {
  constructor(pos, targetType, targetRadius, targtStrength) {
    this.pos = pos;
    this.velocity = p5.Vector.random2D();
    this.targetType = targetType;
    this.targetRadius = targetRadius;
    this.targtStrength = targtStrength;
    this.speed = 1;
    this.center = createVector(width / 2, height / 2);
  }

  orbit() {
    let radius = p5.Vector.dist(this.pos, this.center);
    let angle = atan2(this.pos.y - this.center.y, this.pos.x - this.center.x);
    angle += radians(this.speed); // Adjust the speed here
    this.pos.x = this.center.x + radius * cos(angle);
    this.pos.y = this.center.y + radius * sin(angle);
  }

  show() {
    stroke(0,100);
    noFill();
    circle(this.pos.x,this.pos.y,50);
  }

}
