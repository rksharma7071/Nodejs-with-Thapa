import { Router } from "express";
import {
    getshortener,
    postshortener,
    getReport,
    getShortCode,
} from "../controller/postshortener.controller.js";

const router = Router();

export default function shortenerRoutes() {
    router.get("/", getshortener());
    router.post("/", postshortener());

    router.get("/report", getReport);

    router.get("/:shortCode", getShortCode());

    return router;
}
