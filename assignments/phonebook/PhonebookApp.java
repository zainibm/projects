import java.io.*;
import java.util.*;

public class PhonebookApp {
    public static void main(String[] args) {
        try {
            String fileName = args[0];
            Scanner kbd = new Scanner(System.in);
            Phonebook phonebook = new Phonebook(fileName);
            System.out.print("lookup, quit (l/q)? ");
            while (kbd.hasNext()) {
                String searchKey = kbd.next();
                if (searchKey.equalsIgnoreCase("l")) {
                    System.out.print("last name? ");
                    String lastName = kbd.next();
                    System.out.print("first name? ");
                    String firstName = kbd.next();
                    phonebook.lookup(lastName, firstName);
                } else if (searchKey.equalsIgnoreCase("q")) {
                    break;
                }
                System.out.print("\nlookup, quit (l/q)? ");
            }
            kbd.close();
        } catch (IndexOutOfBoundsException exc) {
            System.out.println("Usage: PhonebookApp 'phonebook-filename'");
        } catch (FileNotFoundException exc) {
            System.out.println("*** IOException *** phonebook.text (No such file or directory)");
        } catch (Exception exc) {
            System.out.println("*** Exception *** " + exc);
        }
    }
}

class Phonebook {
    private Map<Name, PhonebookEntry> mapPB = new TreeMap<>();

    public Phonebook(String fileName) throws Exception {
        File file = new File(fileName);
        if (file == null) {
            Exception fileExc = new Exception();
            throw fileExc;
        }
        Scanner readFile = new Scanner(file);
        PhonebookEntry checkEntry = PhonebookEntry.read(readFile);
        while (checkEntry != null) {
            mapPB.put(checkEntry.getName(), checkEntry);
            checkEntry = PhonebookEntry.read(readFile);
        }
    }

    public void lookup(String lastName, String firstName) {
        boolean found = false;
        Name nameSearch = new Name(lastName, firstName);
        for (int i = 0; i < mapPB.size(); i++) {
            if (mapPB.containsKey(nameSearch)) {
                found = true;
            }
        }
        if (found == true) {
            System.out.println(nameSearch.toString() + "'s phone numbers: " + mapPB.get(nameSearch));
        } else {
            System.out.println("-- Name not found");
        }
    }
}

class Name implements Comparable<Name> {
    private String first;
    private String last;

    public Name(String last, String first) {
        this.last = last;
        this.first = first;
    }

    public Name(String first) {
        this("", first);
    }

    public String getFormal() {
        return first + " " + last;
    }

    public String getOfficial() {
        return last + ", " + first;
    }

    public String getInitials() {
        return first.charAt(0) + "." + last.charAt(0) + ".";
    }

    @Override
    public int compareTo(Name name) {
        return this.toString().compareTo(name.toString());
    }

    public boolean equals(Name other) {
        if (other == null) {
            return false;
        }
        return first.equals(other.first) && last.equals(other.last);
    }

    @Override
    public String toString() {
        return first + " " + last;
    }

    public static Name read(Scanner scanner) {
        if (!scanner.hasNext()) {
            return null;
        }
        String last = scanner.next();
        String first = scanner.next();
        return new Name(last, first);
    }
}

class PhoneNumber {
    private String number;

    public PhoneNumber(String number) {
        this.number = number;
    }

    public void setPhoneNumber(String number) {
        this.number = number;
    }

    public String getPhoneNumber() {
        return number;
    }

    public String getAreaCode() {
        return number.substring(1, 4);
    }

    public String getExchange() {
        return number.substring(5, 8);
    }

    public String getLineNumber() {
        return number.substring(9, 13);
    }

    public boolean isTollFree() {
        if (number.charAt(1) == '8') {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return number;
    }

    public boolean equals(PhoneNumber other) {
        if (other == null) {
            return false;
        }
        return number.equals(other.number);
    }

    public static PhoneNumber read(Scanner scanner) {
        if (!scanner.hasNext()) {
            return null;
        }
        String number = scanner.next();
        return new PhoneNumber(number);
    }
}

class PhonebookEntry {
    private Name name;
    private ArrayList<ExtendedPhoneNumber> phoneNumbers = new ArrayList<ExtendedPhoneNumber>();

    public PhonebookEntry(Name name, ArrayList<ExtendedPhoneNumber> phoneNumbers) {
        this.name = name;
        this.phoneNumbers = phoneNumbers;
    }

    public Name getName() {
        return name;
    }

    public ArrayList<ExtendedPhoneNumber> getPhoneNumbers() {
        return phoneNumbers;
    }

    @Override
    public String toString() {
        return "" + getPhoneNumbers();
    }

    public boolean equals(PhonebookEntry other) {
        if (other == null) {
            return false;
        }
        return name.equals(other.getName());
    }

    public static PhonebookEntry read(Scanner scanner) {
        if (!scanner.hasNext()) {
            return null;
        }
        Name readName = Name.read(scanner);
        int headerVal = scanner.nextInt();
        int count = 0;
        ArrayList<ExtendedPhoneNumber> readEPN = new ArrayList<ExtendedPhoneNumber>();
        while (count < headerVal) {
            readEPN.add(ExtendedPhoneNumber.read(scanner));
            count++;
        }
        return new PhonebookEntry(readName, readEPN);
    }
}

class ExtendedPhoneNumber extends PhoneNumber {
    String description;

    public ExtendedPhoneNumber(String description, String number) {
        super(number);
        this.description = description;
    }

    @Override
    public String toString() {
        return description + ": " + getPhoneNumber();
    }

    public static ExtendedPhoneNumber read(Scanner scanner) {
        if (!scanner.hasNext()) {
            return null;
        }
        return new ExtendedPhoneNumber(scanner.next(), scanner.next());
    }
}