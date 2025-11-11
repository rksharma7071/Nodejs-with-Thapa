const fs = require("fs");
const path = require("path");

const fileName = "test.txt";
const filePath = path.join(__dirname, fileName);
const date = Date();

// console.log(filePath);

const createFile = (filePath, data) => {
  fs.writeFile(filePath, "This is the new content!", "utf-8", (err) => {
    if (err) console.log("File Creation Error: ", err);
    else console.log("FIle has successfully created!");
  });
};

const readFile = (filePath) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("File Read Error:", err);
    }
    else {
      console.log("File has been read successfully!");
      console.log("File content:", data); // ✅ Access file data here
    }
  });
};

const updateFile = (filePath, data = "\nThis is the updated data!") => {
  fs.appendFile(filePath, data, (err) => {
    if (err) console.error("File Update Error:", err);
    else console.log("File has been updated successfully!");
  });
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("File Deletion Error: ", err);
    } else {
      console.log("File has been deleted successfully!");
    }
  });
};
// createFile(filePath, "This is the new content!");
// readFile(filePath);
updateFile(filePath, `\nDate ${date}`);
// deleteFile(filePath);


