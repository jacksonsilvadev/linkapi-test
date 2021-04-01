import {Request, Response, NextFunction} from 'express'
import logger from '../utils/logger'

const getStatus = (res: Response) => (`${String(res.statusCode || 500)}`
)

const getUrl = (req: Request) => req.originalUrl || req.url


export default (req: Request, res: Response, next: NextFunction) => {
    const startHrTime = process.hrtime()
    const url = getUrl(req)
    const statusCode = getStatus(res)

    const msg = `Requested to: ${statusCode} ${url}`

    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime)
        const elapsedTimeInMs = (elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6).toFixed(2)


        logger.info(`${msg} | duration: ${elapsedTimeInMs || 'unknown'}`)
    })
    next()
}
