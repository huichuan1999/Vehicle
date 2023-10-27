//let target;
let targets = [];
let pg;
let targetPg;

let vehicles = [];
let numVehicles = 15;
let lightSources = [];
let numTargets = 7;
let maxSpeed;
let maxForce;
let targetSpeed;
let screenWidth = 256 *2;
let screenHeight = 768;
const fr = 30;

let colorVehicle1;
let colorVehicle2;
let colorMotor;
let colorTarget1;
let colorTarget2;
let colorTrajectory;

// Create a variable for color-picker object 
var colPicTarget1; 
var colPicTarget2;
var colPicTrajectory;
var colPicMotor;
var colPicVehicle1;
var colPicVehicle2;

//background


//timer
var counter =0;
var seconds,minutes;

let overAlltexture;
let texture1;
let texture2;

let startCanvas;
//shader
let theShader;
let Img;
let WebglCanvas;
let WebglCanvas2;


var vx =0;
let info=[];


//glitch
const maxXChange = 125;
const maxYChange = 5;
const yNoiseChange = 0.01;
const mouseYNoiseChange = 0.3;
const timeNoiseChange = 0.013;

let inverted = false;

const micSampleRate = 44100;

const freqDefinition = 8192;


const minFreqHz = 2300;//C3
const maxFreqHz = 2500;//C7


let mic, fft, spectrum;
let historygram;
let sounds = [];

let enFont;
let chFont;
let historygram_w;
let historygram_h;


let original_ratio;
let target_ratio;
let adjustment;


function preload(){
	// Sound File
	mic= loadSound("Asset/Sound/noise1min.mp3");
	fft = new p5.FFT(0.0, 1024);
	mic.connect(fft);
	mic.onended(soundloop);

	overAlltexture = loadImage('Asset/bgAssets/texture.png');
	texture1=loadImage("Asset/bgAssets/texture1.png")
	texture2=loadImage("Asset/bgAssets/texture2.png")

	theShader0 = loadShader('shaders/shader1.vert', 'shaders/shader1.frag');
	//Shader
	theShader = new p5.Shader(this.renderer,vert,frag);
	Img = loadImage('Asset/bgAssets/light.jpg');

}

function setup() {

  //background
  // Create a color-picker object  

  colorBackground = color(255, 170, 0);
  colorVehicle1 = color(255, 104, 0);  //在这里改颜色
  colPicVehicle1 = createColorPicker("red");
  colorVehicle2 = color(255, 255, 0);
  colPicVehicle2 = createColorPicker("yellow");
  colorMotor = color(255,204,0,50);
  colPicMotor = createColorPicker("white");
  colorTarget1 = color(255,30,30,200);
  colPicTarget1 = createColorPicker("gray");
  colorTarget2 = color(255,220,30,200);
  colPicTarget2 = createColorPicker("gray");
  colorTrajectory = color(255,255, 100);
  colPicTrajectory = createColorPicker("gray");

  background(colorBackground);

  createCanvas(screenWidth, screenHeight);
  pg = createGraphics(screenWidth, screenHeight);
  targetPg = createGraphics(screenWidth, screenHeight);

  original_ratio = width / height;
  target_ratio = 1 / 3; //最终画布比例1:3
  //adjustment =  original_ratio / target_ratio ;//变换椭圆的时候与高度相乘的调整值

  createSaveButton();
  createSettingButton();
  createSliders();
  frameRate(fr);
	adjustment = 1;
  mic.play();

  //shader
  WebglCanvas = createGraphics(screenWidth,screenHeight,WEBGL);
	pixelDensity(1);
	noStroke();

	WebglCanvas2 = createGraphics(screenWidth,screenHeight,WEBGL);
	pixelDensity(1);
	noStroke();
 //signal
  historygram_w = windowWidth*20;
  historygram_h = windowHeight;

  historygram = createGraphics(historygram_w,historygram_h);

  // initialize recorder
  //record();

  //创建targets

  for(let i=0;i < numTargets ; i++){
  let clockwise = i % 2 === 0;
  let targetType = clockwise;
  let targtStrength = 0;
  targetSpeed = 0.3;

  let baseRadius = 100;
  let increment = random(20,70); //同心圆每一个比上一个的直径增加值
  let radiusY = baseRadius + i * increment;
  let radiusX = radiusY * adjustment; //同心圆宽度乘以调整值
  let offsetY = 0;
  let angle = random(TWO_PI); //随机起始角度

  let pos = createVector(
	width / 2 + cos(angle) * radiusX,
	height / 2 + sin(angle) * radiusY
  );

  target = new Target(pos, targetType, targetSpeed, targtStrength, radiusX, radiusY, offsetY, angle);
  targets.push(target);

 // console.log(target.radiusX,target.radiusY)
}

// 创建 Vehicles 对象
for (let i = 0; i < numVehicles; i++) {

    let pos1 = createVector(random(width), random(height));
    let springLength = random(5,20);
    maxSpeed = 0.5;
    maxForce = 0.2;
    let jitter =  0;
    let shouldFlee = randomBoolean() ;
    vehicle = new Vehicle(pos1, springLength, maxSpeed, maxForce, jitter, shouldFlee);
    vehicles.push(vehicle);
  }

}

