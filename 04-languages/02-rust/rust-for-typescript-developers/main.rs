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

struct Custom {
    age: usize,
    name: String,
}

enum Item {
    Number(usize),
    String(String),
    MyCustom(Custom),
}

fn append(items: &mut Vec<Item>) {
    items.push(Item::String("hello, Fem".into()));
}

fn take_some_num(n: Option<usize>) -> Option<usize> {
    // return n.unwrap_or(0) * 5;
    // return n.map(|x| x * 5);
    Some(n? * 5)
}

fn main() {
    // # Iterators
    // log_lines();

    // # Enums
    // print_color(Color::Red);
    // print_color(Color::Green);
    // print_color(Color::Blue);
    // let mut items: Vec<Item> = vec![];
    // append(&mut items);

    // # Options
    let value = take_some_num(Some(5));
    println!("{:?}", value);
}
