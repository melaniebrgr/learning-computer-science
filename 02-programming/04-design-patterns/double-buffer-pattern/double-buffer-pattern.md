# Double buffer pattern

A way to prepare the scene in the background while the audience sees the screen in the foreground, then swap the scenes when it's ready. Now the background scene is torn down and replaced by the next scene. This solves glitches that could have happened if the scene was being prepared at the same as it was viewed--a.k.a if the data was read at the same time as it's written. In graphics this manifests as "screen tearing".
