// const picA = 'images/mona-lisa-leonardo-da-vinci-la-gioconda-oil-painting-40997.jpeg'
// const picE = 'images/ada_lovelace_color.png'
const picE = 'images/rgb_test_file.jpg'
const picB = 'images/test-image.png'
const picD = 'images/mona-small.png'
// const picE = 'images/mona-sml-b.jpeg'

// Make these dynamic

// const imgDimsB = [200, 300]
var marvinImage = new MarvinImage();


// drawing the HTML div w/ id 'drawing'
var draw = SVG('drawing');

// Set up for red, green, blue layers
/*var drawR = SVG('layerr')
  .size(...imgDims)
  .rect(...imgDims).move(0, 0)
  .attr({ fill: 'red' })
var drawG = SVG('layerg')
  .size(...imgDims)
  .rect(...imgDims).move(0, 0).attr({ fill: 'green' })
var drawB = SVG('layerb')
  .size(...imgDims)
  .rect(...imgDims).move(0, 0).attr({ fill: 'blue' })*/

let col = 0
let row = 0
const colShift = 2
const rowShift = 2
const radius = 2
const threshold = 75
const colorDif = 50

function drawImageWithCircles() {
  
  const imageData = marvinImage.imageData.data
  
  let i = 0

  while (i < imageData.length) {

    const total = imageData[i] + imageData[i + 1] + imageData[i + 2]
    const [r, g, b] = [imageData[i], imageData[i + 1], imageData[i + 2]]
    row += rowShift
    
    if (total < 50) {
      draw.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
    } 
    if (total > 300) { // white
      draw.circle(radius).attr({ fill: 'white' }).move(row, col)
      // drawR.circle(radius).attr({ fill: 'black' }).move(row, col)
      // drawG.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
      // drawB.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
    } else if (g > threshold) { // red
      draw.circle(radius).attr({ fill: 'red' }).move(row, col - 2)
      // drawR.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
    }        
    else if (b > threshold) {
      draw.circle(radius).attr({ fill: 'blue' }).move(row, col + 2)
      // draw.circle(radius).attr({ fill: 'green' }).move(row, col)
      // drawB.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
    } else if (g > threshold) {
      // drawG.circle(radius + 7).attr({ fill: 'black' }).move(row, col)
    }
    else {
      draw.circle(radius).attr({ fill: 'black' }).move(row, col)
    } 
    // end of line
    if (i % (marvinImage.imageData.width * 4) === 0) {
      col += colShift
      row = 0
    }
    i += 4
  }
}
const imgDims = [900, 900]

draw.size(...imgDims)
draw.rect(...imgDims).move(0, 0)
  .attr({ fill: 'white' })

marvinImage.load(picE, drawImageWithCircles);
// SVG.on(document, 'DOMContentLoaded', function () {
//   console.log('abc', SVG)
//   var draw = SVG('drawing')
//   draw.size(300, 300)
//   var rect = draw.rect(100, 100).attr({ fill: 'blue' })
// })