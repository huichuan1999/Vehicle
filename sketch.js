let target;
let pg;
let vehicles = [];
let numVehicles = 3;

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
}

function draw() {
  background(255);

  target = createVector(mouseX, mouseY);
  fill(0, 100);
  circle(target.x, target.y, 16);

  for(let vehicle of vehicles){
    vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
  }
  image(pg, 0, 0);
}

function saveImage() {
  save(pg, "trajectory.png");
}