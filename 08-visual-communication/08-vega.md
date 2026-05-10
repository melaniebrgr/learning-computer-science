# Vega

> Vega is a visualization grammar, a declarative language for creating, saving, and sharing interactive visualization designs. With Vega, you can describe the visual appearance and interactive behavior of a visualization in a JSON format, and generate web-based views using Canvas or SVG.

- **vega**: A general visualization grammar where you explicitly describe data loading, transforms, marks, scales, axes, legends, and interactions in JSON. Custom or exotic visualizations (trees, graphs, word clouds, very custom layouts). Use Vega when you want custom or exotic visualizations (trees, graphs, word clouds, very custom layouts), fine-grained control over rendering, interaction signals, event streams, and layout.
- **vega-lite**: A higher-level grammar of interactive graphics where you mostly describe encodings (x, y, color, etc.) and mark type; the compiler fills in scales, axes, legends, and many defaults, then generates a Vega spec. Every Vega-Lite spec becomes a Vega spec under the hood. Use Vega-Lite when you want built‑in analytical transforms (aggregation, binning, filtering, stacking, faceting) without wiring up low-level plumbing, and reasonable defaults for scales, axes, and legends that you tweak only when needed.

## Data preparation: Vega-lite specification

- **data**: In the data field the array holding the data values is provided. E.g. "data": {
    "values": [
      {"a": "C", "b": 2}, {"a": "C", "b": 7}, {"a": "C", "b": 4},
      {"a": "D", "b": 1}, {"a": "D", "b": 2}, {"a": "D", "b": 6},
      {"a": "E", "b": 8}, {"a": "E", "b": 4}, {"a": "E", "b": 7}
    ]
  },
- **[mark](https://vega.github.io/vega-lite/docs/mark.html)**: The basic graphical elements used to visually encode data. Mark primitives kinds "area", "bar", "circle", "line", "point", "rect", "rule", "square", "text", "tick", and "geoshape" are built in. In addition, composite mark "macros" of "boxplot", "errorband", "errorbar" are available. Vega-Lite renders one point for each datum in the same position until the **encoding** is provided.
- **encoding**: Provides a key-value mapping between encoding channels (such as x, y) and definitions of the mapped data fields. There are numerouse encoding channels, e.g. position (x, y, x2, y2, xError), polar (radius, theta), geographic (lat, long), properties (color, opacity, stroke, shape), hyperlink (href), description, detail, key, order, facet. Additional built in specifiers:
    - transformations such as **aggregate**, e.g. averaging values
    - axes titles with **title**

Try [an example](https://vega.github.io/editor/#/edited).

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": {
    "values": [
      {"a": "C", "b": 2},
      {"a": "C", "b": 7},
      {"a": "C", "b": 4},
      {"a": "D", "b": 1},
      {"a": "D", "b": 2},
      {"a": "D", "b": 6},
      {"a": "E", "b": 8},
      {"a": "E", "b": 4},
      {"a": "E", "b": 7}
    ]
  },
  "mark": "bar",
  "encoding": {
    "y": {"field": "a", "type": "nominal"},
    "x": { "aggregate": "average", "field": "b", "type": "quantitative", "title": "Mean of b"}
  }
}
```

## Graph rendering

Use Vega-Embed to embed your Vega-Lite visualization in a webpage.