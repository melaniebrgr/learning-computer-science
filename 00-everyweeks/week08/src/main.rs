use std::collections::HashMap;
use std::io::{self};

fn main() {
    let pinyin_hanzi_map = HashMap::from([
        ("wǒ".to_string(), "我".to_string()),
        ("nǐ".to_string(), "你".to_string()),
        ("hǎo".to_string(), "好".to_string()),
        ("zài".to_string(), "再".to_string()),
        ("jiàn".to_string(), "见".to_string()),
    ]);

    let hanzi = pinyin_hanzi_map.values().nth(0).unwrap();
    println!("What is the pinyin for {}?", hanzi);

    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();

    let fallback = "?".to_string();
    let pinyin = pinyin_hanzi_map
        .get(input.trim())
        .unwrap_or_else(|| &fallback);

    println!("pinyin found! ({}) ", pinyin);
}
