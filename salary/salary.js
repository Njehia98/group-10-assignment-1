const readline = require('readline');
// tax rates and deduction percentages
const kraTaxRates = [
    { min: 0, max: 24000, rate: 10 },
    { min: 24001, max: 32333, rate: 15 },
    { min: 32334, max: 41000, rate: 20 },
];
const nhifDeductionRate = 0.015; //  NHIF deduction rate (0.015 represents 1.5%)
const nssfDeductionRateEmployee = 0.06; // NSSF deduction rate (6%)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Function to calculate tax based on the salary
function calculateTax(salary) {
    let tax = 0;
    for (const bracket of kraTaxRates) {
        if (salary > bracket.max) {
            tax =tax+(bracket.max - bracket.min + 1) * (bracket.rate / 100);
        } else {
            tax =tax+(salary - bracket.min + 1) * (bracket.rate / 100);
            break;
        }
    }
    return tax;
}
// Function to calculate NHIF deduction
function calculateNHIF(salary) {
    return salary * nhifDeductionRate;
}
// Function to calculate NSSF deduction (employee contribution)
function calculateNSSFEmployee(salary) {
    return salary * nssfDeductionRateEmployee;
}
// Function to calculate net salary based on user input
function calculateNetSalary() {
    rl.question('Enter your basic salary: ', (basicSalary) => {
        rl.question('Enter benefits: ', (benefits) => {
            basicSalary = parseFloat(basicSalary);
            benefits = parseFloat(benefits);
            if (isNaN(basicSalary) || isNaN(benefits)) {
                console.log("Please enter valid numbers for basic salary and benefits.");
                rl.close();
                return;
            }
            const grossSalary = basicSalary + benefits;
            const tax = calculateTax(grossSalary);
            const nhifDeduction = calculateNHIF(grossSalary);
            const nssfDeductionEmployee = calculateNSSFEmployee(grossSalary);
            const netSalary = grossSalary - tax - nhifDeduction - nssfDeductionEmployee;
            console.log(Gross Salary, ${grossSalary});
            console.log(tax (PAYEE),${tax});
            console.log(NHIF Deductions, ${nhifDeduction});
            console.log(NSSF Deductions, ${nssfDeductionEmployee});
            console.log(Net Salary, ${netSalary});
            rl.close();
        });
    });
}
// Calculate net salary based on user input
calculateNetSalary();