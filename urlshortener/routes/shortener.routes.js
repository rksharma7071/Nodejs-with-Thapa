import { Router } from "express";
import {
    getshortener,
    postshortener,
    getReport,
    getShortCode,
} from "../controller/postshortener.controller.js";

const router = Router();

export default function shortenerRoutes(baseDir) {
    router.get("/", getshortener(baseDir));
    router.post("/", postshortener(baseDir));

    router.get("/report", getReport);

    router.get("/:shortCode", getShortCode(baseDir));

    return router;
}
