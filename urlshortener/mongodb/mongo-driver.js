import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

await client.connect();

const db = client.db("thapa");

const thepaCollection = db.collection("thapa");

// thepaCollection.insertOne({ name: "Pavan", age: 20, course: "B.Tech." });

// thepaCollection.insertMany([
//     { name: "Nisha", age: 20, course: "B.Com." },
//     { name: "Vikas", age: 24, course: "B.Tech." },
//     { name: "Prerna", age: 19, course: "B.A." },
//     { name: "Harsh", age: 22, course: "BCA" },
//     { name: "Divya", age: 21, course: "BBA" },
//     { name: "Sarthak", age: 20, course: "B.Sc." },
//     { name: "Tanya", age: 23, course: "B.Tech." },
// ]);

// const usersCursor = await thepaCollection.find({ course: "B.Tech." }).toArray();
// const usersCursor1 = await thepaCollection.findOne({name:"Ritika"});
// console.log(usersCursor1._id.toHexString());

// console.log("usersCursor: ", usersCursor);

// for (const user of usersCursor) {
// }
// console.log(usersCursor);

// await thepaCollection.updateOne({ name: "Ritika" }, { $set: { age: 23 } });
// const result = await thepaCollection.updateMany(
//     { course: "BBA" },
//     { $set: { course: "Bachelor of Business Administration" } }
// );
// if (result.matchedCount === 0) {
//     console.log("❌ No matching user found for update.");
// } else {
//     console.log(`✅ ${result.matchedCount} User updated successfully.`);
// }

// await thepaCollection.deleteOne({ name: "Ritika" });
const result = await thepaCollection.deleteMany({ course: "B.Com." });
console.log(`${result.deletedCount} documents deleted`);
