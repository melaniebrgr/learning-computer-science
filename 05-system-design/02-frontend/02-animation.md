# Animation

With animation there are two considerations

- Timing duration
- Easing function

## Misc

- top-layer-transitions
- `@starting-style`
- interpolate-size
- `::details-content` pseudoelement and animation

## CSS transitions

The duration of a transition should be between `100ms` and `500ms` depending on the complexity and how far the element is travelling. 100ms feel "immediate" and are suitable for small interactions. Transitions that close, dismiss, or collapse elements should use shorter durations, e.g. toggle switch. Somewhere in between are "fast" and "normal" speeds suitable for expanding a chip. 500ms feel "slow" and is suitable for large interactions, e.g FAB into a full page. Transitioning _in_ generally should be a few ms longer than transitioning _out_, e.g. `250ms` in and `200ms` out, and generally the easing function should from from fast to slow when easing _in_.

CSS transitions are applied with the transition property. The properties bein transitions are configured on the parent class, and the the value being transitioned to is configure on a state the HTML element eventually reaches, e.g. when another class is applied or pseudoselector.

### Entry transitions

Use `@starting-styl`e to apply a style that the browser can look up before the element is open on the page. This is the “before-open” state (where you are animating in from), e.g.

```css
@starting-style {
  .item {
    opacity: 0;
    height: 0;
  }
}
```

### Exit transitions

Discrete properties previously inaccessible in transitions can be addressed with the `allow-discrete` keyword, e.g. `transition: opacity 0.25s, display 0.25s allow-discrete;`. Notable discrete properties: content-width, dusplay.

## CSS animations

### Exit animations

More elaborate exit animations with `display` and `content-visibility` can be added on a keyframe timeline. Ensure styles remain applied at the end with `forwards` (1). Exit animations styles can be applied on trigger, e.g. click, (then remove the DOM node with a timeout to allow for the animation to finish first).

## Web animations API

## Request animation frame

## View transitions

## Scroll-driven animations

## Libraries (GSAP, Framer)

## Resources

1. [Four new CSS features for smooth entry and exit animations](https://developer.chrome.com/blog/entry-exit-animations)
2. [Web animations today and tomorrow](https://www.youtube.com/watch?v=UcXWY057YuQ)
