# Canvas

The canvas grid system starts at (0,0) at the top left.

## Drawing

1. rectangles
2. lines
3. arcs, circles
4. bezier curves
5. images
6. text

### 1. rectangles

### 2. lines

The draw a line `c.beginPath()`, which says, "we want to begin a path, do not connect it to anything preceeding". To declare where the line should start, `c.moveTo(x, y)` and end, `c.lineTo(x,y)`. For the line to actually show, a stroke method needs to be called, `c.stroke()`. The line can be extended by adding more `c.lineTo()`. To style the stroke, `c.strokeStyle = colour`. Example:

```js
c.beginPath()
c.moveTo(200, 10)
c.lineTo(250, 30)
c.lineTo(200, 50)
c.strokeStyle = 'red'
c.stroke()
```

## Resources

1. https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
2. https://www.youtube.com/watch?v=6arkndScw7A&list=PLSxgVLtIB0IFmQGuVMSE_wDHPW5rq4Ik7
3. https://tldraw.dev/quick-start
4. https://github.com/tldraw/tldraw
5. https://roughjs.com/