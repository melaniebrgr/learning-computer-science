# Computer Architecture

> Network, storage, memore and compute: the four primary colours of computer science - guy from Tiger Beetle

Architecture is traditional understood as ...

> "the attributes of a system as seen by the programmer, i.e. the conceptual structure and functional behavior." - Gene Amdahl

The conceptual structure is distinct from the physical implementation, controls, and logic design.

How are hardware components designed? How are they chosen? How are the interfaces between hardware components designed? How are these choices influenced by functional, performance, energy, longevity, and cost goals? These are the concerns of computer architecture.

What is a computer? There are three core components: computation, data that gets computed (storage or memory), and communication between them. Memory can be divided into a memory system "working memory" that will contain the data needed by running programs, and a more persistent storage system.

In a simple multi-core computer system, sharing of resources can lead to unfairness. One application may be prioritised over another by the dynamic random access memory (DRAM) controller causing another application to be resource starved. The unfair policy might slow down some applications much more significantly than others.

Moore's law is not a physical law but an observation that the number of components that can be put on a chip (transisters) approximately doubles every other year.
In recent years, the rate of transistor density growth has slowed down though, and there is debate about whether Moore's law will still hold into the future.

## bits, nybbles, and bytes

A bit is the smallest unit of digital data and can only be 0 or 1. A byte groups 8 of these bits together, for example something like 01010110 in binary. A nybble is half a byte, or 4 bits:

|                                          byte | ← 1 byte
|                nybble |                nybble | ← 2 nybbles
| bit | bit | bit | bit | bit | bit | bit | bit | ← 8 bits
| 128 |  64 |  32 |  16 |   8 |   4 |   2 |   1 | ← positional value
|   1 |   1 |   0 |   1 |   0 |   0 |   1 |   1 | ← binary

Historically and in many systems today, a byte is the smallest chunk of memory the hardware addresses directly. One byte is enough to represent a single text character in encodings like ASCII, which is why bytes are so tightly associated with letters, digits and basic symbols.

Larger storage sizes are built from bytes: for example, 1 kilobyte (KB) is 1024 bytes, 1 megabyte (MB) is 1024 kilobytes, and so on up through gigabytes and terabytes. File sizes, RAM capacity and disk sizes are usually measured in these byte-based units

- 1 byte = 8 bits
- 1 KB = 1024 bytes
- 1 MB = 1024 KB = 1024 * 1024 bytes = 1.048.576 bytes

The reason 1 kilobyte (KB) is often said to be 1024 bytes instead of 1000 bytes comes from how computers work with binary numbers. Computers use binary addressing, where memory addresses are expressed in powers of 2. Since 2^10 = 1024 is very close to 1000, it became convenient historically to use 1024 bytes as one kilobyte in computing contexts.

However, this is a source of confusion because in the International System of Units (SI), the prefix "kilo" always means 1000. To address this, a separate term, "kibibyte" (KiB), was introduced in 1998 to denote 1024 bytes explicitly, while kilobyte should mean 1000 bytes.

- 1024 bytes = 1 kibibyte (KiB), fitting binary-based computing
- 1000 bytes = 1 kilobyte (KB), the SI decimal standard