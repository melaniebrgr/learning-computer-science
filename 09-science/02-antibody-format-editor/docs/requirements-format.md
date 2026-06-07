# Format Requirements

## Formats research

From "smallest" to "largest", in theory:

- ~~nanobody~~: `VHH-Fc`
- ~~scFV~~: `VL-linker-VH`
- ~~BiTE~~: `Xaa-(VL-linker-VH)-linker-(VH-linker-VL)-Xaa`
- ~~Fab~~: `VL-CL`,`VH-CH1` (1 x SS)
- ~~(Fab')₂~~: `VL-CL`,`VH-CH1-hinge`,`hinge-CH1-VH`,`CL-VL` (4 x SS)
- ~~IgG~~: `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS)
- ~~ADC~~: `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS, ~3.5 x D)

### Nanobody

A nanobody is the variable domain of heavy-chain-only antibodies (HCAbs) in camelids.

**Envafolimab** is a independently developed subcutaneous PD-L1 single-domain antibody Fc fusion protein (VHH-Fc). It was approved for marketing in China in November 2021, for the treatment of unresectable or metastatic microsatellite instability-high (MSI-H) or mismatch repair-deficient (dMMR) solid tumors.

- `VHH-Fc`

```
QVQLVESGGG LVQPGGSLRL SCAASGKMSS RRCMAWFRQA PGKERERVAK LLTTSGSTYL
ADSVKGRFTI SRDNSKNTVY LQMNSLRAED TAVYYCAADS FEDPTCTLVT SSGAFQYWGQ
GTLVTVSSEP KSSDKTHTCP PCPAPELLGG PSVFLFPPKP KDTLMISRTP EVTCVVVAVS
HEDPEVKFNW YVDGVEVHNA KTKPREEQYN STYRVVSVLT VLHQDWLNGK EYKCKVSNKA
LPAGIEKTIS KAKGQPREPQ VYTLPPSRDE LTKNQVSLTC LVKGFYPSDI AVEWESNGQP
ENNYKTTPPV LDSDGSFFLY SKLTVDKSRW QQGNVFSCSV MHEALHNHYT QKSLSLSPGK
```

| Domain  | Position | Length | Sequence |
| ---------------------- | -------- | ------ | ---------- |
| VHH     | 1–120    | 120    | QVQLVESGGGLVQPGGSLRLSCAASGKMSSRRCMAWFRQAPGKERERVAKLLTTSGSTYLADSVKGRFTISRDNSKNTVYLQMNSLRAEDTAVYYCAADSFEDPTCTLVTSSGAFQYWGQGTLVTVS |
| Fc-like | 121–350  | 230    | SEPKSSDKTHTCPCPAPELLGGPSVFLFPPKPKDTLMISRTP EVTCVVVAVSHEDPEVKFNWYVDGVEVHN AKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAGIEKTISKAKGQPREPQVYTLPPSRDELTKNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPGK |

### scFv

In scFv antibodies the genes of VH and VL are joined together with a ~10 aa peptide linker

**Brolucizumab (Beovu)** is a scFv (VL-linker-VH) approved for neovascular (wet) age-related macular degeneration treatment.  
It is administered via an injection directly into the eye to reduce abnormal blood vessel growth and excess fluid.  
It is a small (approx. 26 kDa), humanized single-chain variable fragment (scFv) antibody fragment targeting VEGF-A.

- `VL-linker-VH` or `VH-linker-VL`

```
MEIVMTQSPS TLSASVGDRV IITCQASEII HSWLAWYQQK PGKAPKLLIY LASTLASGVP
SRFSGSGSGA EFTLTISSLQ PDDFATYYCQ NVYLASTNGA NFGQGTKLTV LGGGGGSGGG
GSGGGGSGGG GSEVQLVESG GGLVQPGGSL RLSCTASGFS LTDYYYMTWV RQAPGKGLEW
VGFIDPDDDP YYATWAKGRF TISRDNSKNT LYLQMNSLRA EDTAVYYCAG GDHNSGWGLD
IWGQGTLVTV SS
```


