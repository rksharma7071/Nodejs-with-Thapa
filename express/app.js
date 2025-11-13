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

app.get("/contact", (req, res) => {
    res.send(`<form id="shorten-form" autocomplete="off" method="post">
        <div>
          <label for="url">Enter URL</label>
          <input
            type="url"
            name="url"
            id="url"
            required
            placeholder="https://example.com/article"
          />
        </div>
        <div>
          <label for="shortCode">Enter Short Code (optional)</label>
          <input
            type="text"
            name="shortCode"
            id="shortCode"
            minlength="3"
            maxlength="24"
            pattern="[A-Za-z0-9-_]+"
            placeholder="e.g. my-link"
          />
        </div>
        <button type="submit" aria-label="Shorten URL">Shorten</button>
      </form>`);
});

app.listen(PORT, () => {
    console.log(`Server started → http://localhost:${PORT}/`);
});
