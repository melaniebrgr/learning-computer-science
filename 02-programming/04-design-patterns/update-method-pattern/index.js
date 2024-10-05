// const MS_PER_FRAME = 1000 / 60; // 16 FPS
const MS_PER_FRAME = 1000 / 2; // 2 FPS

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

class Skeleton extends Entity {
  #patrollingLeft = false;

  constructor() {
    super();
    this.x = 50;
    this.y = 0;
  }

  update() {
    if (this.#patrollingLeft) {
      this.x--;
      if (this.x === 0) this.#patrollingLeft = false;
    } else {
      this.x++;
      if (this.x === 100) this.#patrollingLeft = true;
    }
    console.log(`The skeleton is at ${this.x}`);
  }
}

class World {
  static #entities = [new Skeleton()];

  static #handleInput() {
    // console.log('processed input');
  }

  static #update() {
    World.#entities.forEach(entity => entity.update())
  }

  static #render() {
    // console.log('rendered scene');
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