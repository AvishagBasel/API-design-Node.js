import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    req.answer_form_middleWare = 'passed in middlware'
    next()
}) 

app.get('/', (req,res)=>{
    console.log(req.answer_form_middleWare)
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api',protect,router)

app.post(
'/user',
body('username').notEmpty().isString(),
body('password').notEmpty().isString(),
handleInputErrors,
createNewUser)

app.post(
'/signin',
body('username').isString(),
body('password').isString(),
handleInputErrors,
signin)

app.use((err,req,res,next)=>{
    if(err.type === 'auth'){
        res.status(401).json({message:"Username already exists."})
    }
    else{
        res.status(500).json({ message: `An error occurred: ${err.message}`})
    }
})

export default app