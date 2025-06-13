import { Router } from 'express';
import { getComments, addComment } from '../controllers/comments.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/getallcomments/:item').get(verifyJWT, getComments);
router.route('/addcomment/:item').post(verifyJWT, addComment);

export default router;