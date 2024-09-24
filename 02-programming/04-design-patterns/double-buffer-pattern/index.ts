class FrameBuffer {
  #pixels = [
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️'],
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️'],
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️'],
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️'],
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️'],
    ['⬜️','⬜️','⬜️','⬜️','⬜️','⬜️']
  ];

  clear() {
    this.#pixels.map(row => row.map(() => '⬜️'));
  }

  draw(x: number, y: number) {
    this.#pixels[Math.abs(y - this.#pixels.length + 1)][x] = '⬛️';
  }

  get pixels() {
    return this.#pixels;
  }
}

class Scene {
  #current: FrameBuffer;
  #next: FrameBuffer;

  constructor() {
    this.#current = new FrameBuffer();
    this.#next = new FrameBuffer();
  }

  swap() {
    const temp = this.#current;
    this.#current = this.#next;
    this.#next = temp;
  }

  draw(coordinates: number[][]) {
    this.#next.clear();
    coordinates.forEach(([x,y]) => this.#next.draw(x,y))
    this.swap();
  }

  get scene() {
    return this.#current.pixels.map(row => {
      return row.join('') + '\n';
    }).join('');
  }
}

// init blank scene
const scene = new Scene();
console.log(scene.scene);

// draw a smile
scene.draw([[1,2],[1,4],[2,1],[3,1],[4,2],[4,4]]);
console.log(scene.scene);

// move it up
scene.draw([[1,3],[1,5],[2,2],[3,2],[4,3],[4,5]]);
console.log(scene.scene);

// move it down
scene.draw([[1,2],[1,4],[2,1],[3,1],[4,2],[4,4]]);
console.log(scene.scene);