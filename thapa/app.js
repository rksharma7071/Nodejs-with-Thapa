import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    // console.log("dirname", import.meta.dirname); // dirname C:\Users\retes\Desktop\NodeJS\thapa
    // console.log("filename", import.meta.filename); // filename C:\Users\retes\Desktop\NodeJS\thapa\app.js
    // console.log("url: ", import.meta.url); // url:  file:///C:/Users/retes/Desktop/NodeJS/thapa/app.js

    // const __filename = new URL(import.meta.url);
    // const pathname = new URL(import.meta.url).pathname;
    // console.log(`${__filename}\n ${pathname}`);

    const homePagePath = path.join(import.meta.dirname, "public", "index.html");

    res.sendFile(homePagePath);
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