| Domain | Position | Length | Sequence |
| ------ | -------- | ------ | -------- |
| VL     | 1–107    | 107 | MEIVMTQSPSTLSASVGDRVIITCQASEIIHSWLAWYQQKPGKAPKLLIYLASTLASGVPSRFSGSGSGAEFTLTISSLQDDFATYYCQNVYLASTNGANFGQGTKLTVL           |
| Linker | 108–128  | 21 | GGGGSGGGGSGGGGSGGGGS                                                                                                     |
| VH     | 129–222  | 94 | EVQLVESGGGLVQPGGSLRLSCTASGFSLTDYYYMTWVRQAPGKGLEWVGFIDPDDDPYYATWAKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCAGGDHNSGWGLDIWGQGTLVTVSS |

### BiTE

The BiTE format is a tandem arrangement of single-chain Fragment Variable (scFv) units connected by a flexible peptide linker, without an Fc region.

**Blinatumomab (Blincyto)** is a bispecific T-cell engager (BiTE). It is constructed by linking an anti-CD19 scFv to an anti-CD3 scFv. The anti-CD19 scFv is in a VL-VH orientation connected via a short G4S linker to an anti-CD3 scFv in a VH-VL orientation. It has been approved for the medical treatment of Philadelphia chromosome-negative relapsed or refractory B-cell precursor acute lymphoblastic leukemia.

- `Xaa-(VL-linker-VH)-linker-(VH-linker-VL)-Xaa`

```
MALPVTALLL PLALLLHAAR PDIQLTQSPA SLAVSLGQRA TISCKASQSV DYDGDSYLNW
YQQIPGQPPK LLIYDASNLV SGIPPRFSGS GSGTDFTLNI HPVEKVDAAT YHCQQSTEDP
WTFGGGTKLE IKGGGGSGGG GSGGGGSGGG GSGQVQLQQS GAELVRPGSS VKISCKASGY
AFSSYWMNWV KQRPGQGLEW IGQIWPGDGD TNYNGKFKGA TLTADESSST AYMQLSSLAS
EDSAVYFCAR RETTTVGRYY YAMDYWGQGT TVTVSSGGGG SGGGGSGGGG SGGGSDIKLQ
QSGAELARPG ASVKMSCKTS GYTFTRYTMH WVKQRPGQGL EWIGYINPSR GYTNYNQKFK
DKATLTTDKS SSTAYMQLSS LTSEDSAVYY CARYYDDHYC LDYWGQGTTTLTVSSVEGGSG
GSGGSGGSGG VDDIQLTQSP AIMSASPGEK VTMTCRASSS VSYMNWYQQK SGTSPKRWIY
DTSKVASGVP YRFSGSGSGT SYSLTISSME AEDAATYYCQ QWSSNPLTFG AGTKLELKHH
HHHH
```

| Domain | Position | Length | Sequence |
| ------ | -------- | ------ | -------- |
| Signal peptide        | 1–19     | 19     | MALPVTALLLPLALLLHAARP |
| Anti-CD19 VH          | 20–127   | 108    | DIQLTQSPASLAVSLGQRATISCKASQSVDYDGDSYLNWYQQIPGQPPKLLIYDASNLVSGIPPRFSGSGSGTDFTLNIHPVEKVDAATYHCQQSTEDPWTFGGGTKLEIK |
| Linker 1              | 128–132  | 5      | GGGG |
| Anti-CD19 VL          | 133–237  | 105    | SGGGGSGGGGSGGGGSQVQLQQSGAELVRPGSSVKISCKASGYAFSSYWMNWVKQRPGQGLEWIGQIWPGDGDTNYNGKFKGKATLTADESSSTAYMQLSSLASEDSAVYFCARRETTTVGRYYYAMDYWGQGTTVTVSS |
| Linker 2 (inter-scFv) | 238–257  | 20     | GGGGSGGGGSGGGGSGGGGS |
| Anti-CD3 VH           | 258–363  | 106    | DIQLTQSPAIMSASPGEKVTMTCRASSSVSYMNWYQQKSGTSPKRWIYDTSKVASGVPYRFSGSGSGTSYSLTISSMEAEDAATYYCQQWSSNPLTFGAGTKLELK |
| Linker 3              | 364–368  | 5      | GGGG |
| Anti-CD3 VL           | 369–473  | 105    | SGGSGGSGGSGGVDDIQLTQSPAIMSASPGEKVTMTCRASSSVSYMNWYQQKSGTSPKRWIYDTSKVASGVPYRFSGSGSGTSYSLTISSMEAEDAATYYCQQWSSNPLTFGAGTKLELK |
| His-tag               | 499–504  | 6      | HHHHHH |

