//let target;
let targets = [];
let pg;
let vehicles = [];
let numVehicles = 20;
let lightSources = [];
let numTargets = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);

  let saveButton = createButton("Save Image");
  saveButton.mousePressed(saveImage);

  // 在这里我们只创建 Vehicles 对象
  for (let i = 0; i < numVehicles; i++) {
    //最后一个true是逃离，false是跟随
    //vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1,false);
    //随机设置vehicle逃离还是跟随
    let pos1 = createVector(random(width), random(height));
    let springLength = random(30,150);
    let maxSpeed = 2;
    let maxForce = 0.25;
    let jitter =  random(0, 0.1);
    let shouldFlee = Math.random() < 0.5; // 50% 的概率为 true, 50% 为 false
    vehicle = new Vehicle(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee);
    vehicles.push(vehicle);
  }

for(let i=0;i < numTargets ; i++){
  let clockwise = i % 2 === 0;
  let targetType = clockwise;
  let targtStrength = 0;
  let targetSpeed = 0.3;
  target = new Target(createVector(random(width), random(height)),targetType, targetSpeed, targtStrength);
//  target = new Target(createVector(random(width), random(height)),0, 0.1, 0);
  targets.push(target);
}
}

function draw() {
  background(255);

    for (let target of targets){
      //adjust target movement 改变target运动方式
      target.orbit();
      target.show();

    for(let vehicle of vehicles){
      vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
    }
  }
  image(pg, 0, 0);
}

function saveImage() {
  save(pg, "trajectory.png");
}

function randomBoolean() {
  return Math.random() < 0.3; // Adjust the threshold as needed
}
