# Component pattern

For situations where many domains are tangled together in a single large component. the component patterns is about cutting the gordian knot: decomposing into vertical doamins like AI, physics rendering, sound and finding ways to bind those systems together so they can be worked in in isolation.

> Components are basically plug and play for objects. They let us build complex entitites with rich behaviour by plugging different reusable component objects into sockes on the entity.

What you will have: a single entity spanning multiple domains where the code for each domain is in it's own component and the single entity contains them. I am multitudes. Beware! Decoupling into components can also bring it's own complexity in the form wiring communication and performance complexity.

React did this first: a web application decomposed into components.

## Component pattern patterns

### How the object gets components: outside code provides the components to the object

More flexible

```ts
class GameObject {
  #input: InputComponent;
  #physics: PhysicsComponent;
  #graphics: GraphicsComponent;

  constructor(input: InputComponent, physics: PhysicsComponent, graphics: GraphicsComponent) {
    this.#input = input;
    this.#physics = physics;
    this.#graphics = graphics;
  }

  update() {
    this.#input.update();
    this.#physics.update();
    this.#graphics.update();  
  }
}
```

### How the object gets components: the objects sets up its own components inside

Nothing needs to passed in, the object has everything, but it is harder to reconfigure later.

```ts
class GameObject {
  #input = new InputComponent();
  #physics = new PhysicsComponent();
  #graphics = new GraphicsComponent();

  update() {
    this.#input.update();
    this.#physics.update();
    this.#graphics.update();  
  }
}
```

### How the components communicate: by modifying the object's state

Any information that should be shared needs to be pushed to the parent and state depends on the order of component exectution.

```ts
class GameObject {
  #state = {};
  #input = new InputComponent();
  #physics = new PhysicsComponent();
  #graphics = new GraphicsComponent();

  update() {
    this.#input.update(); // updates state first
    this.#physics.update(); // updates state second
    this.#graphics.update(); // updates state third
  }
}
```

### How the components communicate: by refering to each other

Simple and fast but the components are tightly coupled now.

```ts
class GameObject {
  #input = new InputComponent();
  #physics = new PhysicsComponent();
  #graphics = new GraphicsComponent();

  update() {
    this.#input.update();
    this.#physics.update(this.#input);
    this.#graphics.update(this.#physics);
  }
}
```

### How the components communicate: by passing messages

A "fire and forget" messaging system is built in. Sibling components are decoupled, state doesn't run the risk of becoming complicated. Most complex to debug.

```ts
class GameObject {
  #components = [];

  send(message: Message) {
    this.#components.forEach(component => component.receive(message));
  }
}
```
