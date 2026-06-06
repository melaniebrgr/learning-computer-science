# Design

## Format modelling

Test case

- `VHH-Fc`
- `VL-linker-VH`
- `Xaa-(VL-linker-VH)-linker-(VH-linker-VL)-Xaa`
- `VL-CL`,`VH-CH1` (1 x SS)
- `VL-CL`,`VH-CH1-hinge`,`hinge-CH1-VH`,`CL-VL` (4 x SS)
- `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS)
- `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS, ~3.5 x X-drug)

Components: chains, domains, linkers, amino acid bridges (S-S, X-drug)

- model the Ab format: skip linked list, or linked list with common suffix
- draw the graphics: composite pattern
- extracting the final sequence(s), nomenclature: composite, or iterator pattern

## Drawing

- render loop with request animation frame