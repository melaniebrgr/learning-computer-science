# Flyweight pattern (or "Lightweight" says Irina)

When generating and working with many, many objects, you often need to find ways to keep them more light weight, not just for memory reasons, but also or even mainly for data transfer reasons. Enter the flyweight pattern. Any data that is intrinsic to the object or "context free" is shared by all instances. Anything extrinsic or unique is placed on each unique instance. You might be able to apply the flyweight pattern in obvious places, like repeating tree objects, but also in less obvious places you can dig a little and unearth surprising commonalities, like terrain.

The trick is in finding the common stuff to extract and making sure it is shared, not instanced.

Useful applications: 
- a partical system went from taking 21 GB to 32 MB RAM usage.
- in 3d graphics duplicate objects just need to be tracked with different x-y coordinates.
