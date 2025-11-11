import https from "https";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const apiKey = "fe096b492a7a757344407f58";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

https.get(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    const rates = JSON.parse(data).conversion_rates;

    rl.question("Enter the amount in USD: ", (amount) => {
      const usdAmount = parseFloat(amount);

      if (isNaN(usdAmount)) {
        console.log(chalk.red("Please enter a valid number."));
        rl.close();
        return;
      }

      rl.question(
        "Enter the target currency (e.g. INR, EUR, NPR): ",
        (currency) => {
          const rate = rates[currency.toUpperCase()];

          if (rate) {
            const convertedValue = usdAmount * rate;
            console.log(
              chalk.green(
                `${usdAmount} USD is approximately ${convertedValue.toFixed(2)} ${currency.toUpperCase()}`
              )
            );
          } else {
            console.log(chalk.red("Invalid Currency Code."));
          }

          rl.close();
        }
      );
    });
  });
});
