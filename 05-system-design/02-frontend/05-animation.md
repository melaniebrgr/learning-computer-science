# Animation

The holy trinity of motion graphics on the web are,

- video
- transitions
- animations

Motion's purpose falls into two camps: informative and aesthetic. It can be informative in signalling the user on what actions are available and how to use the UI by drawing attention through motion. It can be purely aesthetic by adding personality and character.

## Web Animations API (WAAPI)

The Web Animations API was designed to underlie implementations of both CSS Animations and CSS Transitions and opens the browser's animation engine to developers. 

> It is one of the most performant ways to animate on the Web, letting the browser make its own internal optimizations without hacks, coercion, or Window.requestAnimationFrame() (12).

The Web Animations API cannot be used to directly animate pixels on a <canvas>; it is designed to animate animatable properties of DOM elements (including SVG elements), not the drawing buffer of the Canvas 2D/WebGL context. The core entrypoint is Element.animate(), which, by definition, acts on DOM elements and their style/transform-like properties.

## Transitions

Transitions guide one state to another.

### CSS Transitions

There are general guidelines for transitions. The duration of a transition should be between `100ms` and `500ms` depending on the complexity and how far the element is travelling. 100ms feel "immediate" and are suitable for small interactions, such as transitions that close, dismiss, or collapse elements, e.g. a toggle switch. Somewhere in between are "fast" and "normal" speeds suitable for large motions like expanding a chip. 500ms feels "slow" and is suitable for large interactions, e.g FAB into a full page.

Transitioning _in_ generally should be a few ms longer than transitioning _out_, e.g. `250ms` in and `200ms` out, and easing functions should from fast to slow when easing _in_.

CSS transitions are applied with the transition property. The properties being transitioned are configured on the parent class, and the value being transitioned is configured on a state the HTML element eventually reaches, e.g. when another class is applied or pseudoselector.

A few tips.

A `@starting-style` can be used to apply a style that the browser can look up before an element is opened on the page. This is the “before-open” state (where you are animating in from), e.g.

```css
@starting-style {
  .item {
    opacity: 0;
    height: 0;
  }
}
```

Discrete properties previously inaccessible in transitions can be addressed with the `allow-discrete` keyword, e.g. `transition: opacity 0.25s, display 0.25s allow-discrete;`. Notable discrete properties: content-width, display.

### View transitions

View transition animates between two states of an application. A state can be a page, a modal, or a popover. The View Transition API allows for smooth transitions between these states without the need for complex JavaScript animations. It captures the current state of the DOM and animates to the new state seemlessly. (NB: React has a built in View Transition component.)

## Animations

### CSS Animations

With animation there are two considerations

- Timing duration
- Easing function

More elaborate exit animations with `display` and `content-visibility` can be added on a keyframe timeline. Ensure styles remain applied at the end with `forwards` (1). Exit animations styles can be applied on trigger, e.g. click, (then remove the DOM node with a timeout to allow for the animation to finish first).

### Request Animation Frame

`requestAnimationFrame` is a method on the window object that be used to create a "more accurate version of setInterval" for creating animations (13).
It requests the browser to call a user-supplied callback function before the next repaint.
The frequency of calls to the callback function will generally match the display refresh rate, the most common being 60hz.
For performance opstimsation, calls to requestAnimationFrame are paused when the tab is in the background, unlike `setInterval`.

The callback passed to requestAnimationFrame gets passed as an argument a "high resolution timestamp" in milliseconds indicating the time elapsed from the previous frame rendering.
This can be used to make sure that animations occur at a uniform speed across different monitors with different refresh frequencies.
In general you want to update the frame 16.6ms apaprt (60 FPS).

> Be sure always to use the first argument (or some other method for getting the current time) to calculate how much the animation will progress in a frame — otherwise, the animation will run faster on high refresh-rate screens.

The `requestAnimationFrame` method returns a request ID that can be used to cancel the refresh callback request, using the window method, `cancelAnimationFrame`.

### Scroll-Driven Animations

In scroll-dirven animations there is a direct relationship between the scroll position and the progress of the animation. An existing CSS animation or WAAPI animation can be linked to scroll.

## Libraries (GSAP, Framer)

## Resources

1. [Four new CSS features for smooth entry and exit animations](https://developer.chrome.com/blog/entry-exit-animations)
2. [Web animations today and tomorrow](https://www.youtube.com/watch?v=UcXWY057YuQ)
3. [Transitioning discrete properties](http://goo.gle/top-layer-transitions)
4. [Entry and Exit Animations](https://goo.gle/entry-exit-animations)
5. [Animate to Height](http://goo.gle/animate-to-auto)
6. [Interop 2025](http://goo.gle/interop-2025)
7. [More options for styling](http://goo.gle/styling-details)
8. [Scroll-driven Animations](https://goo.gle/43doYBD)
9. [Smooth transitions with the View Transition API](http://goo.gle/view-transitions)
10. [React Labs: View Transitions, Activity, and more](http://goo.gle/react-view-transitions)
11. [CSS attr() gets an upgrade](http://goo.gle/attr)
12. [Using the Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
13. [The Hidden World of requestAnimationFrame](https://www.youtube.com/watch?v=zBRqnSiq_VM&t=312s)