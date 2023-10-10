//let target;
let targets = [];
let pg;
let targetPg;
let vehicles = [];
let numVehicles = 20;
let lightSources = [];
let numTargets = 5;

let maxSpeed;
let maxForce;
let jitter;

function setup() {
  createCanvas(840, 840);

  pg = createGraphics(width, height);
  targetPg = createGraphics(width,height);

  createSaveButton();
  createSliders();

  // 在这里我们只创建 Vehicles 对象
  for (let i = 0; i < numVehicles; i++) {
    //最后一个true是逃离，false是跟随
    //vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1,false);
    //随机设置vehicle逃离还是跟随
    let pos1 = createVector(random(width), random(height));
    let springLength = random(20, 80);
    // let maxSpeed = 0.2;
    // let maxForce = 0.025;
    // let jitter =  random(0, 0.001);
    let shouldFlee = randomBoolean();
    vehicle = new Vehicle(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee);
    vehicles.push(vehicle);
  }

  for (let i = 0; i < numTargets; i++) {
    let clockwise = i % 2 === 0;
    let targetType = clockwise;
    let targtStrength = 0;
    let targetSpeed = 0.3;
    let targetRadius = random(50,200);
    target = new Target(createVector(random(width), random(height)), targetType, targetSpeed, targtStrength, targetRadius);
    targets.push(target);
  }
}

function draw() {
  //background(255, 170, 0);
  background(255);

  displaySliderValues();

  // 获取并显示滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();
  jitter = jitterSlider.value();

  for (let target of targets) {
    //adjust target movement 改变target运动方式
    target.orbit();
    target.draw();
    for (let vehicle of vehicles) {
      vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
      vehicle.updateMaxes(maxSpeed, maxForce, jitter); // 更新每个车辆的 maxSpeed 和 maxForce
      vehicle.draw();
    }
  }
  //pg.stroke(0,10);
  image(pg, 0, 0);
}


function randomBoolean() {
  return Math.random() < 0.3; // Adjust the threshold as needed
}
