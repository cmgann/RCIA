import { Router } from "express";

import { createTodo } from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

// router.post("/");

router.patch("/:id");

router.delete("/:id");

export default router;
