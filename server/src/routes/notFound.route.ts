import { Router } from 'express';
import ErrorController from '../controllers/notFound.controller.js';

class NotFoundRoute {
  public path = '*';
  public router = Router({ strict: true });
  public errorController: ErrorController;

  constructor() {
    this.errorController = new ErrorController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.errorController.pageNotFound);
  }
}

export default NotFoundRoute;
