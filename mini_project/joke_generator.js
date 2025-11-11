import http from "http";
import chalk from "chalk";

const getJoke = () => {
  const url = "http://www.official-joke-api.appspot.com/random_joke";

  http.get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const joke = JSON.parse(data);
          console.log(chalk.yellow("Here is a random joke:"));
          console.log(chalk.red(joke.setup));
          console.log(chalk.blue.bgRed.bold(joke.punchline));
        } catch (err) {
          console.error(chalk.red("Error parsing joke data:"), err.message);
        }
      });
    })
    .on("error", (err) => {
      console.error(chalk.red("Error fetching joke:"), err.message);
    });
};

getJoke();
