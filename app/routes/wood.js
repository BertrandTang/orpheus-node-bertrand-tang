import express from "express";
import * as woodController from '../controllers/wood.js';

const router = express.Router();

router.get("/", woodController.getAllWoods);

export default router;
