# Animation

The web motion graphics trinity:

- video
- transitions
- animations

Motions two main purposes are informative and aesthetic. It's informative because it signals the the user how to use the UI and what actions are available. Drawing attention through motion is one way to communicate that this is an interactive element. Motion also adds personality or character, which is the aesthetic aspect.

## Transitions

Transitions smoothly guide from one state to another.

### CSS Transitions

The duration of a transition should be between `100ms` and `500ms` depending on the complexity and how far the element is travelling. 100ms feel "immediate" and are suitable for small interactions. Transitions that close, dismiss, or collapse elements should use shorter durations, e.g. toggle switch. Somewhere in between are "fast" and "normal" speeds suitable for expanding a chip. 500ms feel "slow" and is suitable for large interactions, e.g FAB into a full page. Transitioning _in_ generally should be a few ms longer than transitioning _out_, e.g. `250ms` in and `200ms` out, and generally the easing function should from from fast to slow when easing _in_.

CSS transitions are applied with the transition property. The properties bein transitions are configured on the parent class, and the the value being transitioned to is configure on a state the HTML element eventually reaches, e.g. when another class is applied or pseudoselector.

Use `@starting-style` to apply a style that the browser can look up before the element is open on the page. This is the “before-open” state (where you are animating in from), e.g.

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

Transition animations between two states of an application by clicking a link. A state can be a page, a modal, or a popover. The View Transition API allows for smooth transitions between these states without the need for complex JavaScript animations. It captures the current state of the DOM and animates to the new state, providing a seamless user experience. React has a built in View Transition component.

## Animations

### CSS Animations

With animation there are two considerations

- Timing duration
- Easing function

More elaborate exit animations with `display` and `content-visibility` can be added on a keyframe timeline. Ensure styles remain applied at the end with `forwards` (1). Exit animations styles can be applied on trigger, e.g. click, (then remove the DOM node with a timeout to allow for the animation to finish first).

### Web Animations API (WAAPI)

### Request Animation Frame

### Scroll-Driven Animations

There is a direct relationship between the scroll position and the progress of the animation. An existing CSS animation or WAAPI animation can be linked to scroll.

## Libraries (GSAP, Framer)

## Resources

1. [Four new CSS features for smooth entry and exit animations](https://developer.chrome.com/blog/entry-exit-animations)
1. [Web animations today and tomorrow](https://www.youtube.com/watch?v=UcXWY057YuQ)
1. [Transitioning discrete properties](http://goo.gle/top-layer-transitions)
1. [Entry and Exit Animations](https://goo.gle/entry-exit-animations)
1. [Animate to Height](http://goo.gle/animate-to-auto)
1. [Interop 2025](http://goo.gle/interop-2025)
1. [More options for styling](http://goo.gle/styling-details)
1. [Scroll-driven Animations](https://goo.gle/43doYBD)
1. [Smooth transitions with the View Transition API](http://goo.gle/view-transitions)
1. [React Labs: View Transitions, Activity, and more](http://goo.gle/react-view-transitions)
1. [CSS attr() gets an upgrade](http://goo.gle/attr)

## Misc

- top-layer-transitions
- `@starting-style`
- interpolate-size
- `::details-content` pseudoelement and animation