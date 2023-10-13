//let target;
let targets = [];
let pg;
let targetPg;
let vehicles = [];
let numVehicles = 20;
let lightSources = [];
let numTargets = 7;

let maxSpeed;
let maxForce;
let jitter;

let lastSavedTime;

function setup() {
  createCanvas(840, 840);

  pg = createGraphics(width, height);
  targetPg = createGraphics(width,height);

  lastSavedTime = millis();  // 初始化上次保存时间为当前时间

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
  targetPg.clear();

  displaySliderValues();

  // 检查是否已经过了20秒
  if (millis() - lastSavedTime > 20000) {  // 20000毫秒 = 20秒
    saveImageByTime();
    lastSavedTime = millis();  // 更新上次保存时间
  }

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
  image(targetPg,0,0);
  image(pg, 0, 0);
}


function randomBoolean() {
  return Math.random() < 0.3; // Adjust the threshold as needed
}

function saveImageByTime() {
  // 可以使用年月日时分秒来命名文件，以防覆盖之前的文件
  let timestamp = year() + nf(month(), 2) + nf(day(), 2) + '-' +
                  nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
  save(pg, "trajectory-" + timestamp + ".png");
  //save(targetPg, "Target-" + timestamp + ".png");
}
