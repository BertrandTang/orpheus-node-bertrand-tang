import express from "express";
import * as woodController from "../controllers/wood.js";

const router = express.Router();

router.get("/", woodController.getAll);
router.get("/:hardness", woodController.readByHardness);

export default router;
