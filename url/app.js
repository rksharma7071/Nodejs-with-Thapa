import { writeFile, readFile, mkdir } from "fs/promises";
import { createServer } from "http";
import path from "path";
import crypto from "crypto";

const PORT = 3000;
const DATA_DIR = "data";
const DATA_FILE = path.join(DATA_DIR, "links.json");

const ensureDataDir = async () => {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error("Failed to create data directory:", error);
  }
};

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    switch (contentType) {
      case "text/html":
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<!doctype html><h1>404 - Page Not Found</h1>");
        break;
      case "text/css":
        res.writeHead(404, { "Content-Type": "text/css" });
        res.end("/* 404 - File Not Found */");
        break;
      case "text/javascript":
        res.writeHead(404, { "Content-Type": "application/javascript" });
        res.end("// 404 - File Not Found");
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - File Not Found");
        break;
    }
  }
};

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

const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/")
      return serveFile(res, path.join("public", "index.html"), "text/html");
    else if (req.url === "/style.css")
      return serveFile(res, path.join("public", "style.css"), "text/css");
    else if (req.url === "/script.js")
      return serveFile(res, path.join("public", "script.js"), "text/javascript");
    else if(req.url === "/links"){
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    } else {
      const links = await loadLinks();
      const shortCode = req.url.slice(1);
      console.log("links redirect: ", req.url);
      console.log("links redirect: ", links[shortCode]);
      if(links[shortCode]){
        res.writeHead(302, {location: links[shortCode]});
        return res.end();
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Shortened URL is not found");
    }
  }
  if (req.method === "POST" && req.url === "/shorten") {
    const links = await loadLinks();
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Invalid JSON body");
      }
      const { url, shortCode } = parsed;

      if (!url) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is required!");
      }
      const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
      if (links[finalShortCode]) {
        res.writeHead(409, { "Content-Type": "text/plain" });
        return res.end("Short code already exists. Please choose another.");
      }
      links[finalShortCode] = url;
      await saveLinks(links);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode }));
    });
    return;
  }
  if (req.method === "GET" || req.method === "POST") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not Found");
  }
  res.writeHead(405, {
    "Content-Type": "text/plain",
    "Allow": "GET, POST",
  });
  res.end("Method Not Allowed");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
