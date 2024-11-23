// Import necessary libraries
import { Router } from 'express';
import { signupValidation, signinValidation } from '../middlewares/validation.js';
import { signup, signin } from '../controllers/authController.js';


// Initialize the router
const router = Router();

router.post('/signup', signupValidation, signup); 
router.post('/signin', signinValidation, signin); 

// Export router as the default export
export default router;
