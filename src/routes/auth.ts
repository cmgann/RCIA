import { Router } from "express";

import { authenticateToken, signIn, register } from "../controllers/auth";

const router = Router();

router.post("/register", register);

router.post("/signin", signIn);

router.get("/", authenticateToken);

router.patch("/:id");

router.delete("/:id");

export default router;
