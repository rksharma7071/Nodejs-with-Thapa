import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const showMenu = () => {
  console.log("\n1: Add a Task");
  console.log("2: View Tasks");
  console.log("3: Exit");
  rl.question("Choose an option: ", handleInput);
};

const handleInput = (option) => {
  if (option === "1") {
    rl.question("Enter the Task:", (task) => {
      todos.push(task);
      console.log("Task added: ", task);
      showMenu();
    });
  } else if (option === "2") {
    console.log("\nYour Todo Lists");
    todos.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
    showMenu();
  } else if (option === "3") {
    console.log("Good Bye");
    rl.close();
  } else {
    console.log("Invalid Option. Please try again");
    showMenu()
  }
};

showMenu();


// PS E:\NodeJS\mini_project> node app.js

// 1: Add a Task
// 2: View Tasks
// 3: Exit
// Choose an option: 1
// Enter the Task:Study about Shopify CRO
// Task added:  Study about Shopify CRO

// 1: Add a Task
// 2: View Tasks
// 3: Exit
// Choose an option: 1
// Enter the Task:Publish the Annapolis Blog
// Task added:  Publish the Annapolis Blog

// 1: Add a Task
// 2: View Tasks
// 3: Exit
// Choose an option: 2

//  Your Todo Lists
// 1. Study about Shopify CRO
// 2. Publish the Annapolis Blog

// 1: Add a Task
// 2: View Tasks
// 3: Exit
// Choose an option: 3
// Good Bye