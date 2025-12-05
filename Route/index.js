import express from 'express';
const routes = express.Router();
import auth from './auth.js'
import user from './user.js'
import home from './home.js'

routes.use('/home',home)

routes.use('/auth',auth)
routes.use('/user',user)

export default routes;