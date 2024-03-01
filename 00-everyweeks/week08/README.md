# Journal: Weeks 8-9 project

## Guess the pinyin

A past ["Try Friday" from Coding Garden](https://www.youtube.com/watch?v=YF_pq7dSMh0) tried to learn Rust and build a simple CLI tool. It demonstrated that getting even a simple program running within a few hours in Rust is painful to the point of impossible. If you are coming from JavaScript, there are just too many fundamental concepts you need to learn first.

Full credit to CJ (Coding Garden) for persevering through all the set backs on _livestream_. He did a frankly fantastic job going between learning concepts and building stuff. It was also cathartic, frankly, to another more talented developer struggle with Rust and a programming problem. I also learned recently that CJ joined the Syntax team, which is a pretty cool move.

I watched the stream principally to see what I could take from it to code my own CLI tool, but I ended up coding something completely different, since my use case was completely different. My goal was to create a small program to help me learn Chinese. I have this simple children's book on my desk, "小王子" (The Little Prince), and by the end of 2024 I want to be able to read it. Let's go.

The goal of this weeks, is a Rust guessing game where given a chinese character prompt, you enter the  pinyin and are notified if it is correct or not. Maybe you can build a streak. Let's see.

### Real stupid questions from development

1. How do I use a HashMap?
1. Why does the nth HashMap value change every time?
1. How can I even type pinyin?
1. Why did I need to trim the value before the HashMap lookup worked?
