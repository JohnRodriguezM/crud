import { Router } from 'express';
import signUpUser from '../../../controllers/users/signup/signup.controller.js';

const router = Router();

router.post('/signup', signUpUser);

export default router;
