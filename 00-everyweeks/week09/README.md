# Guess the pinyin

## Week 8-9s project journaling

On a past ["Try Friday"](https://www.youtube.com/watch?v=YF_pq7dSMh0) CJ (Coding Garden) tried to learn Rust and build a simple CLI tool. It demonstrated that getting even a simple program running within a few hours in Rust is painful almost to the point of impossible. If you are coming from JavaScript, there are too many fundamental concepts to learn first.

Props to CJ for persevering on _livestream_. I thought it was interesting how he juggled building with learning. When backed into inscrutable error messages, it "would tell him to spend a moment learning". He then headed to the docs and learned just enough to jump back to coding. Seeing a more talented developer struggle with Rust was also... encouraging. It's not just me who finds it a heavy lift. (Also pretty cool to see that CJ joined the Syntax team recently!)

I watched the stream principally to see what I could take from it to code my own CLI tool, but I ended up doing something completely different. My goal was quite different. I wanted to create a small program to help me learn Chinese. I have this simple children's book on my desk, "小王子" (The Little Prince), and by the end of 2024 I'd really like to be able to read it without a Google Translate tool. Let's go.

The goal of weeks 8, then 9, was a Rust guessing game where given a chinese character prompt, you enter the pinyin and are notified if it is correct or not. Maybe you can tracking a streak. Let's see. I started by breaking the task into a [discrete list of steps](TODO.md). I tracked questions I had along the way like CJ was doing, and made sure to circle back and answer them.

### Stupid questions

1. ✅ How do I use a HashMap?
1. ✅ Why does the nth HashMap value change every time?
1. ✅ How can I even type pinyin?
1. ✅ Why did I need to trim the value before the HashMap lookup worked?
1. ❓ Can I like, share my compiled program with someone else via WhatsApp?

#### 1. How do I use a hash map?

First, Rust has a standard library. A hash map is just one of types available in the standard library (Std, pronounced "stud", aha). To use a hash map, import it with `use std::collections::HashMap;` and call the constructor, `HashMap::new()`. This creates a hash map on the heap with a default initial capacity. Hash maps are growable and shrinkable.

Hash maps must be homogeneous. Each unique key can only have one value associated with it at a time. All keys must be the same type, and all values must be the same type. What kinds of keys can be used? "Any type that implements the Eq and Hash traits", like `bool`, `int`, `uint`, `String`, `str`. "For types that implement the Copy trait, like i32, the values are _copied_ into the hash map. For owned values like String, the values will be moved and the hash map will be the owner of those values." I guess this is a trend in Rust? Copy-able things are copied by default, and non-copy-able things are moved?

Common things you can do with a hash map

- `insert`inserts a key-value pair into hashmap, overwritting an existing key if there is one
- `entry` checks if the key exists first and `or_insert` adds it if it does not
- `get` gets an `Option<&V>` value out of the hash map.

#### 2. Why does the nth HashMap value change every time?

"Iterating over a hash map happens in an arbitrary order", but it's not clear to me why. Maybe it has something to do with how the data is allocated on the heap?

"In Rust, a HashMap does not guarantee any specific order of its elements. When you iterate over the elements, the order in which they are returned is arbitrary and can change over time, especially when elements are added or removed. This is because HashMap is implemented as a hash table, and the order of elements depends on the hashing algorithm, the initial bucket size, and the sequence of insertions and deletions." - GitHub Copilot Chat

#### 3. How can I even type pinyin?

[Setting up a Mac](https://yoyochinese.com/blog/how-to-type-pinyin-mandarin-chinese-tone-marks-windows-mac-os):

- Keyboard > Text Input > Edit...
- Add "Pinyin - Simplified" and "ABC - Extended".
- Toggle on "Pinyin - Simplified" to get the hanzi from typing in pinyin, like 好!
- Toggle on "ABC - Extended" to type the accented pinyin characters.

Using the tones on a Mac:

- 1st tone (¯): option + a
- 2nd tone (´): option + e
- 3rd tone (ˇ): option + v
- 4th tone (`): option + ~

So, `⌥ + v + a = ǎ`. It's a nuisance. Do specialised keyboards exist or you just get used to it?

#### 4. Why did I need to trim the value before the HashMap lookup worked?

When I passed the plain `input` to the hash map `get` (`pinyin_to_hanzi.get(input)`), I got the error  "arguments to this method are incorrect, expected `&_`, found `String`". If I did what the compiler suggested only, and just borrowed the value (`pinyin_to_hanzi.get(&input)`), no matter if the input I provided was objectively correct, my Rust program always told me that my input guess was wrong.

It was only through GitHub copilot fortune that I solved it. I tried its suggestion, `pinyin_to_hanzi.get(input.trim());` and this worked. Why? I assumed that the input must include some white space unbeknownst to me, because `trim` according to the docs, "returns a string slice with leading and trailing whitespace removed". Sure enough, when I logged out the raw input I got `"hao\n"`. Tricksy little new line.

#### 5. Can I share my compiled program with someone else via WhatsApp?

I `cargo build --release` and WhatsApped the build to my supportive husband. Let's see.
