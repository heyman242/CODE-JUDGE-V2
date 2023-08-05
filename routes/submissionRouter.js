import { Router } from "express";
const router = Router();

import { Verdict, getStatus} from "../controllers/verdictController.js";

router.post("/:userId/:problemId/verdict", Verdict);
router.get("/:userId/:problemId/status", getStatus);

export default router;
