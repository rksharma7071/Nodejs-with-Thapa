// import { writeFile, readFile, mkdir } from "fs/promises";
// import path from "path";

// export const loadLinks = async (baseDir) => {
//     try {
//         await ensureDataDir(baseDir);

//         const data = await readFile(
//             path.join(baseDir, "data", "links.json"),
//             "utf-8"
//         );
//         return JSON.parse(data);
//     } catch (error) {
//         if (error.code === "ENOENT") {
//             await writeFile(
//                 path.join("data", "links.json"),
//                 JSON.stringify({})
//             );
//             return {};
//         }
//         throw error;
//     }
// };

// export const saveLinks = async (baseDir, links) => {
//     await writeFile(
//         path.join(baseDir, "data", "links.json"),
//         JSON.stringify(links),
//         "utf-8"
//     );
// };

// export const ensureDataDir = async (baseDir) => {
//     try {
//         await mkdir(path.join(baseDir, "data", "links.json"), {
//             recursive: true,
//         });
//     } catch (error) {
//         // console.error("Failed to create data directory:", error);
//     }
// };
import { db } from "../config/db-client.js";
// import { dbClient } from "../config/db-client.js";
// import { env } from "../config/env.js";

// const db = dbClient.db(env.MONGODB_DATABASE_NAME);
// const shorternerCollection = db.collection("urlShortener");

export const loadLinks = async () => {
    // const links = await shorternerCollection.find({}).toArray();
    const [links] = await db.query("select * from short_links");
    return links;
};

export const saveLinks = async ({ url, shortCode }) => {
    // return await shorternerCollection.insertOne(link);
    const [result] = await db.query(
        "insert into short_links (short_code, url) values(?,?)",
        [shortCode, url]
    );

    return result;
};

export const getLinkByShortCode = async (shortCode) => {
    // return await shorternerCollection.findOne({ shortCode });

    const [rows] = await db.query(
        `select * from short_links where short_code = ?`,
        [shortCode]
    );
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
};
