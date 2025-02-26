# Babysitter's Club
A program that reads start and end times for babysitters and their hourly rates. <br>
A start or end time is between 6:00 AM and 6:00 PM. <br>
Calculations are printed to an output file alphabetically.

## Commands
`javac .\BabysittersClub.java` compiles the `.java` program. <br>
`java .\BabysittersClub.java` runs the program.

## Sample
| personnel.txt |
|---------------|
| 0001 <br> McGill, Stacey <br> 231 Maple Avenue <br> Stoneybrook, Connecticut 30122 <br> 5.50 4.00 6.00 <br> 0002 <br> Franklin, Maryann <br> 401 Orange Lane <br> Stoneybrook, Connecticut 30122 <br> 10.00 8.00 15.00 |

| payroll.txt |
|-------------|
| 0001 <br> 2 <br> 8:00 11:00 <br> 9:00 11:30 <br> 0002 <br> 2 <br> 6:00 2:00 <br> 7:00 3:00 |

| output.txt |
|------------|
| Employee: Franklin, Maryann Total Pay: $293.00 <br> Employee: McGill, Stacey Total Pay: $23.50 |