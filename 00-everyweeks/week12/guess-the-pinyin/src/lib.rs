use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    pub fn alert(s: &str);

    pub fn prompt(s: &str) -> String;
}

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
    let input = prompt(&format!("What is the pinyin for {}?", &hanzi_pick));
    let hanzi_maybe = pinyin_to_hanzi.get(input.trim());
    let you_are_right = "你不错了！👍".to_string();
    let you_are_wrong = "你错了！👎".to_string();

    return match hanzi_maybe {
        Some(hanzi) => {
            if hanzi == hanzi_pick {
                you_are_right
            } else {
                you_are_wrong
            }
        }
        None => you_are_wrong,
    };
}
