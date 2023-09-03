const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      // Read the quotes from the quotes.txt file
      const quotesData = await fs.readFile(QUOTE_FILE, "utf-8");
      const quotes = quotesData.split("\n");

      // Select a random quote
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      // Display the quote using chalk
      console.log(chalk.green(randomQuote));
    } catch (error) {
      console.error(chalk.red("Error:", error.message));
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      // If no author is provided, set it as "Anonymous"
      if (!author) {
        author = "Anonymous";
      }

      // Prepare the quote to be saved to the file
      const quoteToSave = `${quote} | ${author}\n`;

      // Append the quote to the quotes.txt file
      await fs.appendFile(QUOTE_FILE, quoteToSave, "utf-8");

      // Display a success message using chalk
      console.log(chalk.green("Quote added successfully!"));
    } catch (error) {
      console.error(chalk.red("Error:", error.message));
    }
  });

program.parse();