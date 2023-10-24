let speedSlider, forceSlider, targetSpeedSlider;

function createSliders() {
  // 创建速度滑块，并设置其最小值，最大值，默认值，step
  speedSlider = createSlider(0.01, 10, 0.5, 0.1);
  speedSlider.position(width + 250, 30);

  // 创建力量滑块，并设置其最小值，最大值，默认值，step
  forceSlider = createSlider(0.001, 2, 0.02, 0.01);
  forceSlider.position(width + 250, 70);

  // 创建targetSpeed滑块，并设置其最小值，最大值，默认值，step
  targetSpeedSlider = createSlider(0.01, 2, 0.3, 0.01)
  targetSpeedSlider.position(width + 250, 110);
}

function displaySliderValues() {
  // 获取滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();
  targetSpeed = targetSpeedSlider.value();

  // 显示滑块的值
  fill(100);
  textSize(14);
  text('Max Speed: ' + maxSpeed, width + 220, 30);
  text('Max Force: ' + maxForce, width + 220, 70);
  text('targetSpeed: ' + maxForce, width + 220, 110);
}

function createSaveButton() {
  let saveButton = createButton("Save Image");
  saveButton.mousePressed(saveImage);
}

function createSettingButton() {
  //let saveSettingButton = createButton("Save Settings");
  let saveSettingButton = select('#saveSettings')
  saveSettingButton.mousePressed(saveSettings);
  //let loadButton = createButton("Load Settings");
  let loadButton = select('#loadSettings')
  loadButton.mousePressed(loadSettings);
}

function saveSettings() {
  let settings = {
    maxSpeed: speedSlider.value(),
    maxForce: forceSlider.value(),
    targetSpeed: targetSpeedSlider.value(),

    colorVehicle1: colPicVehicle1.color(),
    colorVehicle2: colPicVehicle2.color(),
    colorMotor: colPicMotor.color(),
    colorTarget1: colPicTarget1.color(),
    colorTarget2: colPicTarget2.color(),
    colorTrajectory: colPicTrajectory.color()
  }

  saveJSON(settings, 'settings.json');
}

function loadSettings() {
  select('#fileInput').elt.click();
  select('#fileInput').changed(handleFile);
}

function handleFile(file) {
  console.log(file.type);
  if (file.type === 'appliction/json') {

  // let fileExtension = splitTokens(file.name,'.').pop();//get  .json
  // if(fileExtension === 'json'){
    let settings = JSON.parse(file.data);
    console.log("load settings");
    speedSlider.value(settings.maxSpeed);
    forceSlider.value(settings.maxForce);
    targetSpeedSlider.value(settings.targetSpeed);

    colPicVehicle1.color(settings.colorVehicle1),
    colPicVehicle2.color(settings.colorVehicle2),
    colPicMotor.color(settings.colorMotor),
    colPicTarget1.color(settings.colorTarget1),
    colPicTarget2.color(settings.colorTarget2),
    colPicTrajectory.color(settings.colorTrajectory);
  }else{
    console.error("Not a JSON file!");
  }
}


function saveImage() {
  save(pg, "trajectory.png");
}
