import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    createNewItem,
    getAllItems,
    deleteItem,
    claimItem,
    getClaimedItems,
    getAllItem,
    getAllClaimedItems,
    approveClaim,
    rejectClaim,
    deleteItembyAdmin,
} from "../controllers/item.controller.js";

const router = Router();

router.route("/additem").post(
    verifyJWT,
    upload.array("images", 5),
    createNewItem
);

router.route("/getallitems").get(verifyJWT, getAllItems)
router.route("/getallitem").get(verifyJWT, getAllItem)
router.route("/deleteitem/:id").delete(verifyJWT, deleteItem);
router.route("/claim/:id").post(verifyJWT, claimItem);
router.route("/claimeditems").get(verifyJWT, getClaimedItems);
router.route("/getallclaimeditems").get(verifyJWT, getAllClaimedItems);
router.route("/approveClaim").post(verifyJWT, approveClaim);
router.route("/rejectclaim").post(verifyJWT, rejectClaim);
router.route("/deleteitembyadmin/:id").delete(verifyJWT, deleteItembyAdmin);

export default router;
