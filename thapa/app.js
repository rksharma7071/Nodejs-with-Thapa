import express from "express";
import path from "path";
import { writeFile, readFile, mkdir } from "fs/promises";
import crypto from "crypto";
const app = express();
const PORT = 3000;
const DATA_DIR = "data";
const DATA_FILE = path.join(DATA_DIR, "links.json");

const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     // console.log("dirname", import.meta.dirname); // dirname C:\Users\retes\Desktop\NodeJS\thapa
//     // console.log("filename", import.meta.filename); // filename C:\Users\retes\Desktop\NodeJS\thapa\app.js
//     // console.log("url: ", import.meta.url); // url:  file:///C:/Users/retes/Desktop/NodeJS/thapa/app.js

//     const homePagePath = path.join(import.meta.dirname, "public", "index.html");

//     res.sendFile(homePagePath);
// });

app.get("/", (req, res) => {
    const homePagePath = path.join(import.meta.dirname, "public", "index.html");
    res.sendFile(homePagePath);
});

app.get("/test", (req, res) => {
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    console.log({ __dirname, __filename });

    res.send("This is a testing page!");
});

app.get("/profile/:username", (req, res) => {
    res.send(`<h1>My username is ${req.params.username}!</h1>`);
});

app.get("/profile/:username/article/:slug", (req, res) => {
    res.send(`<h1>My username is ${req.params.username}!</h1>
        <h2>Blog: ${req.params.slug}</h2>
        `);
});

app.get("/product", (req, res) => {
    console.log(req.query.search);
    res.send(`<h1>You searched for: ${req.query.search}</h1>`);
});

// app.get("/contact", (req, res)=> {
//     console.log(req.query);
//     res.redirect("/")
// })
app.post("/contact", (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

const loadLinks = async () => {
    try {
        await ensureDataDir();

        const data = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
};

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links), "utf-8");
};

const ensureDataDir = async () => {
    try {
        await mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
        console.error("Failed to create data directory:", error);
    }
};

app.get("/url-shortener", async (req, res) => {
    const filePath = path.join(
        import.meta.dirname,
        "views",
        "url-shortener.html"
    );
    const file = await readFile(filePath, "utf-8");
    const links = await loadLinks();
    const renderedLinks = Object.entries(links)
        .map(
            ([shortCode, url]) =>
                `<li><a href="/${shortCode}" target="_blank">${shortCode}</a> &rarr; ${url}</li>`
        )
        .join("");
    const content = file.replace("{{shortened_urls}}", renderedLinks);

    return res.send(content);
});

app.post("/url-shortener", async (req, res) => {
    try {
        const { url, shortCode } = req.body;

        const links = await loadLinks();

        const finalShortCode =
            shortCode || crypto.randomBytes(4).toString("hex");

        if (!url) {
            return res.status(400).send("URL is required!");
        }
        if (links[finalShortCode]) {
            return res
                .status(409)
                .send("Short code already exists. Please choose another.");
        }
        links[finalShortCode] = url;
        await saveLinks(links);
        return res.redirect("/url-shortener");
    } catch (error) {
        console.log("URL Short Error: ", error);
    }
});

app.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;
        const links = await loadLinks();
        if (!links[shortCode]) return res.status(404).send("404 error occur");
        return res.redirect(links[shortCode]);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});

app.use((req, res) => {
    return res
        .status(404)
        .sendFile(path.join(import.meta.dirname, "views", "404.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
