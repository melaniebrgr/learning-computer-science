const MS_PER_FRAME = 1000 / 60;

let lag = 0; // lag is a measure of how far the game clock is behind the real world clock
let previous = 0;

window.requestAnimationFrame(firstFrame);

function firstFrame(current) {
  previous = current; // set the zero point (some browsers have a multi-frame delay between the initial call to requestAnimationFrame() and the first call to the callback function.)
  window.requestAnimationFrame(loop);
}

function loop(current) {
  window.requestAnimationFrame(loop);
  
  const elapsed = current - previous;
  previous = current;
  lag += elapsed; // update the lag based on how much real time has passed

  processInput(); // capture input as fast as possible
  
  if (lag >= MS_PER_FRAME) { 
    update(); // update the game in a fixed time step
    lag -= MS_PER_FRAME;
  }
  
  render(); // render as fast as possible
}

function processInput() {
  console.log('processed input');
}

function update() {
  console.log('updated');
}

function render() {
  console.log('rendered scene');
}