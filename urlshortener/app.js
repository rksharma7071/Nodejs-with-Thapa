import express from "express";
import router from "./routes/shortener.routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const staticPath = path.join(import.meta.dirname, "public");

app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const baseDir = import.meta.dirname;

app.use("/", router(baseDir));

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
