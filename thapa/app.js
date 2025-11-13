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

    const homePagePath = path.join(import.meta.dirname, "public", "index.html");

    res.sendFile(homePagePath);
});

app.get("/test", (req, res) => {
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    console.log({ __dirname, __filename });

    res.send("This is a testing page!")
})

app.get("/profile/:username", (req, res) => {
    res.send(`<h1>My username is ${req.params.username}!</h1>`)
})

app.get("/profile/:username/article/:slug", (req, res) => {
    res.send(`<h1>My username is ${req.params.username}!</h1>
        <h2>Blog: ${req.params.slug}</h2>
        `)
})



app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
