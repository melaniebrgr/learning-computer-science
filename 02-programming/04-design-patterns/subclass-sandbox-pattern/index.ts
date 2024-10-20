const SOUND = {
  SPROING: 'sproing'
} as const;

type Sound = typeof SOUND[keyof typeof SOUND];

const PARTICLE = {
  DUST: 'dust',
} as const;

type Particle = typeof PARTICLE[keyof typeof PARTICLE];

const MOOD = {
  GLAD: 'glad',
  SAD: 'sad',
  MAD: 'mad'
}

type Mood = typeof MOOD[keyof typeof MOOD];

class Superpower {
  protected activate(): void {} // sandboxed method, it must be overriden by the subclass

  protected move(x: number, y: number, z: number): void {
    console.log(`Moving to ${x}, ${y}, ${z}`);
  }

  protected playSound(id: Sound): void {
    console.log(`Playing sound ${id}`);
  }

  protected spawnParticles(id: Particle, number: number): void {
    console.log(`Spawning ${number} ${id} particles`);
  }

  protected getHeroMood() {
    // pretend this returns some mood based on game state
    return MOOD.MAD;
  }
}

class SkyLaunch extends Superpower {
  override activate(): void {
    const mood = this.getHeroMood();

    if (mood === MOOD.GLAD) {
      this.move(0, 0, 20);
      this.playSound(SOUND.SPROING);
      this.spawnParticles(PARTICLE.DUST, 10);
    }

    if (mood === MOOD.MAD) {
      this.move(0, 0, 40);
      this.playSound(SOUND.SPROING);
      this.spawnParticles(PARTICLE.DUST, 20);
    }

    if (mood === MOOD.SAD) {
      this.move(0, 0, 1);
      this.playSound(SOUND.SPROING);
    }
  }
}

const power = new SkyLaunch();

power.activate();

// Moving to 0, 0, 40
// Playing sound sproing
// Spawning 20 dust particles