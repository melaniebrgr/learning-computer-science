# Format Requirements

From "smallest" to "largest", in theory.

- ~~nanobody~~
- ~~scFV~~
- ~~BiTE~~
- Fab
- (Fab')₂
- IgG

## Nanobody

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

## scFv

In scFv antibodies the genes of VH and VL are joined together with a ~10 aa peptide linker

**Brolucizumab (Beovu)** is a scFv (VL-linker-VH) approved for neovascular (wet) age-related macular degeneration treatment.  
It is administered via an injection directly into the eye to reduce abnormal blood vessel growth and excess fluid.  
It is a small (approx. 26 kDa), humanized single-chain variable fragment (scFv) antibody fragment targeting VEGF-A.

- `VL-linker-VH`
- `VH-linker-VL`

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


## BiTE

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

## Fab

The Fab fragment is the "arms" of a parental antibody. Each Fab fragment is composed of four primary domains:
- Heavy Chain Portion: one variable domain (VH) and one constant domain (CH1)
- Light Chain Portion: one variable domain (VL) and one constant domain (CL)

Ranibizumab (Lucentis), certolizumab pegol (Cimzia), and abciximab (ReoPro) are all approved therapeutics utilizing the Fab format.

## References

1. [envafolimab](https://www.kegg.jp/entry/D13233)
1. [beovu kegg](https://www.kegg.jp/entry/D11083)
1. [blincyto kegg](https://www.kegg.jp/entry/D09325)