### Fab

The Fab fragment is an "arm" of a parental antibody. Each Fab fragment is composed of four primary domains:
- Heavy Chain Portion: one variable domain (VH) and one constant domain (CH1)
- Light Chain Portion: one variable domain (VL) and one constant domain (CL)

Bevacizumab is a humanized anti-VEGF monoclonal antibody. It's primary Fab connection is a disulphide bond between CH1 Cys220 and CL Cys215.

- `VH-CH1`, `VL-CL` (SS, CH1:C220-CL:215)

```
EVQLVESGGG LVQPGGSLRL SCAASGYTFT NYGMNWVRQA PGKGLEWVGW INTYTGEPTY
AADFKRRFTF SLDTSKSTAY LQMNSLRAED TAVYYCAKYP HYYGSSHWYF DVWGQGTLVT
VSSASTKGPS VFPLAPSSKS TSGGTAALGC LVKDYFPEPV TVSWNSGALT SGVHTFPAVL
QSSGLYSLSS VVTVPSSSLG TQTYICNVNH KPSNTKVDKK VEPKSCDKTH T

DIQMTQSPSS LSASVGDRVT ITCSASQDIS NYLNWYQQKP GKAPKVLIYF TSSLHSGVPS
RFSGSGSGTD FTLTISSLQP EDFATYYCQQ YSTVPWTFGQ GTKVEIKRTV AAPSVFIFPP
SDEQLKSGTA SVVCLLNNFY PREAKVQWKV DNALQSGNSQ ESVTEQDSKD STYSLSSTLT
LSKADYEKHK VYACEVTHQG LSSPVTKSFN RGEC
```

| Domain                        | Position | Length | Sequence | Notes                         |
| ----------------------------- | -------- | ------ | -------- | ----------------------------- |
| VH    | 1–118    | 118    | EVQLVESGGGLVQPGGSLRLSCAASGFTFSNYTMNWVRQAPGKGLEWVAAIATPGGDTTYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCARGAFDI      |  |
| CH1   | 119–220  | 102    | ASTKGPSVFPLAPCSRSTSGSTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVT VPPSLSQMSTQVDETNYFYT C                | Contains Cys220 for disulfide |
| VL    | 1–107    | 107    | DIQMTQSPSSLSASVGDRVTITCRASQDINSYLMHWYQQKPGKAPKLLIYAASLQSGVPSRFSGSGSGTDFTLTISSLQPFEDFATYYCQQSYNVPWTFGQGTKVEIK |  |
| CL    | 108–215  | 108    | RTVAAPSVFIFPPSDEQLKSGTASVCLLNNYFKPAKPKVTLTIMDTSSDTQVPTGVSVKLYLSLRGDLTIDVSQDPRQDYQVVLT C                      | Contains Cys215 for disulphide   |

### (Fab')₂

AKA two Fab' fragments from IgG1 digestion with disulphide bonds retained, so see IgG1 for representative sequence information.

