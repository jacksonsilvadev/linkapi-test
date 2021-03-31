import {Request, Response, NextFunction} from 'express'
import logger from '../utils/logger'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    next(err)
}