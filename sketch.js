let target;
let pg;
let vehicle;

function setup() {
  createCanvas(800, 800);
  pg = createGraphics(800, 800);

  let saveButton = createButton("Save Image");
  saveButton.mousePressed(saveImage);

  // 在这里我们只创建一个 Vehicle 对象
  vehicle = new Vehicle(createVector(width/3, height/2), createVector(2*width/3, height/2), 200, 0.1);
}

function draw() {
  background(255);

  target = createVector(mouseX, mouseY);
  fill(0, 100);
  circle(target.x, target.y, 16);

  vehicle.run(target); // 传递 target 给 Vehicle 对象，让它决定如何运动
  image(pg, 0, 0);
}

function saveImage() {
  save(pg, "trajectory.png");
}
