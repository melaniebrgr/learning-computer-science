# Antibodies

How does the body detect "foreign invaders"? Pathogens like viruses and bacteria are coated with proteins and polysaccharides that are specific to these microorganisms, like fingerprints. In the blood small proteins called **antibodies** (particles that "act against bodies") circulate that are tuned to detect these fingerprints or **antigens** (antibody generators).

## Naming

- Monoclonal antibodies (mAbs)
- Multispecific antibodies (MsAbs)

For small-molecule drugs, 'Simplified Molecular-Input Line-Entry System' (SMILES) have been adopted as a standard for
describing organic molecules (3).
The Hierarchical Editing Language for Macromolecules
(HELM)19 was introduced in 2012 as a general tool for describing biologics (including antibodies) and is promoted by the
Pistoia Alliance.

### AbML

AbML is based on describing antibody domains, arranged in a string and separated by connectors, representing antibody chains from N-terminus to C-terminus.
Each domain is separated by a ‘-’ character and is numbered sequentially in order of its appearance in the expression. In this respect, hinges and artificial linkers can be considered more like domains as they are numbered and are separated from neighboring domains with a ‘-’ character. Whitespace, including line breaks is ignored in AbML except for comments given in square brackets.
AbML V1.1 also allows sequence information to be associated with each domain using ASEQ and DSEQ keywords for amino acid and DNA sequences, respectively.
These are provided after the main AbML annotation.

> In future, porting abYdraw to JavaScript would allow the full graphical user interface to be used via a web page with no need to install software locally.

## Formats

### In humans

An antibody (immunoglobulin) is a Y-shaped protein made of four polypeptide chains: two identical heavy chains (~50 kDa each) and two identical light chains (~25 kDa each), held together by disulfide bonds. In the 1950s–60s proteolytic cleavage experiments were performed against antibodies that digested antibodies into fragments that have since been well described in the literature:

Papain digestion → 2 Fab fragments + 1 Fc fragment
Pepsin digestion → 1 F(ab')₂ fragment (two arms still connected) + degraded Fc

- **mAb (monoclonal antibody)**: A mAb is a monoclonal antibody, a population of identical antibodies that all come from one B‑cell clone and all recognize the same epitope on a single target antigen
- **Fab (fragment antigen-binding)**: When antibodies are cleaved by papain, you get two identical Fab fragments that contain one complete antigen-binding site. Fab fragments are the "arms" of an antibody that bind specifically to antigens (epitopes). Each arm contains one part of light chain and one part of a heavy chain (VH-CH1-CL-VL).
- **Fab'**: A Fab fragment that includes a portion of the hinge region. The F(ab')2 fragment can be split into two Fab' fragments by mild reduction.
- **F(ab')₂**: Two Fab regions joined by a hinge; can be monospecific or bispecific. When antibodies are cleaved by pepsin, the cleavage occurs beneath the hinge region producing two halves, one containing variable arms and the other the crystallizable constant region (**pFc'**).
- **Fc (fragment crystallizable)**: When antibodies are cleaved by papain, you get one relatively stable and uniform fragment that can be crystallized. This fragment doesn't bind antigen but interacts with immune cells and is also refered to as the tail.
- **Hinge region**: The	flexible tether connecting arms to stem that allows arms to move and bind antigens at varying distances.
- **VH (variable region of heavy chain)**
- **VL (variable region of light chain)**
- **CH (constant region of heavy chain)**
- **CL (constant region of light chain)**

### In camelids

Humans only produce "conventional" antibodies with heavy and light chains. Camelids produce both conventional antibodies (VH genes) and heavy chain only antibodies (VHH genes).

- **HcAb (heavy chain only antibodies)**: antibodies that are naturally produced by camelids and sharks
- **VHH or nanobody (variable domain of heavy-chain of heavy-chain only antibody)**: A VHH is the antigen binding fragment of a heavy chain only antibody. This fragment is also called a nanobody (trademark Sanofi). VHHs are sometimes prefered as a therapeutic biologics because they are relatively small, stable, soluble, and tolerate heat and pH extremes better. Because they are single domains, they are also easy to express in microbes, have good tissue penetration and ability to bind concave epitopes, and lend themselves well to constructions like bispecifics. VHHs are typically camelid-derived and then humanized (framework and surface residues engineered to look more human) to reduce immunogenicity (1).

