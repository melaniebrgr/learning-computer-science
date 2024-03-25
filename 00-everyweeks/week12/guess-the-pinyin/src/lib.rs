mod hanzi;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    pub fn alert(s: &str);

    pub fn prompt(s: &str) -> String;
}

struct HanziState {
    current_hanzi: String,
}

impl HanziState {
    fn new() -> Self {
        HanziState {
            current_hanzi: hanzi::rand(),
        }
    }
    fn get(&self) -> &str {
        &self.current_hanzi
    }
}

struct ScoreState {
    current_streak: u32,
}

impl ScoreState {
    fn new() -> Self {
        ScoreState { current_streak: 0 }
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
    let hanzi = HanziState::new();
    let input = prompt(&format!("What is the pinyin for {}?", hanzi.get()));
    let hanzi_maybe = hanzi::get_pinyin(&input.trim());
    let you_are_right = "好！👍".to_string();
    let you_are_wrong = "不好！👎".to_string();
    let mut score = ScoreState::new();

    return match hanzi_maybe {
        Some(hanzi_guess) => {
            if hanzi_guess == hanzi.get() {
                score.increment();
                format!("{}, streak: {}", you_are_right, score.current_streak)
            } else {
                score.reset();
                format!("{}, streak: {}", you_are_wrong, score.current_streak)
            }
        }
        None => {
            score.reset();
            format!("{}, streak: {}", you_are_wrong, score.current_streak)
        }
    };
}
