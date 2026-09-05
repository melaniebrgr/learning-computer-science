# Multiple Sequence Alignment

## MSA scoring

"How do we know how good our alignment it?" 
For multiple alignments the process is similar to a pairwise alignment but there's just more alignments to think about.
Each residue pair in a column is compared once.
The number of comparisons needed for N sequences is `(N^2 - n)/2`; so if we have 3 sequences, `(9-3)/2 = 3` pairs per column.

The score of a MSA is given by calculating how different the mutations in a column are.
The differences are given by the BLOSUM62 matrix, which provides a gain or loss from subsituting one mutation with another, e.g. G to T = -2.
The mutation score for each column is summed, then an overall score for the total alignment is given by the sum of every column.

![MSA scoring](./_resources/msa-score.png)

## MSA approaches

1. Dynamic alignment
2. Progressive alignment
3. Iterative alignment
4. Block-based alignment

### 1. Dynamic programming

An exhaustive method: every single residue in a sequence is considered with every other residue in a sequence.
Then for N sequences, the complexity is given by O(L^N), and the time to compute grows very quickly for non-trivial N.

A way to make it tractable is to divide and conquer, that is cut the sequences into halves, however many times as needed, compute then reassemble: O((N^2)/2).
One limitation is that alignment issues, like a motif on the first half that should really be aligned with a motif on the second half, will never be corrected.

Needleman–Wunsch is the classic dynamic‑programming algorithm for global alignment. Semi‑global alignment is a variant that does not penalize gaps at the ends (Semi‑global is “global inside, local at the ends”).

### 2. Progression alignment
### 3. Iterative alignment
### 4. Block-based alignment

---

Multiple Alignment using Fast Fourier Transform (MAFFT).
"MAFFT: a novel method for rapid multiple sequence alignment based on fast Fourier transform," was published in 2002 in Nucleic Acids Research by Kazutaka Katoh. He's maintained and extended the tool ever since.

## References

- [Multiple sequence alignments 2021](https://www.youtube.com/watch?v=0WPbw90NAsE)