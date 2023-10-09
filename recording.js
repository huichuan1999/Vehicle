
let recording = false;
let recorder;
let chunks = [];

function record() {
  chunks.length = 0;

  let stream = document.querySelector('canvas').captureStream(fr);

  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };

  recorder.onstop = exportVideo;

}

function exportVideo(e) {
  var blob = new Blob(chunks, { 'type' : 'video/webm' });

    // Draw video to screen
    var videoElement = document.createElement('video');
    videoElement.setAttribute("id", Date.now());
    videoElement.controls = true;
    document.body.appendChild(videoElement);
    videoElement.src = window.URL.createObjectURL(blob);

  // Download the video
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'newVid.webm';
  a.click();
  window.URL.revokeObjectURL(url);

}




function keyPressed() {

  // toggle recording true or false
  recording = !recording
  console.log(recording);

  // 82 is keyCode for r
  // if recording now true, start recording
  if (keyCode === 82 && recording ) {

    console.log("recording started!");
    recorder.start();
  }

  // if we are recording, stop recording
  if (keyCode === 82 && !recording) {
    console.log("recording stopped!");
    recorder.stop();
  }

}
