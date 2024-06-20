import express from "express"
import {
   userRegister,
   login,
} from "../controllers/userController.js"

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', login);

export default router;