#  Building an Antibody Format Editor from scratch

Names: AbDraw, ImmunoDraw, AntibodyDraw

> A lack of standardized nomenclature turns the “zoo” of multi-specific antibodies into a stampede.

## AC

1. Installable in web application clients
2. Portable to React, Svelte, Vanilla
3. Accessible UI for gov/edu clients
4. Testable for release quality assurance
5. Extendable for new fragments and fragment rule

## PR

- Supports formats:
    - IgG
    - scFV-Fc
    - BiTE
    - Fab
    - (Fab')₂
- Generates image from AbML nomenclature, and nomenclature from image
- Generates image from VERITAS nomenclature, and nomenclature from image
- Ab themable with presets
- PNG image export

## TR

- Event-based render loop: processInput, update, render (game loop)
- Editor snapshotting for undo/redo operations (memento pattern) and file save
- UI elements interact with the editor by actions (command pattern):
    - Common domain palette: VH, CH1, CH2, CH3, CH4, VL, CL, VHH
    - Switch between Immunoglobulin and T-cell receptor domains(?)
    - Common format presents, e.g. IgG, scFv, knobs in holes(?)
    - Input for AbML, VERITAS nomenclature
    - Image export
    - File export
    - Editor clearing
- Editor implicit states of drawing, theming(?), deleting (state pattern)
- [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and [WebGPU](https://www.youtube.com/watch?v=dXPHLNovCjE&list=PLCnmpqh8sKKzxXoZwValac_tVwGa7l6Ax) for main editor
- [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for input sanitization

## Referencs

1. http://www.bioinf.org.uk/software/abydraw/ (https://github.com/JamesSweetJones/abYdraw/)
2. https://bioglyph.app/
3. https://www.steveruiz.me/
4. https://tldraw.dev/quick-start
5. https://pubmed.ncbi.nlm.nih.gov/35838549/ (AbML)
