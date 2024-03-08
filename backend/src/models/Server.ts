import express, { Application } from 'express';
// import cors from 'cors'
import morgan from 'morgan';
import session from "express-session";
import MongoStore from "connect-mongo";

import { notFound, errorHandler } from '../middleware/errorHandler';
// import { requestLogger } from '../middleware/requestLogger';
import db from '../db';
import routes from '../routes';

class Server {
  private readonly app: Application;
  private readonly port: string;

  constructor () {
    this.app = express();
    this.port = process.env.PORT ?? '5000';

    // Initial methods
    this.dbConnection().then(() => {
      this.middlewares();
      this.session();
      this.routes();
      this.errorMiddlewares();
    }).catch(err => console.error(err))
  }

  async dbConnection (): Promise<void> {
    try {
      // DB INIT
      await db();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares (): void {
    // CORS
    // this.app.use(cors());
    // JSON
    this.app.use(express.json());
    // LOGS
    // this.app.use(requestLogger); // <-- homemade
    this.app.use(morgan('dev')); // other options: 'common' | 'combined' | 'tiny'
  }

  session (): void {
    this.app.use(session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 60 * 60 * 1000,
      },
      rolling: true,
      store: MongoStore.create({
          mongoUrl: process.env.MONGO_CNN_STR!
      }),
  }));
  }

  errorMiddlewares (): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  routes (): void {
    this.app.use('/api', routes);
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`⚡️[app]: app is running at port: ${this.port}`);
    })
  }
}

export default Server;