function draw() {
  background(255, 170, 0);
  
  colorBackground = color(255, 170, 0);
  colorVehicle1 = color(colPicVehicle1.color());  //在这里改颜色
  colorVehicle2 = color(colPicVehicle2.color());
  colorMotor = color(colPicMotor.color());
  colorTarget1 = color(colPicTarget1.color());
  colorTarget2 = color(colPicTarget2.color());
  colorTrajectory = color(colPicTrajectory.color());

  // if (frameCount % 10 === 0) {
  //   pg.fill(255, 170, 0, 7);  // 橙色，半透明
  //   pg.rect(0, 0, width, height);  // 绘制一个覆盖整个画布的矩形
  // }
  theShader.setUniform('u_resolution',[width/1000,height/1000])
  theShader.setUniform('u_time',millis()/1000)
  theShader.setUniform('tex0',WebglCanvas)
  theShader.setUniform('tex1',Img)
  WebglCanvas2.shader(theShader)
  // webGLGraphics2.rect(00,width,height)
  WebglCanvas2.rect(-width/2,-height/2,width,height)

  image(WebglCanvas2,0,0,width,height);

  createSignal();
  push();
  translate(width / 2, height / 2);
	rotate(PI/2);
	image(historygram, width-vx, -height / 2);
//	image(historygram, width-vx, -height / 2);
  pop();

 //给图层加入混合模式
  push();
	blendMode(DODGE);
  image(pg, 0, 0);
	pop();
  targetPg.clear();

  //if(frameCount % 1170 == 0)pg.clear();//每隔1000帧清空轨迹画布
  //console.log(frameCount);
  //pg.clear();

  displaySliderValues();

  // 获取并显示滑块的值
  maxSpeed = speedSlider.value();
  maxForce = forceSlider.value();
  targetSpeed = targetSpeedSlider.value();

  for (let target of targets){
	target.orbit();
	target.draw();
	target.updateSpeed(targetSpeed);
  }
  for(let vehicle of vehicles){
	vehicle.run(vehicles, targets); // 传递所有目标给 Vehicle 对象
	vehicle.updateMaxes(maxSpeed, maxForce);
	vehicle.draw();
  }
  
  push();
  blendMode(DODGE);
    image(targetPg,0,0);
  pop();
}

