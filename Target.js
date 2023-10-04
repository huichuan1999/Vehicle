

class Target {
  constructor(pos, targetType, targetSpeed, targtStrength, targetRadius) {
    this.pos = pos;
    this.velocity = p5.Vector.random2D();
    this.targetType = targetType;
    this.targtStrength = targtStrength;
    this.targetSpeed = targetSpeed;
    this.center = createVector(width / 2, height / 2);
    this.radiusChangeRate = 0.2; // Rate of change in orbit radius
    this.increasing = targetType;
    this.targetRadius = targetRadius;
    // Create an array to store the trace
this.trace = [];
this.traceLength = random(100,1000);
  }

  orbit() {
    let radius = p5.Vector.dist(this.pos, this.center);

    // Adjust the orbit radius based on the 'increasing' property
    // if (this.increasing) {
    //   this.radius += this.radiusChangeRate;
    //   } else {
    //   this.radius -= this.radiusChangeRate;
    //   }
   radius += this.radiusChangeRate;
    let angle = atan2(this.pos.y - this.center.y, this.pos.x - this.center.x);
    if (this.targetType) {
       angle -= radians(this.targetSpeed);
     } else {
       angle += radians(this.targetSpeed);
     }
    this.pos.x = this.center.x + radius * cos(angle);
    this.pos.y = this.center.y + radius * sin(angle);


    // Store the current position in the trace
    this.trace.push(this.pos.copy());

    // Keep only the last 'traceLength' positions
    if (this.trace.length > this.traceLength) {
      this.trace.shift();
    }
  }

  show() {
    stroke(0,100);
    noFill();
    circle(this.pos.x,this.pos.y,50);
    beginShape();
    for (let point of this.trace) {
      vertex(point.x, point.y);
    }
    endShape();

    pg.stroke(255,0,0);
    pg.point(this.pos.x, this.pos.y);
  }

 flow(){

 }

}
