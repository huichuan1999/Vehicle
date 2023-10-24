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
  let saveSettingButton = createButton("Save Settings");
  saveSettingButton.mousePressed(saveSettings);
  //let loadButton = createButton("Load Settings");
  //loadButton.mousePressed(loadSettings);
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

function LoadSettings() {

}


function saveImage() {
  save(pg, "trajectory.png");
}