| Domain                 | Position | Length                                        | Sequence Reference                | Notes                              |
| ---------------------- | -------- | --------------------------------------------- | --------------------------------- | ---------------------------------- |
| Fab' Fragment #1       |          |                                               |                                   |                                    |
| VH (Variable Heavy)    | 1–118    | 118                                           | EVQLVESGGGLVQPGGSLRLSCAASGFTFSNYTMNWVRQAPGKGLEWVAAIATPGGDTTYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCARGAFDI      | First Fab'                         |
| CH1 (Constant Heavy 1) | 119–220  | 102                                           | ASTKGPSVFPLAPCSRSTSGSTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVT VPPSLSQMSTQVDETNYFYT C                | Cys220 for inter-chain             |
| VL (Variable Light)    | 1–107    | 107                                           | DIQMTQSPSSLSASVGDRVTITCRASQDINSYLMHWYQQKPGKAPKLLIYAASLQSGVPSRFSGSGSGTDFTLTISSLQPFEDFATYYCQQSYNVPWTFGQGTKVEIK | First Fab'                         |
| CL (Constant Light)    | 108–215  | 108                                           | RTVAAPSVFIFPPSDEQLKSGTASVCLLNNYFKPAKPKVTLTIMDTSSDTQVPTGVSVKLYLSLRGDLTIDVSQDPRQDYQVVLT C                      | Cys215 for inter-chain             |
| Hinge Region           | 221–234  | 14                                            | EPKSCDKTHTCPPCP                     | Contains 2 Cys for Fab'-Fab' links |

### IgG1

Basic description:

- The heavy chains have VH, CH1, CH2, and CH3 domains, and the light chains have VL and CL domains
- The heavy and light chains are connected by a single Cys-Cys disulphide bride at Cys220
- The heavy chains are connected by two Cys-Cys disulfide bridges at Cys226 and Cys229
- The hinge region between the Fab and Fc fragments is composed of 23 residues (EPKSCDKTHTCPPCPAPELLGGP) between Val215 and Ser239

Trastuzumab (Herceptin), is an IgG1κ antibody targeting HER2. Trastuzumab uses the human IgG1 constant regions (κ light chain, G1m17 allotype) with its specific variable domains.

| Domain                 | Chain        | Residues          | Sequence                                                      |
| ---------------------- | ------------ | ----------------- | ------------------------------------------------------------- |
| VL (Variable Light)    | Light (κ)    | 1–107 (clone 4D5) | QSVLTQPPSASGTPGQRVTISCSGSSSNIGAGVNWYQQLPGTAPKLLIYDTSKLASGVPSRFSGSGSGTDFTLTISSLQPEDFATYYCQQWNSYPFTFGGGTKLTVL |
| CL (Constant Light)    | Light (κ)    | 108–214           | GTKVEIKRTVAAPSVFIFPPSDEQLKSGTASVVCLLNNFYPREAKVQWKVDNALQSGNSQESVTEQDSKDSTYSLSSTLTLSKADYEKHKVYACEVTHQGLSSPVTKSFNRGEC  |
| VH (Variable Heavy)    | Heavy        | 1–117 (clone 4D5) | EVQLVESGGGLVQPGGSLRLSCAASGFNIKDTYIHWVRQAPGKGLEWVARIYPTNGYTRYADSVKGRFTISADTSKNTAYLQMNSLRAEDTAVYYCSRWGGDGFYAMDYWGQGTLVTVSS  |
| CH1 (Constant Heavy 1) | Heavy (IgG1) | 118–222           | ASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKRVEPKSC |
| Hinge                  | Heavy (IgG1) | 223–245           | EPKSCDKTHTCPPCPAPELLGGP   |
| CH2 (Constant Heavy 2) | Heavy (IgG1) | 246–347           | ASTKGPSVFPLAPSSKSTSGGTAALGCLVKDYFPEPVTVSWNSGALTSGVHTFPAVLQSSGLYSLSSVVTVPSSSLGTQTYICNVNHKPSNTKVDKKVEPKSCDKTHTCPPCPAPELLGGPSVFLFPPKPKDTLMISRTPEVTCVVVDVSHEDPEVKFNWYVDGVEVHNAKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAPIEKTISKAK |
| CH3 (Constant Heavy 3) | Heavy (IgG1) | 348–447           | QRPREPKVEYDKTHTCPPCPAPELLGGPSVFLFPPKPKDTLMISRTPEVTCVVVDVSHEDPEVKFNWYVDGVEVHNAKTKPREEQYNSTYRVVSVLTVLHQDWLNGKEYKCKVSNKALPAPIEKTISKAKGQPREPQVYTLPPSREEMTKNQVSLTCLVKGFYPSDIAVEWESNGQPENNYKTTPPVLDSDGSFFLYSKLTVDKSRWQQGNVFSCSVMHEALHNHYTQKSLSLSPGK |

