const MS_PER_FRAME = 1000 / 60;

class Entity {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  update() {}

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }
}

class World {
  entities = [];

  static #handleInput() {
    console.log('processed input');
  }

  static #update() {
    console.log('updated');
  }

  static #render() {
    console.log('rendered scene');
  }
  
  static gameloop() {
    let lag = 0;
    let previous = 0;

    window.requestAnimationFrame(firstFrame);

    function firstFrame(current) {
      previous = current;
      window.requestAnimationFrame(loop);
    }

    function loop(current) {
      window.requestAnimationFrame(loop);
      
      const elapsed = current - previous;
      previous = current;
      lag += elapsed;

      World.#handleInput();
      
      if (lag >= MS_PER_FRAME) { 
        World.#update();
        lag -= MS_PER_FRAME;
      }
      
      World.#render();
    }
  }


}

World.gameloop();