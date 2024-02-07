import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDb } from './connectDb.js';
import handleError from './middlewares/handleError.js';

// ? import routes
import productRouter from './routes/products/product.routes.js';
import userSignUpRoutes from './routes/users/signup/signup.routes.js';
import userSignInRoutes from './routes/users/signin/signin.routes.js';
import authMiddleware from './middlewares/handleAuth.js';
import validate from './middlewares/validatorInput.js';
import userValidationRules from './controllers/users/validations/user.validations.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));

//* auth routes
// ! route, validations constant, middleware, controller routes
/* puede funcionar en caso de que se necesite validar el input
en todos los endpoints de la ruta, en caso contrario, se puede hacer la validación en el controlador */
app.use('/api/auth/login', userValidationRules, validate, userSignInRoutes);
app.use('/api/auth', userValidationRules, validate, userSignUpRoutes);
// ? prducts routes
app.use('/api/products', authMiddleware, productRouter);

// Error handling middleware
app.use(handleError);

async function main() {
  try {
    await connectDb();
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start the application:', err);
    process.exit(1);
  }
}

main();
