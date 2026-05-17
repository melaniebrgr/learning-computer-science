#  Building an Antibody Format Editor from scratch

> A lack of standardized nomenclature turns the “zoo” of multi-specific antibodies into a stampede.

## AC

1. Installable in web application clients
2. Portable to React, Svelte, Vanilla
3. Accessible UI for gov/edu clients
4. Testable for release quality assurance
5. Extendable for new fragments and fragment rule

## PRD

- Supports formats:
    - IgG
    - scFV-Fc
    - BiTE
    - Fab
    - (Fab')₂
- Generates AbML nomenclature
- Generates VERITAS nomenclature
- User manual labelling, e.g. corresponding residue numbers
- Themable
- PNG image export

## TRD

- Event-based render loop: processInput, update, render
- Editor snapshotting for undo/redo operations (memento pattern)
- UI elements interact with the editor by actions (command pattern)
- Editor implicit states of drawing, theming(?), deleting (state pattern)
- [Canvas and WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for main editor
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for input sanitization

## Referencs

1. http://www.bioinf.org.uk/software/abydraw/ (https://github.com/JamesSweetJones/abYdraw/)
2. https://bioglyph.app/
3. https://www.steveruiz.me/
4. https://tldraw.dev/quick-start