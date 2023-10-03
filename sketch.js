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
  for(let i=0;i<numVehicles;i++){
    vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1);
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