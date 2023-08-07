import { Router } from "express";
const router = Router();

import { Verdict, getStatus} from "../controllers/verdictController.js";

router.post("/:problemId/verdict", Verdict);
router.get("/status/:submissionId", getStatus);

export default router;
