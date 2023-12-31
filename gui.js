let speedSlider, forceSlider;

function createSliders() {
  // 创建速度滑块，并设置其位置、范围和初始值
  speedSlider = createSlider(0.01, 10, 0.2, 0.01);
  speedSlider.position(width-250, 30);

  // 创建力量滑块，并设置其位置、范围和初始值
  forceSlider = createSlider(0.001, 2, 0.02, 0.001);
  forceSlider.position(width-250, 70);

  jitterSlider = createSlider(0.001, 2, 0.02, 0.001);
  jitterSlider.position(width-250,110);
}

function displaySliderValues() {
  // 获取滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();
  maxJitter = jitterSlider.value();

  // 显示滑块的值
  fill(0);
  textSize(14);
  text('Max Speed: ' + maxSpeed, width-250, 30);
  text('Max Force: ' + maxForce, width-250, 70);
  text('Max Jitter: ' + maxForce, width-250, 110);
}

function createSaveButton(){
    let saveButton = createButton("Save Image");
    saveButton.mousePressed(saveImage);
}


function saveImage() {
    save(pg, "trajectory.png");
  }