### Common

**nanobody (VHH)**: A nanobody is the variable domain of heavy-chain-only antibodies (HCAbs) in camelids. These antibodies are devoid of light chains and bind their antigens exclusively via the variable domains of the heavy chain, also called VHHs. To compensate for the reduced repertoire of binding interfaces, VHHs utilize several mechanisms for diversification. For example, most VHHs have an elongated and structurally diverse complementarity-determining region 3 (CDR3), extensive somatic hypermutations in CDR1 and non-canonical disulfide bonds that stabilize elongated CDR3s.

**bivalent VHH**: A bivalent VHH is a single-chain construct where two identical VHH domains are linked so that one molecule binds two identical targets, e.g. caplacizumab. VHHs are naturally monovalent.

**bispecific VHH**: A bispecific VHH is a single-chain construct where two different VHH domains are linked so that one molecule binds two distinct targets. The format is usually a “tandem VHH”: `VHH1–linker–VHH2`, where the linker is a flexible Gly‑Ser chain.

**scFv (single-chain variable fragment)**: A scFv us small engineered antibody fragment that contains just the variable regions of the heavy and light chains joined together. The tandem VH and VL fragments are joined in a single polypeptide by a flexible linker or dislphide bond, e.g. `VH–linker–VL` or `VH-SS-VL`. Only the variable (Fv) regions of the antibody are included, the constant (C) regions are omitted--the Fv fragment is the smallest unit of immunoglobulin molecule with function in antigen-binding activities. Together, the Fv regions recreate a full antigen‑binding paratope site. The scFv has become an established technique used to produce a completely functional antigen-binding fragment in bacterial systems.

The length of the flexible DNA linker used to link both of the V domains is critical in yielding the correct folding of the polypeptide chain. Previously it has been estimated that the peptide linker must span 3.5 nm (35 Å) between the carboxy terminus of the variable domain and the amino terminus of the other domain without affecting the ability of the domains to fold and form an intact antigen-binding site (6). Nowadays, the most extensively used designs have sequences comprising stretches of Gly and Ser residues which meant for flexibility and or together with the charged residues such as Glu and Lys interspersed to enhance the solubility.

**dsFv**: An antibody fragment consisting of variable heavy (VH) and light (VL) chains linked together by a disulfide bond instead of a peptide bridge is no longer a single chain, and is therefore referred to as a dsFv.

**scFv-Fc**: scFv‑Fc fusions are recombinant antibodies where a scFv is fused to the Fc region of an IgG, giving a “mini‑IgG” conformation. The N‑terminus is an scFv (VH and VL joined by a flexible Gly‑Ser linker), and the C‑terminus is the Fc (hinge–CH2–CH3) from an IgG heavy chain. The halves can dimerize via the Fc just like an IgG. Functionally, the scFv provides antigen binding, while the Fc contributes stability, solubility, and extended half‑life.

**BiTE (bispecific T‑cell engager)**: A BiTE is a special bispecific antibody format constructed as a single polypeptide chain: One binding domain typically targets a specific antigen on a tumor cell, while the second domain targets a molecule on the T cell. Its primary biological function is to act as a molecular bridge, bringing a T cell into physical proximity with a target cell. Structurally, BiTEs are single-chain bispecific antibodies composed of two linked binding domains. The BiTE format links its functional components into a continuous sequence. While traditional BiTEs lack a tail region, newer iterations such as the Half-Life Extended (HLE) BiTE incorporate an Fc domain to improve therapeutic longevity. 

**Fab**: The Fab fragment represents the "arms" of a parental antibody, containing the essential machinery for antigen recognition and binding. It is produced through the enzymatic cleavage of antibodies by papain. the Fab format provides a modular, high-affinity binding unit consisting of both variable and constant domains from the light and heavy chains.

**scFab**: A single-chain Fab where elements are connected by a linker instead of a hinge.

**APCs (antibody-peptide conjugates)**: (_Not_ an antigen presenting cell.)

## Antibody library design

> George Smith’s invention of phage display in 1985, along with its application to antibody engineering by Greg Winter and colleagues, signaled the advent of a new era in antibody engineering, leading to the landmark regulatory approval of the first monoclonal antibody drug derived from a display library in 2002. (3)

