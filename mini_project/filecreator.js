import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileCreation = () => {
  rl.question("Enter your file name: ", (filename) => {
    rl.question("Enter the content: ", (content) => {
      fs.writeFile(`${filename}.txt`, content, (err) => {
        if (err) {
          console.error(`Error writing the file: ${err.message}`);
        } else {
          console.log(`File "${filename}.txt" created successfully!`);
        }
        rl.close();
      });
    });
  });
};

fileCreation();

