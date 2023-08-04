import {Router} from 'express';
const router = Router();

import {
  addProblem,
  getProblem,
  getSingleProblem,
} from "../controllers/problemController.js";

router.route("/:userId").post(addProblem).get(getProblem);
router.route('/:userId/:problemId').get(getSingleProblem);







export default router;