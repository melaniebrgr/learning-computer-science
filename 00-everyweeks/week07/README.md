# Journal

A past ["Try Friday" from Coding Garden](https://www.youtube.com/watch?v=YF_pq7dSMh0) tried to learn Rust and build a simple CLI tool.
Goodness gracious did it strongly leave the impression that for the average developer getting up and running a simple program within a few hours it painful to the point of impossible.
If you are coming from primarly JavaScript there are too many fundamental concepts to spend time to understand first.

Huge props to Coding Garden for persevering through the challenges, and balancing learning concepts and building in just the right ratio.
I think it really helps to see how other developers struggle a challenging problem.

In the video chat proposed using a crate called `clap` that is popular for building CLIs, but also chat later suggested this was probably overkill.
So I started with a different approach for my CLI.
In the Rust By Example book there was a ["Program arguments" example](https://doc.rust-lang.org/rust-by-example/std_misc/arg.html) that looked completely sufficient:

> The command line arguments can be accessed using std::env::args, which returns an iterator that yields a String for each argument. The first argument is the path that was used to call the program. The rest of the arguments are the passed command line parameters.

```bash
# Example
$ ./args arg1 arg2

# The first arg is "./args".
# The rest of the args are ["arg1", "arg2"] (`&args[1..]`).
```
