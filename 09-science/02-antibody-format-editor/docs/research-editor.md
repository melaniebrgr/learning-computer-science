# Research

## Antibody format editors

Antibody visualisation software spans the range from tool for illustration (BioRender) to tool for research (HAbE).

1. HELM Antibody Editor (HAbE)
  - https://github.com/PistoiaHELM/HELMAntibodyEditor
  - https://pubs.acs.org/doi/10.1021/ci3001925
2. Benchling Format UI
  - https://www.benchling.com/blog/benchling-biologics-delivers-antibody-design-and-registration
3. BioRender
4. BioGlyphs
5. abYdraw (from AbML)
  - https://github.com/JamesSweetJones/abYdraw
6. PyMOL/Mol*
  - https://zmactep.github.io/pymol-rs/#architecture

### HELM Antibody Editor (HAbE)

The Hierarchical Editing Language for Macromolecules (HELM) is a linear and machine-readable notation for the representation of macromolecules, like SMILES for small molecules (1).
It enables a uniform representation of biomolecules such as proteins, nucleotides, antibody-drug conjugates, and many more.
HELM was developed in 2013 by Pfizer and the Pistoia Alliance (1).

The HELM Antibody Editor was last updated and release allows the user to visualise and manipulate antibody structures.
The HELM Antibody Editor is part of the HELM (Hierarchical Editing Language for Macromolecules) project.
Documentation and user guides for HAbE are on the HELM wiki.
HAbE2 is developed by Roche (Stefan Klostermann, Roche pREDi) was released on GitHub as an OS in January 2018 (1).
Designed to handle complex antibodies: analyze, visualise, manipulate and register.
The HAbE allows you to draw an Ab by hand, and it gets understood by the system and registered. It is possible to manipulate the Ab afterward.

HAbE features

- Custom monomers: Design a monomer for the HAbE and save it into a local monomer store.
- Full ADC support: Attach chemical molecules to a peptide at the N- or C-terminal end, on specific amino acids or on an amino acid type with a statistical binding ratio
- Biological editing: Crop Ab according to protease motifs

#### References

1. https://www.quattro-research.com/en/helm/
2. https://pistoiaalliance.atlassian.net/wiki/spaces/PUB/pages/13795371/HELM+Antibody+Editor+HAbE