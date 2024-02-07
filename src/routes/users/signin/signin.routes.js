import { Router } from 'express';
import signInUser from '../../../controllers/users/signin/signin.controller.js';

const router = Router();

router.post('/sign_in', signInUser);

export default router;
