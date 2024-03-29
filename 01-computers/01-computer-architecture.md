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