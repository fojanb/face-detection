const faceDetector = new FaceDetector();
const video = document.querySelector("video.webcam");
const canvas = document.querySelector("canvas.video");
const ctx = canvas.getContext("2d");
const faceCanvas = document.querySelector("canvas.face");
const faceCtx = faceCanvas.getContext("2d");
const options = {
  SIZE: 10,
  SCALE: 1.35,
};
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  console.log(stream);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}
async function detect() {
  const faces = await faceDetector.detect(video);
  console.log(faces);
  // console.log(faces.length); => How many faces are on the camera?
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  faces.forEach(drawFace);
  requestAnimationFrame(detect);
  // We could use detect() but because of performance we choose requestAnimationFrame(detect)
}
function drawFace(face) {
  const { top, left, height, width } = face.boundingBox;
  console.log({ top, left, height, width });
  ctx.strokeRect(left, top, width, height);
  ctx.strokeStyle = "#02c39a";
  ctx.lineWidth = 7;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  censor(face);
}
function censor(face) {
  const { x, y, height, width } = face.boundingBox;
  ctx.fillRect(x,y,height, width);
  // faceCtx.drawImage(
  //   video, // source
  //   x, // where do we start the source pull from?
  //   y,
  //   width,
  //   height,
  //   // drawing args
  //   x,
  //   y,
  //   options.SIZE,
  //   options.SIZE
  // );
  // const newWidth = width * options.SCALE;
  // const newHeight = height * options.SCALE;
  // faceCtx.drawImage(
  //   faceCanvas, // source
  //   x, // where do we start the source pull from?
  //   y,
  //   options.SIZE,
  //   options.SIZE,
  //   // Drawing args
  //   x - (newWidth - width) / 2,
  //   y - (newHeight - height) / 2,
  //   newWidth,
  //   newHeight
  // );
}
populateVideo().then(detect);
