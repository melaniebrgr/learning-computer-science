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

  draw() {
    this.#next.clear();
    this.#next.draw(1,2);
    this.#next.draw(1,4);
    this.#next.draw(2,1);
    this.#next.draw(3,1);
    this.#next.draw(4,2);
    this.#next.draw(4,4);
    this.swap();
  }

  get scene() {
    return this.#current.pixels.map(row => {
      return row.join('') + '\n';
    }).join('');
  }
}

const scene = new Scene();

console.log(scene.scene);

scene.draw();

console.log(scene.scene);