| Bond Type  | Cysteine Residues (EU numbering) | Location                       | Function                                                         |
| ---------- | -------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| H–H bond 1 | Cys²²⁶–Cys²²⁶                    | Middle hinge                   | Connects the two heavy chains pmc.ncbi.nlm.nih                   |
| H–H bond 2 | Cys²²⁹–Cys²²⁹                    | Middle hinge                   | Connects the two heavy chains pmc.ncbi.nlm.nih                   |
| H–L bond 1 | Cys²²⁰ (HC) – Cys²¹⁴ (LC)        | Upper hinge / CH1-CL interface | Connects heavy chain to light chain (Fab arm 1) pmc.ncbi.nlm.nih |
| H–L bond 2 | Cys²²⁰ (HC) – Cys²¹⁴ (LC)        | Upper hinge / CH1-CL interface | Connects heavy chain to light chain (Fab arm 2) pmc.ncbi.nlm.nih |

### ADC

Trastuzumab emtansine (T-DM1, brand name Kadcyla®) is one of the most well-characterized and successful antibody-drug conjugates approved by the FDA in 2013 for HER2-positive breast cancer.

A synthetic, non-cleavable chemical linker (SMCC/MCC) is used as the bridge. The linker's succinimidyl end attaches to the lysine amino acids of the antibody, while its maleimide end fastens onto the DM1 payload (called the warhammer?). On average, the chemical process attaches exactly 3.5 molecules of DM1 to each individual trastuzumab antibody before it is purified into the final medicine.

### Ig disulfide bonds

Formation of the interchain disulfide bond is not an autonomous feature of the subunits, but is influenced by the cellular environment. Formation of disulfide bonds in Ig structure occurs in the lumen of the endoplasmic reticulum (ER), and as with other secreted proteins, disulfide bonds are considered to be formed by an obligatory pathway that involves a large array of ER thiol oxidoreductases.

Two types of interchain disulfide bonds stabilize the tetrameric structure of functional Igs; one that links two HC to each other and another that bridges each HC to LC (5).

[The] hydrophobic interaction between CL and CH1, the constant domains of LC and HC, respectively, which is eventually stabilized by a covalent interchain disulfide between these two constant domains. The CH1-CL interchain disulfide forms between Cys214 of λ CL (or Cys215 of κ CL) and the most N-terminal among three cysteines in CH1 (5).

### Ig assembly

The usual assembly pathway of IgG2b in Ig producing cells is HC-LC → HC2LC → HC2LC2 (Scharff et al. 1970). An alternative IgG2b assembly pathway, which predominates in COS-7 cells, is HC → HC2 → HC2LC → HC2LC2 (Elkabetz et al. 2005). This pathway is also followed during assembly of other Ig isotypes (Scharff et al. 1970).

### Formats references

1. [envafolimab](https://www.kegg.jp/entry/D13233)
2. [beovu kegg](https://www.kegg.jp/entry/D11083)
3. [blincyto kegg](https://www.kegg.jp/entry/D09325)
4. [IgG1](https://pmc.ncbi.nlm.nih.gov/articles/PMC4375494/)
5. [S-S](https://pmc.ncbi.nlm.nih.gov/articles/PMC3443589/)

## Format test cases

- `VHH-Fc`
- `VL-linker-VH`
- `Xaa-(VL-linker-VH)-linker-(VH-linker-VL)-Xaa`
- `VL-CL`,`VH-CH1` (1 x SS)
- `VL-CL`,`VH-CH1-hinge`,`hinge-CH1-VH`,`CL-VL` (4 x SS)
- `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS)
- `VL-CL`,`VH-CH1-hinge-CH2-CH3`,`CH3-CH2-hinge-CH1-VH`,`CL-VL` (4 x SS, ~3.5 x X-drug)

Components: chains, domains, linkers, amino acid bridges (S-S, X-drug)