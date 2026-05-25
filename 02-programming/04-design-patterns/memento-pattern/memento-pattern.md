# Memento pattern

The pattern is about saving state, like game state, or databases state.
Just pushing snapshots to memory is a great way to create OOM errors.
Modern DBs today store regular snapshots asynchronously to the hard disk. Git stores changes as snapshots.

Maybe you want to create a snapshot everytime data hits some service.