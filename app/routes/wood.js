import express from "express";
import * as woodController from "../controllers/wood.js";
import auth from '../middlewares/auth.js';
import multer from '../middlewares/multer.js';

const router = express.Router();

router.get('/', auth, woodController.getAll);
router.get('/:hardness', auth, woodController.readByHardness);

router.post('/', auth, multer, woodController.createWood);

export default router;
