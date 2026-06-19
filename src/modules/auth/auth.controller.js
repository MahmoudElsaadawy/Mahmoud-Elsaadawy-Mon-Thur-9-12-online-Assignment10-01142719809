import { Router } from "express";
import { signUp, login } from "./auth.service.js";

const router = Router()

router.post("/signup", signUp)
router.post("/login", login)

export default router