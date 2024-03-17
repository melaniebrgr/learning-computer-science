use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn main() -> String {
    let pinyin_to_hanzi = HashMap::from([
        ("wǒ".to_string(), "我".to_string()),
        ("nǐ".to_string(), "你".to_string()),
        ("hǎo".to_string(), "好".to_string()),
        ("zài".to_string(), "再".to_string()),
        ("jiàn".to_string(), "见".to_string()),
        ("jiào".to_string(), "叫".to_string()),
        ("lǐ".to_string(), "李".to_string()),
    ]);

    let hanzi_pick = pinyin_to_hanzi.values().nth(0).unwrap();

    return hanzi_pick.to_string();
}
