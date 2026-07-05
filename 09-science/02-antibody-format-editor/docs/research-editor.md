# Research

## Antibody format editors

Antibody visualisation software spans the range from tool for illustration (BioRender) to tool for research (HAbE).

1. HELM Antibody Editor (HAbE)
1. abYdraw (from AbML): https://github.com/JamesSweetJones/abYdraw
1. Benchling Format UI: https://www.benchling.com/blog/benchling-biologics-delivers-antibody-design-and-registration
1. BioGlyphs
1. BioRender

### HELM Antibody Editor (HAbE)

The Hierarchical Editing Language for Macromolecules (HELM, 3) is a machine-readable notation for the representation of macromolecules, like SMILES for small molecules (1).
It's goal was to enable a uniform representation of biomolecules such as proteins, nucleotides, antibody-drug conjugates, and many more.
HELM was developed in 2013 by Pfizer and the Pistoia Alliance (1).
The HELM Antibody Editor (HAbE) is part of the HELM project.
It was developed at Roche (Stefan Klostermann, Roche pREDi) and was released on GitHub as an OS in January 2018 (1).

HAbE is a monolithic Java Swing desktop application that uses "HELM technology to handle complex antibodies for their analysis, assembly, visualization, manipulation and registration." (4)

To use the HAbE software, you begin by importing a raw sequence in FASTA file format.
The loaded peptide chains are presented for manual editing, and on confirmation, the domains are automatically detected using a Basic Local Alignment Search Tool (BLAST) versus the "domain library" and then labeled using "domain short names" from the domain library.
The library used for domain detection can be configured, or the settings can be customised personally.
The full antibody is finally assembled and rendered based on these found domains according to a "auto-connector ruleset".
The chains can be extended with arbitrary peptide sequences at the N- or C-terminals from a "Reactions" menu, e.g. sortase coupling, and biotinylation.
From a "ADC designer" window you choose to bind any monomer, e.g. sugar, biotin, to the N- or C- terminus, a distinct amino acid, or amino acid type according to some ratio.
Cystein disulfide bonds, rendered automatically, can also be editted by hand.
Protease reactions can be applied to the protein to render the cleavage result.

The following metadata is attached to each domain:
- domain_pk: used as internal primary key.
- domain_name: full description of the domain. Name that is referred to in the mutation library.  
- domain_short_name: name used in BLAST and in the GUI.  
- species: human, mouse, rat, rabbit or empty / “-“ for e.g. linkers  
- humanness: human, humanizable if not human yet, non-human if not humanizable as e.g. linkers  
- chain_type: heavy, kappa, lambda, empty / “-“  
- domain_type: variable, hinge, constant, empty / “-“  
- domain_sequence: amino acid sequence  
- domain_cys_pattern: the pattern of Cys residues as ordinal numbers that pair within this domain, heavy chain domains might pair with light chains “LC” and light domains might pair with hinge “H”. Multiple bonds are separated by a comma.  
- domain_comment: an arbitrary comment for your convenience.  

The HAbE allows you to draw an Ab by hand, and it gets understood by the system and registered. It is possible to manipulate the Ab afterward.

HAbE features

- Custom monomers: Design a monomer for the HAbE and save it into a local monomer store.
- Full ADC support: Attach chemical molecules to a peptide at the N- or C-terminal end, on specific amino acids or on an amino acid type with a statistical binding ratio
- Biological editing: Crop Ab according to protease motifs

#### References

1. https://www.quattro-research.com/en/helm/
2. https://github.com/PistoiaHELM/HELMAntibodyEditor
3. https://pubs.acs.org/doi/10.1021/ci3001925
4. https://pistoiaalliance.atlassian.net/wiki/spaces/PUB/pages/13795371/HELM+Antibody+Editor+HAbE

### abYdraw

It is available as a downloaded application and the code is open source on GitHub.

> In future, porting abYdraw to JavaScript would allow the full graphical user interface to be used via a web page with no need to install software locally.

#### References