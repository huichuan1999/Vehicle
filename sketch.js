let motors = [];
let target;
let pg;
let physics;

function setup() {
  createCanvas(800, 800);
  pg = createGraphics(800, 800);

  saveButton = createButton("Save Image"); // Create a button
  saveButton.mousePressed(saveImage); // Set up a callback on button press to save the image
  
  for (let i = 0; i < 2; i++) {
    let motor = new Motor(width/3 + i * 20, height/2);//初始位置
    motors.push(motor);
  }
  
  physics = new toxi.physics2d.VerletPhysics2D();
  physics.addParticle(motors[0].particle);
  physics.addParticle(motors[1].particle);
  
  let spring = new toxi.physics2d.VerletSpring2D(
    motors[0].particle,
    motors[1].particle,
    100,  // 该值为弹簧的长度
    0.1 // 该值为弹簧的强度
  );
  physics.addSpring(spring);
  
}

function draw() {
  background(255);
  physics.update();
  
  target = createVector(mouseX, mouseY);
  fill(0, 100);
  circle(target.x, target.y, 16);

  for (let motor of motors) {
    // let seek = motor.seek(target);
    // motor.applyForce(seek);

    let flee = motor.flee(target);
    motor.applyForce(flee);

    //motor.seek(target);
    motor.update();
    motor.randomSwing(0.5);
    motor.show();
   // motor.edges();

    pg.point(motor.pos.x, motor.pos.y);
  }
  
  stroke(0);
  line(motors[0].pos.x, motors[0].pos.y, motors[1].pos.x, motors[1].pos.y);
  
  noStroke();
  text(
  "Motor 0 velocity: (" + motors[0].vel.x.toFixed(2) + ", " + motors[0].vel.y.toFixed(2) + ") " +"  "+
  "Motor 1 velocity: : (" + motors[1].vel.x.toFixed(2) + ", " + motors[1].vel.y.toFixed(2) + ")", 
  100, 
  50
);

  
  image(pg, 0, 0);
}

function saveImage() {
  save(pg, "trajectory.png");
}