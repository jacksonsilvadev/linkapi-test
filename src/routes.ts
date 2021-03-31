import {Router, Request, Response} from 'express';

const routes = Router()

routes.get('/', (req: Request, res: Response): Response => {
    throw new Error('teste')
    // return res.json({
    //     message: "LinkApi!"
    // })
})

export default routes