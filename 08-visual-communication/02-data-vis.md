# InfoVis

## LECTURE 2

> ℹ️ Project 1: suggest working a redesign. We will create a visualization from existing data and write about what we've done in this redesign visualization. Redesign the info so it is readily understood, eliminate unnecessary complexity. Suggested topics will be posted to blackboard.

### Kinds of Data

The type of data is important because encoding techniques apply better so some data types more than others e.g. colour is better for nominal data. **When presented with a visualization problem, ask what is the type of data, how many dimensions does it have? Is it a narrative or can it be?**

- Nominal: name, type, category, e.g. types of mammals, republican vs. democrat
- Ordinal: integer sequences (whole integers only), e.g. first, second, third
- Interval: gap in values, e.g. every three months
- Ratio: real numbers with zero as a reference, is a huge catch all for every other kind of data, eg. 47 out of 100

### Kinds of information

- Spatial: e.g. maps and scalar fields
- Narrative (of space or time): e.g. assembly sequence, process. Other times you might what to force a narrative and create a cause and effect relationship, e.g. look at the relationship between gun control and crime rate. Creating narratives are important since we are a story telling species. We often come up with a plausible chain of events. Dreams are thought be manifestations of our tendency of creating stories out of random stimuli.

### Data dimensions

- Scalar: simple magnitude or quantity eg. luminance only
- Vector: magnitude and direction, eg. length and arrow direction can encode
- Tensor: vector + other attributes, eg. Length, direction and colour.

### Vision

JJ Gibson postulated that perception was evolved very specifically to allow us to navigate through the world, and therefore vision can be understood on those terms. We don't remember how to deal with the world, we are being told by the world how to use it. We don't need to remember those things because we can always reference the planet. This concept of affordances has had a huge impact on design. The object should embody the knowledge necessary to use it, e.g. the flat door knob affords pushing. Think about **afforandances as the design of an object that tells people how they are meant to be used and discourages inappropriate usages**.

The point at which the sheath of light days collect is call the station point, e.g. this is the pupil. There is a ambient optic array is the cone of light that is collecting into a sheath. When we design, we are creating an ambient optic array. From there LGN optic fibres fan out and somatotropically map onto the primary visual cortex, and then are submitted for preliminary parallel visual processing. The dorsal pathway receives spatial information and is known as the where pathway. The ventral pathway is the what pathway, e.g. people you recognize.

In the eye the fovea corresponds to a small area of detailed vision. Accomodation comprises, convergence, iris muscle action, and ciliary muscle lens action allow us to focus on thing at different distances. Note that because of light optics, blue cannot be focused when red is present, and because we will preferentially focus on red, blue will appear fuzzy when in the same image as red. There are 100 million rods in each eye, and suited to low light, single wavelength vision. There are 6 million cones and have three wavelength sensitivity, providing colour vision. Blue is also perceptually disadvantaged in terms of sensitivity. Our colour vision is most sensitive to red, the green and finally blue.

Your thumbnail encompasses about 1 degree of visual angle and out fovea can receive about 2 degrees. Since our foveal vision is so small, we see large areas by moving our eyes around a lot. These eye movements are called saccaddes. Each movement is about 80 msec long and vision is suppressed during this rapid movement. Peripheral vision is useless for anything but detection of movement. Brightness contrast is essential for perceiving object shapes.

Our perceptual system is good at parcelling things into local contexts and seeing local differences (local judgements and comparisons), but is lousy at objective empirical differences e.g. projector screen appears white when projector is off and black when turned on. This can start to be a problem in an infovis context, because if you use a tone to encode a specific value, if the local context changes it may read as a different value. Known as simultaneous contrast effects. Gradations can create weird effects when combined. Receptive fields function to enhance edges, or see an enhanced contrast at the edges. Receptive fields are the the hexagonal regions of the retina that report to a single ganglion.

Qualities are easy to read from grayscale map, but not quantities, e.g. grayscale ozone map will not allow for objective determination of what value it corresponds to (without opening it is photoshop). Rainbow spectra as consequently used instead, but they have their own issues. Coming with correct colour mapping can be a difficult but important job. Used colours that afford the correct interpretation.
