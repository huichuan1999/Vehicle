//let target;
let targets = [];
let pg;
let vehicles = [];
let numVehicles = 20;
let lightSources = [];
let numTargets = 5;
let randomValue = randomBoolean();

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);

  let saveButton = createButton("Save Image");
  saveButton.mousePressed(saveImage);

  // 在这里我们只创建 Vehicles 对象
  for (let i = 0; i < numVehicles; i++) {
    
    let pos1 = createVector(random(width), random(height));
    let springLength = random(30,150);
    let maxSpeed = 2;
    let maxForce = 0.25;
    let jitter =  random(0, 0.5);
    let shouldFlee = Math.random() < 0.5; // 50% 的概率为 true, 50% 为 false

    vehicle = new Vehicle(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee);

    vehicles.push(vehicle);
  }

  // Create light sources
for (let i = 0; i < 4; i++) {
  lightSources.push(createVector(random(width), random(height)));
}

for(let i=0;i < numTargets ; i++){
//  let shouldFlee = Math.random() < 0.5; // 50% 的概率为 true, 50% 为 false
  target = new Target(createVector(random(width), random(height)), 1, 0.1, 0);
  targets.push(target);
}
}

function draw() {
  //background(255);
  // fill (0,100);
  // target = createVector(mouseX, mouseY);
  // circle(target.x, target.y, 16);

  // for (let lightSource of lightSources){
  //   fill(0, 100);
  //   circle(lightSource.x, lightSource.y, 16);
  //   target = lightSource;
  // //  }

    for (let target of targets){
      target.orbit();
      //target.show();
    for(let vehicle of vehicles){
      vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
    }
  }
  
  image(pg, 0, 0);
  if (frameCount % 10 === 0) {
    fill(255, 5);  // 白色，半透明
    rect(0, 0, width, height);  // 绘制一个覆盖整个画布的矩形
  }
}

function saveImage() {
  save(pg, "trajectory.png");
}

function randomBoolean() {
  return Math.random() < 0.5; // Adjust the threshold as needed
}
