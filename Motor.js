
class Motor{
  constructor(x,y,motorSpeed,motorForce){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.motorSpeed = motorSpeed;
    this.motorForce = motorForce;
    this.particle = new toxi.physics2d.VerletParticle2D(new toxi.geom.Vec2D(x, y));
  }

  flee(target) {
    return this.seek(target).mult(-1); //adjust flee
  }

  seek(target){
    //生成一个指向target的力
    let force = p5.Vector.sub(target,this.pos);
    //console.log(target.pos);

    //不然magnitude太大了看起来会瞬间传送
     force.setMag(this.motorSpeed);

    //非常重要，steering使之力的方向转向target
    force.sub(this.vel);

    force.limit(this.motorForce);

    //this.applyForce(steering);
    return force;

  }

  applyForce(force){
    this.acc.add(force);
    this.particle.addSelf(new toxi.geom.Vec2D(force.x, force.y));
  }

  randomSwing(intensity){
    let randomSwing = p5.Vector.random2D();
    randomSwing.mult(intensity);
    this.acc.add(randomSwing);
  }

  update(){
    //同步更新物理系统里的粒子位置
    this.pos.x = this.particle.x;
    this.pos.y = this.particle.y;

    this.vel.add(this.acc);
    this.vel.mult(0.95); // Apply damping
    this.pos.add(this.vel);
    this.vel.limit(this.maxSpeed);
    this.particle.scaleVelocity(0.9); // 用于在物理模拟中增加阻尼效应
    this.acc.set(0,0);//在每一帧的末尾重置加速度向量,以防止加速度在连续的帧之间累积

  }

  show(){
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    //noStroke();
    //fill(255);
    stroke(colorMotor);
    noFill();
    rect(0,0,10,10);

    pop();
  }

  updateMaxes(motorSpeed, motorForce) {
    this.motorSpeed = motorSpeed;
    this.motorForce = motorForce;
  }

  // edges() {
  //   if (this.pos.x > width + this.r) {
  //     this.pos.x = -this.r;
  //   } else if (this.pos.x < -this.r) {
  //     this.pos.x = width + this.r;
  //   }
  //   if (this.pos.y > height + this.r) {
  //     this.pos.y = -this.r;
  //   } else if (this.pos.y < -this.r) {
  //     this.pos.y = height + this.r;
  //   }
  // }

}
