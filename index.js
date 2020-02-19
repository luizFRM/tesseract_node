const path = require('path');
const tesseract = require('tesseract.js');
const cv = require('opencv4nodejs');

const img = path.resolve(`./img/helloworld.jpg`);
const FPS = 30;


const camera = new cv.VideoCapture(0);

function recognizeText() {
  setInterval(async() => {
    const frame = camera.read().bgrToGray();
    const image = cv.imencode('.png', frame);
  
    await tesseract.recognize(image)
    .then((data) => {
      console.log(data.text);
    })
    .catch((err) => {
      console.log('Error\n', err);
    })
  
    cv.imshow("Reconhecimento de imagem", frame);
    cv.waitKey(1);
  
  }, 1000 / FPS)
}

recognizeText();

