import {Router} from 'express';
const router = Router();

import {
  addProblem,
  getProblem,
  getSingleProblem,
} from "../controllers/problemController.js";

router.route("/").post(addProblem).get(getProblem);
router.route('/:problemId').get(getSingleProblem);







export default router;