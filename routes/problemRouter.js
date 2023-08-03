import {Router} from 'express';
const router = Router();

import {addProblem} from '../controllers/problemController.js'

router.route('/').post(addProblem)







export default router;