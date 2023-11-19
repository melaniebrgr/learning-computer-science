// https://ocw.mit.edu/courses/6-00sc-introduction-to-computer-science-and-programming-spring-2011/5a9a83ed849212ed5b372569d1f1493c_MIT6_00SCS11_ps1.pdf
// Paying the Minimum

package main

import "fmt"

func calculateCreditCardDebt(balance float32, interestRate float32, paymentRate float32) (float32, float32, float32) {
	minimumMonthlyPayment := paymentRate * balance
	interestPaid := (interestRate / 12) * balance
	principalPaid := minimumMonthlyPayment - interestPaid
	remainingBalance := balance - principalPaid
	return minimumMonthlyPayment, principalPaid, remainingBalance
}

func printMonthlyCreditCardDebt(month int, minimumMonthlyPayment float32, principlePaid float32, remainingBalance float32) {
	fmt.Printf("Month: %d\n", month)
	fmt.Printf("Minimum monthly payment: $%.2f\n", minimumMonthlyPayment)
	fmt.Printf("Principle paid: $%.2f\n", principlePaid)
	fmt.Printf("Remaining balance: $%.2f\n\n", remainingBalance)
}

func payingOffCreditCardDebt() {
	var creditCardBalance float32 = 4800
	var annualInterestRate float32 = 0.2
	var minimumMonthlyPaymentRate float32 = 0.02
	var totalAmountPaid float32 = 0

	for i := 1; i <= 12; i++ {
		var minimumMonthlyPayment, principlePaid float32
		minimumMonthlyPayment, principlePaid, creditCardBalance = calculateCreditCardDebt(creditCardBalance, annualInterestRate, minimumMonthlyPaymentRate)
		totalAmountPaid = totalAmountPaid + minimumMonthlyPayment
		printMonthlyCreditCardDebt(i, minimumMonthlyPayment, principlePaid, creditCardBalance)
	}

	fmt.Println("RESULT")
	fmt.Printf("Total amount paid: $%.2f\n", totalAmountPaid)
	fmt.Printf("Remaining balance: $%.2f\n", creditCardBalance)
}

// func main() {
// 	payingOffCreditCardDebt()
// }
