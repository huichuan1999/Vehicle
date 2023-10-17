

class Target {
  constructor(pos, targetType, targetSpeed, targtStrength, targetRadius) {
    this.pos = pos;
    this.velocity = p5.Vector.random2D();
    this.targetType = targetType;
    this.targtStrength = targtStrength;
    this.targetSpeed = targetSpeed;
    this.center = createVector(width / 2, height / 2);
    this.radiusChangeRate = 0.2; // Rate of change in orbit radius
    this.targetRadius = targetRadius;
    // Create an array to store the trace
    this.trace = [];
    this.traceLength = random(100,1000);
  }

  orbit() {
    let radius = p5.Vector.dist(this.pos, this.center);

    // Adjust the orbit radius based on the 'targetType' property
    // if (this.targetType) {
    //   radius += this.radiusChangeRate;
    // }
    // else{
    //   radius -= this.radiusChangeRate;
    // }

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

  draw() {
    targetPg.noFill();
      if (this.targetType){
        targetPg.stroke(0,150);
      }
      else {
        targetPg.stroke(0,50);
      }
    
    targetPg.circle(this.pos.x,this.pos.y,this.targetRadius);
     beginShape();
     for (let point of this.trace) {
      //targetPg.stroke(50,20);
      //targetPg.vertex(point.x, point.y);
      targetPg.point(point.x, point.y);
     }
     endShape();
    //targetPg.stroke(50,0,0); //应该区别颜色！
    //targetPg.point(this.pos.x, this.pos.y);
  }


 flow(){

 }

}
