const fs = require("fs");
const path = require("path");

const fileName = "test_sync.txt";
const filePath = path.join(__dirname, fileName);
console.log(filePath); // C:\Users\retes\Desktop\My Data\NodeJS\fs\test.txt

// try {
//   fs.writeFileSync(filePath, "Hello, Node.js!", "utf-8");
//   console.log("File written successfully!");
// } catch (err) {
//   console.error("Error writing file:", err);
// }

// try {
//   const data = fs.readFileSync(filePath, "utf8");
//   console.log("File contents:", data);
// } catch (err) {
//   console.error("Error reading file:", err);
// }

// try {
//   fs.appendFileSync(filePath, "\nAppending new line...",);
// } catch (error) {
//   console.error("Error updating file:", error);
// }
// Data appended!

// const newFileName = "newTest.txt";
// const newFilePath = path.join(__dirname, newFileName);

// try {
//   fs.renameSync(filePath, newFilePath);
//   console.log("File renamed successfully!");
// } catch (err) {
//   console.error("Error renaming file:", err);
// }
// File renamed successfully!

// try {
//   fs.unlinkSync(filePath);
//   console.log("File deleted successfully!");
// } catch (err) {
//   console.error("Error deleting file:", err);
// }


// const folderName = "myFolder";
// const folderPath = path.join(__dirname, folderName);

// try {
//   fs.mkdirSync(folderPath);
//   console.log("Folder created successfully!");
// } catch (err) {
//   if (err.code === "EEXIST") {
//     console.log("Folder already exists.");
//   } else {
//     console.error("Error creating folder:", err);
//   }
// }


// const folderPath = path.join(__dirname);
// try {

//   const files = fs.readdirSync(folderPath);
//   console.log("Files in folder:", files);
// } catch (error) {
//   if (error.code === "ENOENT") {
//     console.log("Folder does not exist!");
//   } else {
//     console.error("Error reading folder:", error);
//   }
// }

const folderName = "myFolder";
const folderPath = path.join(__dirname, folderName);
try {
  const stats = fs.statSync(folderPath);
  console.log("Stats object:", stats);

  if (stats.isDirectory()) {
    console.log(`${folderName} is a directory`);
  } else if (stats.isFile()) {
    console.log(`${folderName} is a file`);
  }
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("The path does not exist!");
  } else {
    console.error("Error checking path:", error);
  }
}