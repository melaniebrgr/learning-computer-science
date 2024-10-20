# Game loop pattern

The object of all video games is to present the player with a situation, get their input, interpret those input signals into actions, and calculate a new situation resulting from those actions. I.e.

1. process input,
2. update,
3. render,
4. repeat.

Games are looping through these stages over and over, until some end condition occurs like winning, losing, or exiting to go to bed. Not surprisingly, this pattern corresponds to how a game engine is programmed (1).

With this model in mind, web applications are like old, turn-based games. The application waits for input, responds, then waits again. Instead of sleeping until the next user input, the UI in  most games keeps moving... ...the game loop keeps on dancing.

#### Applications a.k.a turn-based games

```ts
document.getElementById('main').addEventListener('click', () => console.log('click'));

// or
while (true) {
  const event = await someEvent();
  handle(event);
}

// or from the Command Pattern
while (true) {
  const input = await rl.question('');
  keyboardInputHandler.handle(input);
}
```

#### Games that keep on dancing

```ts
while (true) {
  processInput(); // if there is any
  update();
  render();
}
```

## Styles of game loops

1. **Fixed time step with no synchronisation (the unrestrained loop)**:
The loops executes as fast as the code is processed, so on slow machines we'll have a slow game and a fast machines the loop might spin so fast you can't see what's happening.
2. **Fixed time step with synchronisation (the restrained loop)**:
A sleep function is called in the loop that pauses it for at least 16ms. It's a very simple loop. If the code takes longer than that the game in entirity slows down.
3. **Variable time step (the variable loop)**: update the frames based on how much real-time has elapsed during computation. Slow and fast computers are kept in sync and fast computers can update as fast as they can and are rewarded with smoother gameplay. The problem with this is that rounding imprecision with floating point numbers accrete and will eventually harm those fast computers.
4. **Fixed update time step, variable rendering (the fixed and variable parts loop)**:
Keep calculations that are harmed by rounding imprecision in a restrained loop, but _render_ as fast as possible since that usually isn't affected by variable time. This is the example code included.

## References

1. [Anatomy of a video game](https://developer.mozilla.org/en-US/docs/Games/Anatomy)
2. [Window: requestAnimationFrame() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)