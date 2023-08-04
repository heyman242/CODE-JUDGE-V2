import {Router} from 'express';
const router = Router();

import { Verdict } from '../controllers/verdictController.js';

router.post("/:userId/:problemId/verdict", Verdict);



export default router;
