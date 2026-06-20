# Canvas

The canvas grid system starts at (0,0) at the top left.

## Drawing

1. shapes
2. paths
  a. straight
  b. arcs
  c. bezier curves
5. images
6. text
7. styling

For reference to all methods (context, drawing rectangles and paths, applying styles, transforming and applying filters)

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

A generally useful method is `c.beginPath()` which says, "we want to create a new path, do not connect it to anything preceeding". Under the hood, the Canvas 2D API empties the list of sub-paths, starting a fresh one. Next, `c.moveTo(x, y)` is useful to declare where a line should start. At the (x,y) point specified the Canvas 2D API will init a new sub-path.

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

To create an arc, a few arguments are required: `c.arc(x, y, radius, startAngle, endAngle)`. The start and end angles are in radians and essentially define the sweep of the arc. Example,

```js
c.arc(200, 200, 0, Math.PI)
```

Degrees is a human constructed system, potentially coming from ancient calendars that were 360 days for a full rotation. A purely mathematical representation is described by radians. An arc that subtends an angle is the arc that intersects two lines forming some angle θ. The defination of a radian is the angle where the arc that subtends θ is the same length as the radius. (The name "radians" for this definition is not accidental.) Therefore the angle for a full rotation is 2π radians, from the fact that the circumference of a circle is 2πr. Given `360 degrees = 2π radians`, we can deduce useful rad to deg conversions:

```math
1 degree = π/180 radians
180/π degrees = 1 radian
```

## Canvas resources

1. [2D Canvas API docs](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
2. [HTML Canvas Deep Dive](https://joshondesign.com/p/books/canvasdeepdive/toc.html)

## Building a drawing app resources

1. [Building a drawing app](https://www.youtube.com/watch?v=6arkndScw7A&list=PLSxgVLtIB0IFmQGuVMSE_wDHPW5rq4Ik7)
2. tldraw

## Fun libraries

1. https://roughjs.com/