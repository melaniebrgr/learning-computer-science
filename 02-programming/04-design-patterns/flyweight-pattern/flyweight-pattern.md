# Flyweight pattern

When generating and working with many, many objects, you often need to find ways to keep them more light weight, not always in size for memory reasons, but for data transfer reasons. Enter the flyweight pattern. Any data that is intrinsic to the object or "context free" can be shared by all instances. Anything extrinsic or unique is placed on each unique instance. You might be able to apply the flyweight pattern in obvious places, like repeating tree objects, but also in less obvious places you can dig a little and unearth surprising commonalities, like terrain.

The trick is in finding the common stuff to extract and making sure it is shared, not instanced.
