import java.io.*;
import java.util.*;
public class TrueLumberCompany
{
	public static void main(String[] args) throws IOException
	{
		File file = new File("truelumbercompany.text"); //Open transaction file for truelumbercompany
		Scanner readFile = new Scanner(file);
		LinkedList<Wood> receipt = new LinkedList<>(); //LinkedList for receipts
		FileWriter fileWriter = new FileWriter("tlc.text");
		PrintWriter printWriter = new PrintWriter(fileWriter);
		read(readFile, receipt, printWriter); //Load values into receipt, while checking for S/P
		leftoverWood(receipt, printWriter); //Calculate leftover wood
		printWriter.close();
	}
	public static void read(Scanner readFile, LinkedList<Wood> receipt, PrintWriter printWriter) //Load values into receipt, while checking for S/P
	{
		int count = 0;
		readFile.nextLine(); //Skip header values
		String checkRSP = readFile.next(); //Check for R/S/P
		while (readFile.hasNext())
		{
			int total = 0;
			int discount = 100;
			if (checkRSP.equals("R"))
			{
				char woodType = readFile.next().charAt(0);
				int widgets = readFile.nextInt();
				String splitCost = readFile.next().replace("$", "");
				double cost = Double.parseDouble(splitCost);
				receipt.add(new Wood(woodType, widgets, cost)); //Add wood objects to receipt
				printWriter.println(receipt.get(count).toString());
				count++;
				if (readFile.hasNext())
				{
					checkRSP = readFile.next();
				}
			}
			else if (checkRSP.equals("S"))
			{
				while (checkRSP.equals("S")) //Loop multiple sales from the same customer
				{
					total += request(readFile, receipt, discount, printWriter); //Calculate total
					if (readFile.hasNext())
					{
						checkRSP = readFile.next();
					}
				}
				printWriter.println("\tTotal: $" + total);
			}
			else if (checkRSP.equals("P"))
			{
				String disc = readFile.next().replace("%", "");
				discount = Integer.parseInt(disc);
				printWriter.println("The next customer will receive a %" + discount + " discount on their order");
				if (readFile.hasNext())
				{
					checkRSP = readFile.next();
				}
				while (checkRSP.equals("S")) //Loop multiple sales from the same customer
				{
					total += request(readFile, receipt, discount, printWriter); //Calculate total
					if (readFile.hasNext())
					{
						checkRSP = readFile.next();
					}
				}
				printWriter.println("\tTotal: $" + total);
			}
		}
	}
	public static double request(Scanner readFile, LinkedList<Wood> receipt, int discount, PrintWriter printWriter) //Compute requests for wood
	{
		char wood = readFile.next().charAt(0);
		int sell = readFile.nextInt();
		int temp = sell;
		double total = 0;
		if (wood == 'O')
		{
			for (int i = 0; i < receipt.size(); i++)
			{
				if (receipt.get(i).getWoodType() == wood && !(temp <= 0))
				{
					int widgets = receipt.get(i).getWidgets();
					if (sell <= widgets)
					{
						double tempTotal = sell * receipt.get(i).getCost(); //Calculate total
						total += tempTotal * discount / 100; //Add tempTotal, with the discount, to total
						temp -= widgets;
						printWriter.println("Sold " + sell + " O for $" + receipt.get(i).getCost() + " each" +
								"\n\tSale: $" + tempTotal);
						receipt.get(i).setWidgets(widgets - sell);
						break;
					}
					else
					{
						temp = sell - receipt.get(i).getWidgets(); //Keep track of widgets that have not been sold from sell
						double tempTotal = (sell - temp) * receipt.get(i).getCost(); //Calculate total
						total += tempTotal * discount / 100; //Add tempTotal, with the discount, to total
						if (!((sell - temp) == 0))
						{
							printWriter.println("Sold " + (sell - temp) + " O for $" + receipt.get(i).getCost() + " each" +
									"\n\tSale: $" + tempTotal);
						}
						receipt.get(i).setWidgets(0);
					}
				}
			}
			if (temp > 0)
			{
				printWriter.println(temp + " pieces of " + wood + " not sold");
			}
		}
		else if (wood == 'C')
		{
			for (int i = 0; i < receipt.size(); i++)
			{
				if (receipt.get(i).getWoodType() == wood && !(temp <= 0))
				{
					int widgets = receipt.get(i).getWidgets();
					if (sell <= widgets)
					{
						double tempTotal = sell * receipt.get(i).getCost(); //Calculate total
						total += tempTotal * discount / 100; //Add tempTotal, with the discount, to total
						temp -= widgets;
						printWriter.println("Sold " + sell + " C for $" + receipt.get(i).getCost() + " each" +
								"\n\tSale: $" + tempTotal);
						receipt.get(i).setWidgets(widgets - sell);
						break;
					}
					else
					{
						temp = sell - receipt.get(i).getWidgets(); //Keep track of widgets that have not been sold from sell
						double tempTotal = (sell - temp) * receipt.get(i).getCost(); //Calculate total
						total += tempTotal * discount / 100; //Add tempTotal, with the discount, to total
						if (!((sell - temp) == 0))
						{
							printWriter.println("Sold " + (sell - temp) + " C for $" + receipt.get(i).getCost() + " each" +
									"\n\tSale: $" + tempTotal);
						}
						receipt.get(i).setWidgets(0);
					}
				}
			}
			if (temp > 0)
			{
				printWriter.println(temp + " pieces of " + wood + " not sold");
			}
		}
		return total;
	}
	public static void leftoverWood(LinkedList<Wood> receipt, PrintWriter printWriter) //Calculate leftover wood
	{
		int oCount = 0;
		int cCount = 0;
		for (int i = 0; i < receipt.size(); i++)
		{
			if (receipt.get(i).getWoodType() == 'O')
			{
				oCount += receipt.get(i).getWidgets();
			}
			else if (receipt.get(i).getWoodType() == 'C')
			{
				cCount += receipt.get(i).getWidgets();
			}
		}
		printWriter.println("There are " + oCount + " of type O wood left");
		printWriter.println("There are " + cCount + " of type C wood left");
	}
}
class Wood
{
	private char woodType;
	private int widgets;
	private double cost;
	public Wood(char woodType, int widgets, double cost)
	{
		this.woodType = woodType;
		this.widgets = widgets;
		this.cost = cost;
	}
	public char getWoodType()
	{
		return woodType;
	}
	public int getWidgets()
	{
		return widgets;
	}
	public double getCost()
	{
		return cost;
	}
	public void setWidgets(int widgets)
	{
		this.widgets = widgets;
	}
	public String toString()
	{
		return "Recieved " + widgets + " of " + woodType + " for $" + cost + " each";
	}
}