function createSignal(){

			vx=vx+1;


			spectrum = fft.analyze();

			for (let i = maxFreqHz; i >= minFreqHz; i--) {

				let index = maxFreqHz - i;
				let intensity = (fft.getEnergy(i)-fft.getEnergy(1000))*2.5;
				let highintensity = (fft.getEnergy(2400)-fft.getEnergy(1000))*2.5;
				let intensityX= map(intensity,0,300,0.5,5);


				if(frameCount % 10 < 3)
				{

					if(intensity>150){

					let transp = map(intensity,150,255,0,100);
					let widthhis = map(intensity,0,400,1,10);
					historygram.stroke(intensity/3,intensity/3,intensity/3,transp);

					//red
					historygram.stroke(218,18,32,50,50);
					let y = index / (maxFreqHz - minFreqHz - 1) * height;
					historygram.line(vx-2+intensityX,y, vx+intensityX,y);

						if(intensity>220){

							historygram.stroke(intensity,intensity,intensity,transp/3);
							let y = index / (maxFreqHz - minFreqHz - 1) * height;
							historygram.noStroke();

							//Stroke Color
							let colorR = 176 + random(-50,100);
							let colorG = 73 + random(10,50);
							let colorB = 20 + random(-30,30);

							historygram.fill(colorR,colorG,colorB,2);
							historygram.rect(vx,y,widthhis,2);

							historygram.fill(colorR,colorG,colorB,2);
							historygram.ellipse(vx,y,widthhis+10);

							historygram.fill(colorR,colorG,colorB,3);
							historygram.ellipse(vx,y,widthhis+6);

							historygram.fill(colorR,colorG,colorB,4);
							historygram.ellipse(vx,y,widthhis+3);

							historygram.fill(colorR,colorG,colorB,5);
							historygram.ellipse(vx,y,widthhis);
						}
					}

				}

				else if (frameCount %10 >=3 && frameCount %10 <5)
				{

					if(intensity>150){

						let transp = map(intensity,150,255,0,100);
						let widthhis = map(intensity,240,255,1,3);
						historygram.stroke(intensity/3,intensity/3,intensity/3,transp);

						//red
						historygram.stroke(106,33,228,90);

						let y = index / (maxFreqHz - minFreqHz - 1) * height;

						historygram.line(vx-2+intensityX,y, vx+intensityX,y);
						//historygram.line(vx,y+3, vx+1,y); //1

							if(intensity>220){

								historygram.stroke(intensity,intensity,intensity,transp/3);

								let y = index / (maxFreqHz - minFreqHz - 1) * height;

								//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
								historygram.noStroke();

								//Stroke Color
								let colorR = 176 + random(-50,100);
								let colorG = 73 + random(10,50);
								let colorB = 20 + random(-30,30);

								historygram.fill(colorR,colorG,colorB,2);
								historygram.rect(vx,y,widthhis,2);

								historygram.fill(colorR,colorG,colorB,2);
								historygram.ellipse(vx,y,widthhis+10);

								historygram.fill(colorR,colorG,colorB,3);
								historygram.ellipse(vx,y,widthhis+6);

								historygram.fill(colorR,colorG,colorB,4);
								historygram.ellipse(vx,y,widthhis+3);

								historygram.fill(colorR,colorG,colorB,5);
								historygram.ellipse(vx,y,widthhis);
							}
						}

				}

				else if (frameCount % 10 >= 5)
				{
					if(intensity>150){

						let transp = map(intensity,150,255,0,100);
						historygram.stroke(intensity/3,intensity/3,intensity/3,transp);
						let widthhis = map(intensity,240,255,1,3);
						//historygram.stroke(intensity,intensity,ntensity,transp);

						//red
						historygram.stroke(21,49,190,80);


						let y = index / (maxFreqHz - minFreqHz - 1) * height;

						historygram.line(vx-2+intensityX,y, vx+intensityX,y);
						//historygram.line(vx,y+3, vx+1,y); //1

							if(intensity>220){
								let widthhis = map(intensity,240,255,1,3);

								historygram.stroke(intensity,intensity,intensity,transp/3);

								let y = index / (maxFreqHz - minFreqHz - 1) * height;

								//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
								historygram.noStroke();


								//Stroke Color

								let colorR = 166 + random(-50,100);
								let colorG = 106 + random(10,50);
								let colorB = 67 + random(-30,30);

								historygram.fill(colorR,colorG,colorB,2);
								historygram.rect(vx,y,widthhis,2);

								historygram.fill(colorR,colorG,colorB,3);
								historygram.ellipse(vx,y,widthhis+10);

								historygram.fill(colorR,colorG,colorB,5);
								historygram.ellipse(vx,y,widthhis+6);

								historygram.fill(colorR,colorG,colorB,8);
								historygram.ellipse(vx,y,widthhis+3);

								historygram.fill(colorR,colorG,colorB,10);
								historygram.ellipse(vx,y,widthhis);

							}
					}

				}


			}
}

function randomBoolean() {
  return Math.random() < 0.3; // Adjust the threshold as needed
}

function soundloop(){
  mic.play();
  mic.amp(1);
  //mic.onended(soundloop);
  //historygram = createGraphics(windowWidth*10, height);
  vx = 0;
}
