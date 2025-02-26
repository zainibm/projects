# True Lumber Company
A program that reads input data and writes receipt, request, and promotional records to an output file. <br>

## Commands
`javac .\TrueLumberCompany.java` compiles the `.java` program. <br>
`java .\TrueLumberCompany.java` runs the program.

## Key
- `R` is a receipt record followed by the wood type (`O`ak or `C`herry), amount ordered, and unit cost.
- `S` is a sales record followed by the wood type (`O`ak or `C`herry) and amount ordered.
- `P` is a promotional record followed by the discount percentage.

## Sample
| truelumbercompany.txt |
|-----------------------|
| R O 150 $3.00 <br> R C 130 $5.00 <br> S O 145 |

| tlc.txt |
|---------|
| Received 150 of O for $3.0 each <br> Received 130 of C for $5.0 each <br> Sold 145 O for $3.0 each <br> Sale: $435.0 <br> Total: $435 <br> There are 5 of type O wood left <br> There are 130 of type C wood left |

## Notes
- [ ] Add 40% markup to sales.
- [ ] Optimize repetitive statements.