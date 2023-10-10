let speedSlider, forceSlider, jitterSlider,targetSpeedSlider;

function createSliders() {
  // 创建速度滑块，并设置其位置、范围和初始值
  speedSlider = createSlider(0.01, 10, 0.2, 0.01);
  speedSlider.position(10, 30);

  // 创建力量滑块，并设置其位置、范围和初始值
  forceSlider = createSlider(0.001, 2, 0.02, 0.001);
  forceSlider.position(10, 70);

  jitterSlider = createSlider(0.001, 2, 0.02, 0.001);
  jitterSlider.position(10,110);
  
  // targetSpeedSlider = createSlider(0, 1, 0.3, 0.01);
  // targetSpeedSlider.position(10,150);
}

function displaySliderValues() {
  // 获取滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();
  maxJitter = jitterSlider.value();
  //targetSpeed = targetSpeedSlider.value();

  // 显示滑块的值
  fill(0);
  textSize(14);
  text('Max Speed: ' + maxSpeed, 10, 30);
  text('Max Force: ' + maxForce, 10, 70);
  text('Max Jitter: ' + maxJitter, 10, 110);
  //text('Target Speed: ' + targetSpeed, 10, 150)
}

function createSaveButton(){
    let saveButton = createButton("Save Image");
    saveButton.mousePressed(saveImage);
}


function saveImage() {
    save(pg, "trajectory.png");
    save(targetPg,"Target.png");
  }