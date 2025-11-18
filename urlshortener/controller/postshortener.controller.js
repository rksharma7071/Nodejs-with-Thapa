import crypto from "crypto";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

export const postshortener = (baseDir) => {
    return async (req, res) => {
        try {
            const { url, shortCode } = req.body;

            if (!url) {
                return res.status(400).send("URL is required!");
            }

            const links = await loadLinks(baseDir);
            const finalShortCode =
                shortCode || crypto.randomBytes(4).toString("hex");

            if (links[finalShortCode]) {
                return res
                    .status(409)
                    .send("Short code already exists. Please choose another.");
            }

            links[finalShortCode] = url;
            await saveLinks(baseDir, links);
            return res.redirect("/");
        } catch (error) {
            console.error("URL Short Error:", error);
            return res.status(500).send("Internal Server Error");
        }
    };
};

export const getshortener = (baseDir) => {
    return async (req, res) => {
        try {
            const links = await loadLinks(baseDir);

            res.render("index", { links, host: req.host });
        } catch (error) {
            console.error("Error serving page:", error);
            return res.status(500).send("Internal Server Error");
        }
    };
};

export const getReport = (req, res) => {
    const student = [
        {
            name: "Aarav",
            grade: "10th",
            favoriteSubject: "Mathematics",
        },
        {
            name: "Inshita",
            grade: "9th",
            favoriteSubject: "Science",
        },
        {
            name: "Rohan",
            grade: "8th",
            favoriteSubject: "History",
        },
        {
            name: "Meera",
            grade: "10th",
            favoriteSubject: "English",
        },
        {
            name: "Kabir",
            grade: "11th",
            favoriteSubject: "Physics",
        },
    ];
    res.render("report", { student });
};

export const getShortCode = (baseDir) => async (req, res) => {
    try {
        const { shortCode } = req.params;

        const links = await loadLinks(baseDir);

        if (!links[shortCode])
            return res.status(404).send("Short URL not found.");

        return res.redirect(links[shortCode]);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
