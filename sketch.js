//let target;
let targets = [];
let pg;
let vehicles = [];
let numVehicles = 10;
let lightSources = [];
let numTargets = 8;
let maxSpeed;
let maxForce;
let singlePanelWidth = 128;
let singlePanelHeigh = 70;
const fr = 30;


function setup() {
  createCanvas(singlePanelWidth*2, singlePanelHeigh*6);
  pg = createGraphics(singlePanelWidth*2, singlePanelHeigh*6);
  createSaveButton();
  createSliders();

  frameRate(fr);

  // initialize recorder
  record();

  // 在这里我们只创建 Vehicles 对象
  for (let i = 0; i < numVehicles; i++) {
    //最后一个true是逃离，false是跟随
    //vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1,false);
    //随机设置vehicle逃离还是跟随
    let pos1 = createVector(random(width), random(height));
    let springLength = random(5,20);
     let maxSpeed = 0.2;
     let maxForce = 0.025;
    let jitter =  random(0, 0.001);
    let shouldFlee = randomBoolean() ;
    vehicle = new Vehicle(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee);
    vehicles.push(vehicle);
  }

for(let i=0;i < numTargets ; i++){
  let clockwise = i % 2 === 0;
  let targetType = clockwise;
  let targtStrength = 0;
  let targetSpeed = 0.3;
  let targetRadius = 30;
  target = new Target(createVector(random(width), random(height)),targetType, targetSpeed, targtStrength, targetRadius);
  targets.push(target);
}
}

function draw() {
//  background(255, 170, 0);
  colorMode(HSB);
  c = color(40, 100, 100);
  background(c);
  displaySliderValues();

  // 获取并显示滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();

    for (let target of targets){
      //adjust target movement 改变target运动方式
      target.orbit();
      target.draw();
    for(let vehicle of vehicles){
      vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
      vehicle.updateMaxes(maxSpeed, maxForce); // 更新每个车辆的 maxSpeed 和 maxForce
      vehicle.draw();
    }
  }
  //pg.stroke(0,10);
  image(pg, 0, 0);
}


function randomBoolean() {
  return Math.random() < 0.3; // Adjust the threshold as needed
}
