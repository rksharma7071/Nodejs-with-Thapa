import crypto from "crypto";
import {
    getLinkByShortCode,
    loadLinks,
    saveLinks,
} from "../models/shortener.model.js";

export const postshortener = () => {
    return async (req, res) => {
        try {
            const { url, shortCode } = req.body;

            if (!url) {
                return res.status(400).send("URL is required!");
            }

            const finalShortCode =
                shortCode || crypto.randomBytes(4).toString("hex");

            // check if shortCode exists in DB
            const existing = await getLinkByShortCode(finalShortCode);
            if (existing) {
                return res
                    .status(409)
                    .send("Short code already exists. Please choose another.");
            }

            // save to DB
            // console.log({
            //     url,
            //     finalShortCode,
            // });

            await saveLinks({
                url,
                shortCode: finalShortCode,
            });

            return res.redirect("/");
        } catch (error) {
            console.error("URL Short Error:", error);
            return res.status(500).send("Internal Server Error");
        }
    };
};

export const getshortener = () => {
    return async (req, res) => {
        try {
            const links = await loadLinks();
            res.render("index", { links, host: req.get("host") });
        } catch (error) {
            console.error("Error serving page:", error);
            return res.status(500).send("Internal Server Error");
        }
    };
};

export const getReport = async (req, res) => {
    const links = await loadLinks();
    res.render("report", { links, host: req.get("host") });
};

export const getShortCode = () => async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await getLinkByShortCode(shortCode);

        if (!link) return res.status(404).send("Short URL not found.");

        return res.redirect(link.url);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
