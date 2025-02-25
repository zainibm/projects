import java.io.*;
import java.util.*;

public class BabysittersClub {
    public static void main(String[] args) throws IOException {
        File personnelFile = new File("personnel.txt"); // Open personnel file
        File payrollFile = new File("payroll.txt"); // Open payroll file
        final int SIZE = 50;
        Babysitter[] babysitter = new Babysitter[SIZE];
        readPersonnel(babysitter, personnelFile); // Load values into babysitter
        Payroll[] payroll = new Payroll[SIZE];
        readPayroll(payroll, payrollFile); // Load values into payroll
        calcPayroll(babysitter, payroll); // Calculate payroll
    }

    // Load values into babysitter
    public static void readPersonnel(Babysitter[] babysitter, File personnelFile) throws IOException {
        Scanner readFile = new Scanner(personnelFile);
        int count = 0;
        while (readFile.hasNext() && count < babysitter.length) {
            babysitter[count] = new Babysitter(readFile.nextLine(), readFile.nextLine(), readFile.nextLine(),
                    readFile.nextLine(), readFile.nextDouble(), readFile.nextDouble(), readFile.nextDouble());
            if (readFile.hasNext()) {
                readFile.nextLine();
            }
            count++;
        }
        // Sort babysitter names alphabetically
        for (int i = 0; i < count; i++) {
            for (int j = 0; j < count; j++) {
                if (babysitter[i].getName().compareTo(babysitter[j].getName()) < 0) {
                    Babysitter temp = babysitter[i];
                    babysitter[i] = babysitter[j];
                    babysitter[j] = temp;
                }
            }
        }
        readFile.close();
    }

    // Load values into payroll
    public static void readPayroll(Payroll[] payroll, File payrollFile) throws IOException {
        Scanner readFile = new Scanner(payrollFile);
        int count = 0;
        while (readFile.hasNext() && count < payroll.length) {
            String employeeNo = readFile.next();
            int days = readFile.nextInt();
            final int SIZE = 7;
            String[] start = new String[SIZE];
            String[] end = new String[SIZE];
            int countSE = 0;
            while (readFile.hasNext() && countSE < days) {
                start[countSE] = readFile.next();
                end[countSE] = readFile.next();
                countSE++;
            }
            payroll[count] = new Payroll(employeeNo, days, start, end);
            count++;
        }
        readFile.close();
    }

    // Calculate payroll
    public static void calcPayroll(Babysitter[] babysitter, Payroll[] payroll) throws IOException {
        int count = 0;
        while (babysitter[count] != null && count < babysitter.length) {
            double sum = 0;
            int foundValue = -1;
            for (int i = 0; i < babysitter.length; i++) {
                // Find matching employee number in babysitter and payroll
                if (babysitter[count].getEmployeeNo().equals(payroll[i].getEmployeeNo())) {
                    foundValue = i;
                    break;
                }
            }
            int countSE = 0; // Counter for start/end values
            while (countSE < payroll[foundValue].getDays()) {
                double[] startWork = payroll[foundValue].getStart(countSE); // Retrieve start time
                double shr = startWork[0]; // Set hour started
                double sm = startWork[1] / 60; // Set minutes started in hours format
                shr += sm; // Add minutes started to hours started
                double[] endWork = payroll[foundValue].getEnd(countSE); // Retrieve end time
                double ehr = endWork[0]; // Set hour ended
                double em = endWork[1] / 60; // Set minutes ended in hours format
                ehr += em; // Add minutes ended to hours ended
                // Add 12 if start time greater than 6
                if (shr > 6) {
                    shr += 12;
                }
                // Add 12 if end time greater than 6
                if (ehr > 6) {
                    ehr += 12;
                }
                // Add difference between end time and start time if start time is less than 6
                if (shr < 6) {
                    sum += (ehr - shr) * babysitter[count].getHRB12();
                } else if (shr < 21) {
                    // Start < 9:00 PM
                    if (ehr <= 6) {
                        // Account for all three hourly rates
                        sum += (21 - shr) * babysitter[count].getHRB9();
                        sum += (3) * babysitter[count].getHRB9_12();
                        sum += (ehr) * babysitter[count].getHRB12();
                    } else if (ehr >= 21 && ehr <= 24) {
                        // Account for hourly rates before 9:00 PM and between 9:00 PM and 12:00 AM
                        sum += (21 - shr) * babysitter[count].getHRB9();
                        sum += (ehr - 21) * babysitter[count].getHRB9_12();
                    } else {
                        // Account for hourly rate before 9:00 PM
                        sum += (ehr - shr) * babysitter[count].getHRB9();
                    }
                } else {
                    // Start > 9:00 PM
                    if (ehr <= 6) {
                        // Account for hourly rates between 9:00 PM and 12:00 AM and after 12:00 AM
                        sum += (24 - shr) * babysitter[count].getHRB9_12();
                        sum += (ehr) * babysitter[count].getHRB12();
                    } else {
                        // Account for hourly rate between 9:00 PM and 12:00 AM
                        sum += (ehr - shr) * babysitter[count].getHRB9_12();
                    }
                }
                countSE++;
            }
            printData(babysitter[count], sum); // Print babysitter name and total pay to an output file
            count++;
        }
    }

    // Print babysitter name and total pay to an output file
    public static void printData(Babysitter babysitter, double sum) throws IOException {
        FileWriter fileWriter = new FileWriter("output.txt", true);
        PrintWriter printWriter = new PrintWriter(fileWriter);
        printWriter.write(String.format("Employee: %s Total Pay: $%,.2f%n", babysitter.getName(), sum));
        printWriter.close();
    }
}

class Babysitter {
    private String employeeNo;
    private String name;
    private String addressA;
    private String addressB;
    private double hrb9;
    private double hrb9_12;
    private double hrb12;

    public Babysitter(String employeeNo, String name, String addressA, String addressB, double hrb9, double hrb9_12,
            double hrb12) {
        this.employeeNo = employeeNo;
        this.name = name;
        this.addressA = addressA;
        this.addressB = addressB;
        this.hrb9 = hrb9;
        this.hrb9_12 = hrb9_12;
        this.hrb12 = hrb12;
    }

    public String getEmployeeNo() {
        return employeeNo;
    }

    public String getName() {
        return name;
    }

    public double getHRB9() {
        return hrb9;
    }

    public double getHRB9_12() {
        return hrb9_12;
    }

    public double getHRB12() {
        return hrb12;
    }
}

class Payroll {
    private String employeeNo;
    private int days;
    private String[] start;
    private String[] end;

    public Payroll(String employeeNo, int days, String[] start, String[] end) {
        this.employeeNo = employeeNo;
        this.days = days;
        this.start = start;
        this.end = end;
    }

    public String getEmployeeNo() {
        return employeeNo;
    }

    public int getDays() {
        return days;
    }

    public double[] getStart(int count) {
        String[] splitStart = start[count].split(":");
        double[] splitSS = new double[2];
        for (int i = 0; i < 2; i++) {
            splitSS[i] = Double.parseDouble(splitStart[i]);
        }
        return splitSS;
    }

    public double[] getEnd(int count) {
        String[] splitEnd = end[count].split(":");
        double[] splitSE = new double[2];
        for (int i = 0; i < 2; i++) {
            splitSE[i] = Double.parseDouble(splitEnd[i]);
        }
        return splitSE;
    }
}