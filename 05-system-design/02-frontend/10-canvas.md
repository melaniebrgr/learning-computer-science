# Canvas

There are four ways to draw things on the web: SVG, CSS, DOM, and Canvas.

- SVG is a vector API that draws shapes. Each shape has an object that you can attach event handlers to. If you zoom in the shape stays smooth, whereas Canvas would become pixelated.
- CSS is about styling DOM elements. There are no DOM objects for things drawn in Canvas so CSS can't be used to style it. CSS will only affect the rectanglar area of the Canvas itself, so you can set a border and background color, but that's it.
- The DOM, or Document Object Model, defines an object for everything on the screen. DOM animation, either by using CSS or JavaScript to move objects around and it can be smoother in some cases than doing it with Canvas, but it depends on the browser implementation.
- Canvas let's you draw and animate anything you want in the web browser. 

The canvas grid system starts at (0,0) at the top left. That is, the canvas origin is in the upper left corner with the y axis going down, which is traditional for computer graphics.

## Drawing

A generally useful method is `c.beginPath()` which says, "we want to create a new path, do not connect it to anything preceeding". Under the hood, the Canvas 2D API empties the list of sub-paths, starting a fresh one. If the method is not called all subsequent calls will extend the sub-path list. What can draw to canvas can be divided into categories,

1. shapes
2. paths
  a. straight
  b. arcs
  c. curves (bezier, quadratic)
5. images
6. text
7. styling

For reference to all methods (context, drawing rectangles and paths, applying styles, transforming and applying filters) see the docs (1).

### 1. shapes

The canvas API has many higher level convenience methods for drawing primitive shapes like rectangles (and squares), ellipses (and circles), some of which fill the shape immediately and some that seperate it into two steps: describe the shape, then fill the shape in. For example,

```js
ctx.beginPath(); // Start a new path
ctx.rect(10, 20, 150, 100); // Add a rectangle to the current path
ctx.fill(); // Render the path
```

or draw the rectangle directly,

```js
ctx.fillStyle = "green";
ctx.fillRect(20, 10, 150, 100);
```

In brief, `rect(x, y, width, height)`, `ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)`

### 2. paths

Next, `c.moveTo(x, y)` is useful to declare where a line should start. At the (x,y) point specified the Canvas 2D API will init a new sub-path.

#### a. straight lines

After beginning a path and moving to the first position, `c.lineTo(x,y)` is used to add a straight line segment to the sub-path list. The line can be extended by adding successively more `c.lineTo()` calls. For the line to actually be rendered to the canvas, a fill or stroke method needs to be called, `c.stroke()`. Example:

```js
c.beginPath()
c.moveTo(200, 10)
c.lineTo(250, 30)
c.lineTo(200, 50)
c.stroke()
```

#### b. arcs (and circles)

Arcs close to form a circle, while curves do not necessarily.

To create an arc, a few arguments are required: `c.arc(x, y, radius, startAngle, endAngle)`. The start and end angles are in radians and essentially define the sweep of the arc. Example,

```js
c.arc(200, 200, 0, Math.PI)
```

Degrees is a human constructed system, potentially coming from ancient calendars that were 360 days for a full rotation. A purely mathematical representation is described by radians. An arc that subtends an angle is the arc that intersects two lines forming some angle θ. The defination of a radian is the angle where the arc that subtends θ is the same length as the radius. (The name "radians" for this definition is not accidental.) Therefore the angle for a full rotation is 2π radians, from the fact that the circumference of a circle is 2πr. Given `360 degrees = 2π radians`, we can deduce useful rad to deg conversions:

```math
1 degree = π/180 radians
180/π degrees = 1 radian
```

#### c. curves

A quadratic curve in canvas has a single control point, while a bezier curve has two control points.

A quadratic curve is a U-shaped graph called a parabola. The vertex is the lowest or highest turning point in the curve. In Canvas, a quadratic curve can created by expressing a control point, `quadraticCurveTo(controlPointX, controlPointY, endX, endY)` (the start point can be moved to before defining the curve).

A bezier curve is more useful for visually connecting nodes.

## Animating

For Canvas motion (e.g., particle systems, custom 2D scenes), it is common practise to use the requestAnimationFrame method, plus custom tweens or a JS tweening library.



## Resources

### Canvas

1. [2D Canvas API docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
2. [HTML Canvas Deep Dive](https://joshondesign.com/p/books/canvasdeepdive/toc.html)
3. [Canvas API Javascript Tutorial For Beginners](https://www.youtube.com/playlist?list=PLc1g3vwxhg1W7Mqwoji844GadZf34lBzR)

### Building a drawing app

1. [Building a drawing app](https://www.youtube.com/watch?v=6arkndScw7A&list=PLSxgVLtIB0IFmQGuVMSE_wDHPW5rq4Ik7)
2. tldraw

### Fun

1. https://roughjs.com/