//let target;
let targets =[];
let pg;
let vehicles = [];
let numVehicles = 3;
let lightSources = [];
let numTargets = 4;

function setup() {
  createCanvas(windowWidth,windowHeight);
  pg = createGraphics(windowWidth,windowHeight);

  let saveButton = createButton("Save Image");
  saveButton.mousePressed(saveImage);

  // 在这里我们只创建 Vehicles 对象
  for(let i=0;i < numVehicles ; i++){
    //最后一个true是逃离，false是跟随
    //vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1,false);
    //随机设置vehicle逃离还是跟随
    let shouldFlee = Math.random() < 0.5; // 50% 的概率为 true, 50% 为 false
    vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), random(70,200), 0.1, shouldFlee);
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
  background(255);
  // fill (0,100);
  // target = createVector(mouseX, mouseY);
  // circle(target.x, target.y, 16);

  // for (let lightSource of lightSources){
  //   fill(0, 100);
  //   circle(lightSource.x, lightSource.y, 16);
  //   target = lightSource;
  // //  }

    for (let target of targets){
    for(let vehicle of vehicles){
      vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
    }
}
  image(pg, 0, 0);
}

function saveImage() {
  save(pg, "trajectory.png");
}