In antibody therapeutic development researchers intentionally mimic the biological process of affinity maturation in the lab in order to optimize antibody candidates, driving their binding affinities into ranges required for clinical use.

The in vitro affinity maturation process generally involves two main steps: **mutagenesis** (creating a library of variants from the lead candidate) and **selection** (isolating the tightest binders).

Through iterative rounds of mutation and stringent selection, affinity maturation can yield massive functional improvements. While affinity increases of 10- to 100-fold are standard, specialized techniques can push this much further.

For instance, by combining error-prone PCR with in vivo homologous recombination in yeast, researchers have achieved up to a 100,000-fold affinity increase over just three rounds of selection. Some engineered formats, such as an anti-fluorescein scFv, have been affinity-matured to reach ultra-high femtomolar (fM) affinities with dissociation half-times extending beyond five days.

### Mutagenesis

To create a diverse library of antibody variants, engineers typically employ one of two mutagenesis strategies:

1. **Going Big**: widespread random or directed mutagenesis across the entire variable region or CDRs to cast a wide net. Techniques can include error-prone PCR or DNA shuffling.
2. **Staying Small**: a more targeted approach focusing on randomizing or directing mutations only at specific, known "hotspots" within the variable region or a specific CDR
3. **Chain Shuffling**: keeping one chain (e.g., the heavy chain) constant while shuffling the sequence of the other chain (e.g., the light chain) to discover a pairing with naturally higher affinity

#### Naive B cell

They are so called **“naive B‑cell” antibody libraries** because the antibody genes are taken from B cells that have not yet been activated or affinity‑matured by a specific immunization or infection, i.e., from the _naive_ repertoire. 

Naive B cells are mature B lymphocytes that have undergone V(D)J recombination but have not yet encountered their cognate antigen, so their receptors have not been affinity matured in germinal centers. Antibody libraries built from these cells therefore capture the broad, primary repertoire rather than an immune response to a particular pathogen or vaccine.

Naive libraries are typically constructed from IgM‑expressing B cells isolated from healthy, non‑immunized donors (often peripheral blood), so donors have “no known infection” at collection. The variable region (V) genes from these B cells are PCR‑amplified and cloned into display systems (e.g., phage, yeast), generating a large “single‑pot” or universal library that can, in principle, be panned against many different antigens.

### Selection

Once the mutated library is generated, the variants are expressed using display technologies—such as phage, yeast, ribosome, or mammalian display

While various display technologies are used, yeast surface display is particularly renowned as a premier tool for affinity maturation. This is because yeast cells are large enough to be analyzed using Fluorescence-Activated Cell Sorting (FACS), researchers can conduct highly quantitative screening.

With fluorescent tagged antigens, scientists can finely discriminate and sort yeast cells based directly on:

- Equilibrium binding: Sorting clones based directly on their dissociation constant (affinity) by adjusting the antigen concentration in the labeling reaction
- Kinetic competition: Sorting clones based on how slowly they let go of a target (dissociation rate or "off-rate") by saturating them with labeled antigen and then "chasing" them with an excess of unlabeled antigen

The library is then subjected to stringent biopanning conditions to weed out weak binders. This is achieved by decreasing the concentration of the target antigen, introducing competing soluble antigens, or utilizing extensive washing steps.

### Production

Since 1975, Kohler and Milstein have introduced the **hybridoma** technology which enabled a defined specificity of monoclonal antibodies to be produced in consistent quality as well as in large quantities in the laboratory. Since then, monoclonal antibodies (mAbs) have been favored as they can be produced in unlimited quantities to practically bind to any antigen and are more easily standardized


## References

1. (VHH antibodies: Emerging reagents for the analysis of environmental chemicals)[https://pmc.ncbi.nlm.nih.gov/articles/PMC4983233/]
2. https://notebooklm.google.com/notebook/190c839c-a65e-40ca-8b80-9785de8bef78
3. https://www.sciencedirect.com/science/article/abs/pii/S0003986112001002?via%3Dihub
4. https://pistoiaalliance.org/project/helm-project/
5. https://github.com/PistoiaHELM/HELMAntibodyEditor
6. https://pmc.ncbi.nlm.nih.gov/articles/PMC3312285/