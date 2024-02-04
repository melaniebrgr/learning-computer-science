fn main() {
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
