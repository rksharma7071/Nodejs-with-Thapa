import "dotenv/config";
import express from "express";
import router from "./routes/shortener.routes.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const PORT = process.env.PORT || 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = __dirname;

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.use("/", router());

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
