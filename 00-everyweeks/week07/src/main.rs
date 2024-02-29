use std::collections::HashMap;
use std::io::{self};
use std::pin;

fn main() {
    let pinyin = HashMap::from([
        ("我".to_string(), "wǒ".to_string()),
        ("你".to_string(), "nǐ".to_string()),
        ("好".to_string(), "hǎo".to_string()),
        ("再".to_string(), "zài".to_string()),
        ("见".to_string(), "jiàn".to_string()),
    ]);

    let hanzi = pinyin.keys().nth(0).unwrap();
    println!("What is the pinyin for {}?", hanzi);

    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
}
