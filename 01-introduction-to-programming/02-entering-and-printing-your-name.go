package main

import "fmt"

func main() {
	var dob string
	var name string

	fmt.Print("Enter your date of birth: ")
	fmt.Scan(&dob)
	fmt.Print("Enter your last name: ")
	fmt.Scan(&name)
	fmt.Printf("My last name is '%s', and my date of birth is %s", name, dob)
}
