
class Vehicle {

  constructor(pos1, springLength, maxForce, maxSpeed, jitter, shouldFlee) {
    console.log("Creating a vehicle with:", maxSpeed, maxForce);

    this.motors = [];
    this.physics = new toxi.physics2d.VerletPhysics2D();
    //设置边界，让它们不要飞出去
    //this.physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));
    //一个布尔值，true是逃离，false是跟随
    this.shouldFlee = shouldFlee;
    this.jitter = jitter;

    // 创建两个motor对象

    this.motors[0] = new Motor(pos1.x, pos1.y, maxForce, maxSpeed);
    this.motors[1] = new Motor(pos1.x + springLength / 2, pos1.y + springLength / 2, maxForce, maxSpeed);


    // 将motor的粒子添加到物理世界中
    this.physics.addParticle(this.motors[0].particle);
    this.physics.addParticle(this.motors[1].particle);

    // 创建一个spring，连接两个motor的粒子，并添加到物理世界中
    let spring = new toxi.physics2d.VerletSpring2D(
      this.motors[0].particle,
      this.motors[1].particle,
      springLength,
      0.1
    );
    this.physics.addSpring(spring);
    this.pos1 = pos1;
    this.springLength = springLength;

    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    // Create an array to store the trace
    // this.trace = [];
    // this.traceLength = 500;
  }

  run(vehicles, allTargets) {
    for (let motor of this.motors) {
      let force;
      let closestTarget = null;
      let closestDist = Infinity; // 初始一个很大的距离
  
      // 找出最近的目标并且只受到最近的target影响
      for (let t of allTargets) {
        let d = p5.Vector.dist(motor.pos, t.pos);
        if (d < closestDist) {
          closestDist = d;
          closestTarget = t;
        }
      }
  
      if (this.shouldFlee == closestTarget.targetType) {
        force = motor.flee(closestTarget.pos);
      } else {
        force = motor.seek(closestTarget.pos);
      }
  
      let separateForce = this.separate(vehicles);
      motor.applyForce(separateForce);
  
      motor.applyForce(force);
      motor.update();
      motor.randomSwing(this.jitter);
      motor.show();
      pg.stroke(colorTrajectory, 10);
      pg.circle(motor.pos.x, motor.pos.y, 1);
  
      this.checkEdges();
      // ... (rest of your code remains unchanged)
    }
  
    this.physics.update();
  }
    
  separate(vehicles) {
    //console.log("Separating from", vehicles);

    let desiredSeparation = 35.0;  // 这是车辆应保持的最小距离
    let steer = createVector(0, 0);
    let count = 0;
  
    // 对于每个车辆，检查距离
    for (let other of vehicles) {
      if (other != this) {
        //let d = dist(this.pos1.x, this.pos1.y, other.pos1.x, other.pos1.y);
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if ((d > 0) && (d < desiredSeparation)) {
          // 计算从其他车辆指向该车辆的向量
          //let diff = p5.Vector.sub(this.pos1, other.pos1);
          let diff = p5.Vector.sub(this.position, other.position);

          diff.normalize();
          diff.div(d);  // 归一化并加权
          steer.add(diff);
          count++;
        }
      }
    }
  
    if (count > 0) {
      steer.div(count);
    }
  
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.motors[0].vel);  // 这里可以考虑对每个motor应用
      steer.sub(this.motors[1].vel);
      steer.limit(this.maxForce);
    }
  
    return steer;
  }  

  checkEdges() {
    //console.log("Checking edges for", this);
  
    let padding = 5;  // 避免完全触及边界
    let reboundForce = 0.5;  // 反弹的力量
  
    for (let motor of this.motors) {
      let motorPos = motor.position;  // 获取当前motor的位置
  
      if (motorPos.x >= width - padding) {
        motor.vel.x = -motor.vel.x * reboundForce;
        motor.position.x = width - padding;
      } else if (motorPos.x <= padding) {
        motor.vel.x = -motor.vel.x * reboundForce;
        motor.position.x = padding;
      }
  
      if (motorPos.y >= height - padding) {
        motor.vel.y = -motor.vel.y * reboundForce;
        motor.position.y = height - padding;
      } else if (motorPos.y <= padding) {
        motor.vel.y = -motor.vel.y * reboundForce;
        motor.position.y = padding;
      }
    }
  }
  

  get position() {
    // 获取两个motor的中心位置，可以根据需要进行修改
    let middle = p5.Vector.add(this.motors[0].position, this.motors[1].position);
    middle.div(2);
    return middle;
  }
  

  updateMaxes(maxSpeed, maxForce) {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    for (let motor of this.motors) {
      motor.updateMaxes(maxSpeed, maxForce);
    }
  }

  //渲染vehicle
  draw() {

    if (this.shouldFlee){
      //  stroke(255,50);
          stroke(colorVehicle1);
      }
      else {
      //  stroke(0,50);
        stroke(colorVehicle2);
      }

    line(this.motors[0].pos.x, this.motors[0].pos.y, this.motors[1].pos.x, this.motors[1].pos.y);
    //beginShape();
    //  for (let point of this.trace) {
    //   pg.point(point.x, point.y);
    //  }
     //endShape();
    //   noStroke();
    //   text(
    //       "Motor 0 velocity: (" + this.motors[0].vel.x.toFixed(2) + ", " + this.motors[0].vel.y.toFixed(2) + ") " + "  " +
    //       "Motor 1 velocity: (" + this.motors[1].vel.x.toFixed(2) + ", " + this.motors[1].vel.y.toFixed(2) + ")",
    //       100,
    //       50
    //   );
  }
}
