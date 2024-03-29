import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm'; //conectando com o ormconfig
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination); //importando o pagination(middleware)
app.use('/files', express.static(uploadConfig.directory)); //rota pro front acessar os file.
app.use(routes);

app.use(errors()); //error da validação do celebrate

//middleware pra tratamento de erro
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      });
    }
    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
);

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
