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

import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

const db = dbClient.db(env.MONGODB_DATABASE_NAME);
const shorternerCollection = db.collection("urlShortener");

export const loadLinks = async () => {
    const links = await shorternerCollection.find({}).toArray();
    return links;
};

export const saveLinks = async (link) => {
    return await shorternerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortCode) => {
    return await shorternerCollection.findOne({ shortCode });
};
