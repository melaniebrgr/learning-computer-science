mod hanzi;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    pub fn alert(s: &str);

    pub fn prompt(s: &str) -> String;
}

struct State {
    current_streak: u32,
}

impl State {
    fn new() -> Self {
        State { current_streak: 0 }
    }
    fn increment(&mut self) {
        self.current_streak += 1
    }
    fn reset(&mut self) {
        self.current_streak = 0
    }
}

#[allow(dead_code)]
enum Tone {
    First = 1,  // 1st tone (¯): option + a
    Second = 2, // 2nd tone (´): option + e
    Third = 3,  // 3rd tone (ˇ): option + v
    Fourth = 4, // 4th tone (`): option + ~
}

#[wasm_bindgen]
pub fn main() -> String {
    let hanzi_pick = hanzi::rand();
    let input = prompt(&format!("What is the pinyin for {}?", &hanzi_pick));
    let hanzi_maybe = hanzi::get_pinyin(&input.trim());
    let you_are_right = "好！👍".to_string();
    let you_are_wrong = "不好！👎".to_string();
    let mut state = State::new();

    return match hanzi_maybe {
        Some(hanzi) => {
            if hanzi == hanzi_pick {
                state.increment();
                format!("{}, streak: {}", you_are_right, state.current_streak)
            } else {
                state.reset();
                format!("{}, streak: {}", you_are_wrong, state.current_streak)
            }
        }
        None => {
            state.reset();
            format!("{}, streak: {}", you_are_wrong, state.current_streak)
        }
    };
}
