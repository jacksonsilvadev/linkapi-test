import {Router} from 'express';

const routes = Router()

routes.get('/', () => {
    return {message: "LinkApi!"}
})

export default routes