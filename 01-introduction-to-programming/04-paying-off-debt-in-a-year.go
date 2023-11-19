/* https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/5a9a83ed849212ed5b372569d1f1493c_MIT6_00SCS11_ps1.pdf
 * Paying Debt Off In a Year 
 *
 * Solve the problem with a looping program that carries out an exhaustive enumeration or "guess and check" of the space of possible answers systematically.
 * A.K.A write a brute force algorithm.
 */

package main

import "fmt"

func main() {
	var balance, annualInterestRate float32

	fmt.Println("Enter the outstanding balance on your credit card:")
	fmt.Scanln(&balance)
	fmt.Println("Enter the annual credit card interest rate as a decimal:")
	fmt.Scanln(&annualInterestRate)

	var monthlyInterestRate = annualInterestRate / 12
	balance = balance * (1 + monthlyInterestRate) – Minimum
monthly payment 

	// fmt.Printf("%f, %f, %f\n", balance, monthlyInterestRate, monthlyPaymentRant)
}
