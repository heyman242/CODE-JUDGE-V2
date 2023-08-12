import { Router } from "express";
const router = Router();

import { Verdict, getStatus, showStats} from "../controllers/verdictController.js";

router.post("/:problemId/verdict", Verdict);
router.get("/status/:submissionId", getStatus);
router.get('/stats',showStats)

export default router;
