# Go

## Control flow

### if, switch, looping, functions

```go
// if statements
num := -1

if num > 0 {
    fmt.Println(quote.Go())
} else {
    fmt.Println(quote.Hello())
}

// if statements with assignment
if err := someFunction(); err != nil {
    fmt.Println(err.Error())
}

// switch statements
var city string = "c"

switch city {
case "a":
    fmt.Println("A")
case "b", "c":
    fmt.Println("B or C")
default:
    fmt.Println("Z")
}

// switch statements with conditionals
var i int = 1

switch {
case 1 != 10:
    fmt.Println("! 10")
    fallthrough
case i > 10:
    fmt.Println("> 10")
case i < 10:
    fmt.Println("< 10")
default:
    fmt.Println("= 10")
}

// for loop
for i := 1; i <= 10; i++ {
    fmt.Println(i)
}

// while loop
i := 1

for i <= 100 {
    fmt.Println(i)
    i++
}

// looping over ranges
sentence := "Today we are going sailing."

for i, letter := range sentence {
    fmt.Println(i, " ", string(letter))
}

// functions
func add(a int, b int) int {
    return a + b
}

func printAge(age int) (ageOfSally int, ageOfBob int) {
    ageOfBob = 21
    ageOfSally = 16
    return
}

func printAges(ages ...int) int {
    return
}
```

### Examples

3. paying off credit card debt, [problem](https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/resources/mit6_00scs11_ps1/), [solution](./03-paying-off-credit-card-debt.go)