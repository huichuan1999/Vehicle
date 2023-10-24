class Target {
  constructor(pos, targetType, targetSpeed, targtStrength, radiusX, radiusY, offsetY, angle) {
    this.angle = angle;
    this.radiusX = radiusX;  // 椭圆的x轴半径
    this.radiusY = radiusY;  // 椭圆的y轴半径
    this.offsetY = offsetY;  // 垂直偏移量

    this.pos = pos;

    this.targetType = targetType;
    this.targtStrength = targtStrength;
    this.targetSpeed = targetSpeed;
    this.center = createVector(width / 2, height / 2);

    // Create an array to store the trace
    this.trace = [];
    this.traceLength = random(100,1000);
  }

  orbit() {
    // Adjust the orbit radius based on the 'targetType' property

    if (this.targetType) {
       this.angle -= radians(this.targetSpeed);
     } else {
       this.angle += radians(this.targetSpeed);
     }

    this.pos.x = width / 2 + cos(this.angle) * this.radiusX;
    this.pos.y = height / 2 + sin(this.angle) * this.radiusY + this.offsetY;


    // Store the current position in the trace
    this.trace.push(this.pos.copy());

    // Keep only the last 'traceLength' positions
    if (this.trace.length > this.traceLength) {
      this.trace.shift();
    }
  }

  updateSpeed(targetSpeed) {
    this.targetSpeed = targetSpeed;
  }

  draw() {
    targetPg.noFill();
    //targetPg.strokeWeight(3);
      if (this.targetType){
        //targetPg.fill(colorTarget1);
        targetPg.stroke(colorTarget1);
      }
      else {
        //targetPg.fill(colorTarget2);
        targetPg.stroke(colorTarget2);
      }
    targetPg.strokeWeight(2);
    targetPg.ellipse(this.pos.x,this.pos.y,30*adjustment,30);
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

}
