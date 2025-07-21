use rand::Rng;
use std::collections::HashMap;

fn pinyin_to_hanzi() -> HashMap<String, String> {
    HashMap::from([
        ("wǒ".to_string(), "我".to_string()),
        ("nǐ".to_string(), "你".to_string()),
        ("hǎo".to_string(), "好".to_string()),
        ("zài".to_string(), "再".to_string()),
        ("jiàn".to_string(), "见".to_string()),
        ("jiào".to_string(), "叫".to_string()),
        ("lǐ".to_string(), "李".to_string()),
    ])
}

pub fn rand() -> String {
    let pinyin_to_hanzi = pinyin_to_hanzi();
    let random_number = rand::thread_rng().gen_range(0..pinyin_to_hanzi.len());
    return pinyin_to_hanzi
        .values()
        .nth(random_number)
        .unwrap()
        .to_string();
}

pub fn get_pinyin(hanzi: &str) -> Option<String> {
    pinyin_to_hanzi().get(hanzi).cloned()
}
