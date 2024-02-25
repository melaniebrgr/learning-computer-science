fn greet() -> String {
    String::from("Hello dolly")
}

#[test]
fn verify_greet() {
    let s = greet();
    assert_eq!(String::from("Hello dolly"), s);
}

fn main() {
    let s = greet();
    println!("{}", s);
}
