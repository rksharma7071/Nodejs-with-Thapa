import express from "express";
import { PORT } from "./env.js";
const app = express();
// const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    // console.log(process.env);
    res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>Hello About Page!</h1>");
});
app.get("/test", (req, res) => {
    res.send("<h1>Hello About Page!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started → http://localhost:${PORT}/`);
});
