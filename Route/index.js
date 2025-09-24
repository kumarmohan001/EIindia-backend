import express from 'express';
const routes = express.Router();
import auth from './auth.js'
import user from './user.js'

routes.use('/auth',auth)
routes.use('/user',user)

export default routes;