# Service worker

## Week 16 project journaling

Data sent between web worked and project is sent by copy.
Numbers and strings are already copied, but objects like JSON are copied with the "structured cloning algorithm".
It works on data that can be copied.
Functions can be copied but can be eval'd.
Beware of the impact of copy on memory for large amounts of data.
Can be inefficent from memore and performance perspective.
Q. check the current status of web worker communication
