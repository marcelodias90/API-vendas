import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import userRouter from '@modules/users/infra/http/controllers/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/controllers/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/controllers/routes/password.routes';
import profileRouter from '@modules/users/infra/http/controllers/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
