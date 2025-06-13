import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'
import {
    getAllCategories,
    addCategory
} from '../controllers/category.controller.js';

const router = Router();

router.route("/getallcategories").get(verifyJWT, getAllCategories);
router.route("/addcategory").post(verifyJWT, addCategory);

export default router;