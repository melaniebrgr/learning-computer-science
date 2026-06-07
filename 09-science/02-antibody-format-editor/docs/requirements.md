#  abdraw requirements

Names: abdraw, AbDraw, ImmunoDraw, AntibodyDraw, IgDraw

> A lack of standardized nomenclature turns the “zoo” of multi-specific antibodies into a stampede.

## Architecture Characteristics

1. Installable in web application clients
2. Portable to React, Svelte, Vanilla
3. Accessible UI for gov/edu clients
4. Testable for release quality assurance
5. Extendable for new fragments and fragment rule

## Product Requirements

- Supports multiple formats (see format requirements)
- Generates image from AbML nomenclature, and nomenclature from image
- Generates image from VERITAS nomenclature, and nomenclature from image
- Ab themable with presets
- PNG image export

## Technical Ideation

- Event-based render loop: processInput, update, render (game loop with request animation frame)
- Editor snapshotting for undo/redo operations ([memento pattern](https://refactoring.guru/design-patterns/memento)) and file save
- UI elements interact with the editor by actions ([command pattern](https://refactoring.guru/design-patterns/command)):
	- Common domain palette: VH, CH1, CH2, CH3, CH4, VL, CL, VHH
	- Switch between Immunoglobulin and T-cell receptor domains(?)
	- Common format presents, e.g. IgG, scFv, knobs in holes(?)
	- Input for AbML, VERITAS nomenclature
	- Image export
	- File export
	- Editor clearing
- Editor implicit states of drawing, theming(?), deleting (state pattern)
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for the main editor
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for input sanitization
- [Offscreen Canvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) for image and snapshotting
- [HTML in canvas](https://html-in-canvas.dev/) for the UI elements
- Ab format construction with: [composite, builder, decorator (disulphide bonds?) and related patterns](https://refactoring.guru/design-patterns/composite)
- Ab format modelling: skip linked list, or linked list with common suffix
- Graphics drawing, extracting the final sequence(s), nomenclature: composite, or iterator pattern

## References

1. http://www.bioinf.org.uk/software/abydraw/ (https://github.com/JamesSweetJones/abYdraw/)
2. https://bioglyph.app/
3. https://www.steveruiz.me/
4. https://tldraw.dev/quick-start
5. https://pubmed.ncbi.nlm.nih.gov/35838549/ (AbML)