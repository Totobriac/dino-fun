let dino = document.querySelector("#dino");


const URL = "https://teachablemachine.withgoogle.com/models/WeGUYaqgl/";
let model, webcam, ctx, labelContainer, maxPredictions;

export async function init() {
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  console.log('loading')
  model = await tmPose.load(modelURL, metadataURL);
  console.log('loaded')
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmPose.Webcam(200, 200, flip);
  await webcam.setup();
  webcam.play();
  window.requestAnimationFrame(loop);


  // const canvas = document.getElementById('canvas');
  // canvas.width = 200; 
  // canvas.height = 200;
  // ctx = canvas.getContext('2d');
  // labelContainer = document.getElementById('label-container');
  // for (let i = 0; i < maxPredictions; i++) {
  //   labelContainer.appendChild(document.createElement('div'));
  // }
}

async function loop(timestamp) {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {

  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const prediction = await model.predict(posenetOutput);

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    //labelContainer.childNodes[i].innerHTML = classPrediction;
    if (prediction[i].probability.toFixed(2) > 0.7 && prediction[i].className == "Superman" ) {
      dino.classList.add("dinoFlying");
      // setTimeout(() => {
      //   dino.classList.remove("dinoActive");
      // }, 500);
    }
  }

  //drawPose(pose);
}

function drawPose(pose) {
  ctx.drawImage(webcam.canvas, 0, 0);
  if (pose) {
    const minPartConfidence = 0.5;
    tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
    tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
  }
}