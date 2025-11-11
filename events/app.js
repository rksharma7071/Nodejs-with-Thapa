// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// //1.  Define an event listener (addListener)

// emitter.on("greet", ({ name, prof }) => {
//     console.log(`hello ${name}, You are a ${prof}`);
// })


// //2.  Trigger (emit) the "greet" event

// emitter.emit("greet", { name: "Retesh Sharma", prof: "Software Engineer" });

// // You can also pass arguments while emitting 


const EventEmitter = require("events");
const emitter = new EventEmitter();


// emitter.on("greet", ({ name, prof }) => {
//   console.log(`Hello ${name}, you are a ${prof}`);
// });

// emitter.emit("greet", { name: "Retesh Sharma", prof: "Software Engineer" });

// Hello Retesh Sharma, you are a Software Engineer


// emitter.on("order", (item, quantity, price) => {
//     console.log(`Order received: ${quantity} ${item}(s) at $${price} each`);
// });

// emitter.emit("order", "T-Shirt", 3, 20);

// Order received: 3 T-Shirt(s) at $20 each

// emitter.once("connect", () => {
//     console.log("Connected to the database (this runs only once)");
// });

// emitter.emit("connect");
// emitter.emit("connect");

// // Connected to the database (this runs only once)

// const greetHandler = () => console.log("Hello there!");

// emitter.on("hi", greetHandler);
// emitter.emit("hi");

// emitter.off("hi", greetHandler);
// emitter.emit("hi"); // No output now

// const logger = new EventEmitter();

// logger.on("log", (msg) => {
//     console.log(`[LOG]: ${msg}`);
// });

// logger.emit("log", "User logged in");
// logger.emit("log", "User viewed dashboard");

// [LOG]: User logged in
// [LOG]: User viewed dashboard

// Create a program using node.js EventEmitter that: 
// Listener for multiple types of user events (e.g. login, logout, purchase, and profile update).
// Tracks how many times each event is emitted.
// Logs a summary of all event occurrences when a special summary event is triggered.


const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();
const dataFile = "eventData.json";

// 🗂️ Step 1: Load previous event data (if exists)
let eventCount = {
    login: 0,
    logout: 0,
    purchase: 0,
    profileUpdate: 0,
};

if (fs.existsSync(dataFile)) {
    const savedData = fs.readFileSync(dataFile, "utf8");
    if (savedData) {
        eventCount = JSON.parse(savedData);
    }
}

// 🧠 Step 2: Define event listeners
emitter.on("login", (username) => {
    eventCount.login++;
    console.log(`${username} logged in.`);
});

emitter.on("logout", (username) => {
    eventCount.logout++;
    console.log(`${username} logged out.`);
});

emitter.on("purchase", (username, item, price) => {
    eventCount.purchase++;
    console.log(`${username} purchased ${item} for $${price}.`);
});

emitter.on("profileUpdate", (username) => {
    eventCount.profileUpdate++;
    console.log(`${username} updated their profile.`);
});

// 📊 Step 3: Summary event — show + save updated data
emitter.on("summary", () => {
    console.log("\n📊 Event Summary:");
    console.table(eventCount);

    // Save updated data back to file
    fs.writeFileSync(dataFile, JSON.stringify(eventCount, null, 2));
    console.log("✅ Data saved to eventData.json\n");
});

// 🧩 Step 4: Simulate user activity
emitter.emit("login", "Retesh");
emitter.emit("purchase", "Retesh", "T-Shirt", 25);
emitter.emit("profileUpdate", "Retesh");
emitter.emit("logout", "Retesh");


// 🏁 Step 5: Emit summary event
emitter.emit("summary");



// reteshkumarsharma@Reteshs-MacBook-Air events % node app.js
// Retesh logged in.
// Retesh purchased T-Shirt for $25.
// Retesh updated their profile.
// Retesh logged out.

// 📊 Event Summary:
// ┌───────────────┬────────┐
// │ (index)       │ Values │
// ├───────────────┼────────┤
// │ login         │ 14     │
// │ logout        │ 14     │
// │ purchase      │ 14     │
// │ profileUpdate │ 8      │
// └───────────────┴────────┘
// ✅ Data saved to eventData.json