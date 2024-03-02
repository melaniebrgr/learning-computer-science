# Journal: Weeks 8-9 project

## Guess the pinyin

A past ["Try Friday" from Coding Garden](https://www.youtube.com/watch?v=YF_pq7dSMh0) tried to learn Rust and build a simple CLI tool. It demonstrated that getting even a simple program running within a few hours in Rust is painful to the point of impossible. If you are coming from JavaScript, there are just too many fundamental concepts you need to learn first.

Full credit to CJ (Coding Garden) for persevering through all the set backs on _livestream_. He did a frankly fantastic job going between learning concepts and building stuff. It was also cathartic, frankly, to another more talented developer struggle with Rust and a programming problem. I also learned recently that CJ joined the Syntax team, which is a pretty cool move.

I watched the stream principally to see what I could take from it to code my own CLI tool, but I ended up coding something completely different, since my use case was completely different. My goal was to create a small program to help me learn Chinese. I have this simple children's book on my desk, "小王子" (The Little Prince), and by the end of 2024 I want to be able to read it. Let's go.

The goal of this weeks, is a Rust guessing game where given a chinese character prompt, you enter the  pinyin and are notified if it is correct or not. Maybe you can build a streak. Let's see.

### Real stupid questions from development list

1. How do I use a HashMap?
1. Why does the nth HashMap value change every time?
1. How can I even type pinyin?
1. Why did I need to trim the value before the HashMap lookup worked?

### Real answers

#### How do I use a hash map?

First, Rust has a standard library.
A hash map is one of type of collection available in the standard library (Std, pronounced "stud", aha).
To use it, import it `use std::collections::HashMap;` and call `HashMap::new()`.
This creates a hash map on the heap with a default initial capacity.
Hash maps must be homogeneous.
All keys are the same type, and all values are the same type.

"For types that implement the Copy trait, like i32, the values are copied into the hash map. For owned values like String, the values will be moved and the hash map will be the owner of those values."
I guess this is a pattern?
Copy-able things are coopied by default, and non-copy-able things are moved?
Each unique key can only have one value associated with it at a time.

Common things to do with a hash map

- `insert`inserts a key-value pair into hashmap, overwritting an existing key if there is one
- `entry` checks if the key exists first and `or_insert` adds it if it does not
- `get` gets an `Option<&V>` value out of the hash map.

#### Why does the nth HashMap value change every time?

"Iterating over a hash map happens in an arbitrary order", but it's not clear to me why.
Maybe it has something to do with how the data is allocated on the heap?
