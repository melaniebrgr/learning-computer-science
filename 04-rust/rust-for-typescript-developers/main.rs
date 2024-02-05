fn log_lines() {
    let file = std::fs::read_to_string("lines.txt").unwrap();

    // file.lines()
    //     .step_by(2)
    //     .for_each(|line| println!("{}", line));

    file.lines()
        .enumerate()
        .filter(|(idx, _)| idx % 2 == 0)
        .skip(2)
        .take(2)
        .for_each(|(_, line)| println!("{}", line))
}

enum Color {
    Red,
    Green,
    Blue,
    Yellow,
}

impl Color {
    fn is_green(&self) -> bool {
        if let Color::Green = self {
            return true;
        }
        return false;
    }

    fn is_green_parts(&self) -> bool {
        match self {
            Color::Red => return false,
            Color::Green => return false,
            Color::Blue => return true,
            Color::Yellow => return true,
        }
    }
}

fn print_color(color: Color) {
    match color {
        Color::Red => println!("red"),
        Color::Green => println!("green"),
        Color::Blue => println!("blue"),
        Color::Yellow => println!("yellow"),
    }
}

fn main() {
    // log_lines();
    print_color(Color::Red);
    print_color(Color::Green);
    print_color(Color::Blue);
}
