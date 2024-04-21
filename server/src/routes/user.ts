import express from 'express'
import { signinInput, signupInput } from '../../../common/dist'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config();
const prisma = new PrismaClient()
const SESSION_SECRET = process.env.SESSION_SECRET || ""

const userRouter = express()

userRouter.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

userRouter.get('/', (req, res) => {
    if(req.session && req.session.user) {
        return res.json({
            valid: true
        })
    }
    
    return res.json({
        valid: false
    })
})


userRouter.post('/signup', async (req, res) => {
    try {
        const body = req.body
        const validate = signupInput.safeParse(body)
        if(!validate.success) {
            res.status(411)
            return res.json({
                msg: "Invalid inputs"
            })
        }

        const existing = await prisma.user.findFirst({
            where: { email: body.email }
        })
    
        if(existing) {
            return res.status(411).json({
                msg: "User with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10)
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        })

        req.session.user = {
            userId: user.id,
            email: user.email,
            name: user.name,
        }

        res.status(200)
        return res.json({
            Signup: true,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name
            }
        })
    } catch(e) {
        console.log(e)
        return res.status(400).json({
            msg: "Error while Signing up"
        })
    }
})  

userRouter.post('/signin', async (req, res) => {
    try {
        const body = req.body
        const validate = signinInput.safeParse(body)
        if(!validate.success) {
            res.status(411) 
            return res.json({
                msg: "Invalid Inputs"
            })
        }

        const user = await prisma.user.findFirst({
            where: { email: body.email }
        })

        if(!user) {
            res.status(403)
            return res.json({
                msg: "User with this email does not exist"
            })
        }

        const passwordValidation = await bcrypt.compare(body.password, user.password)
        if(!passwordValidation) {
            return res.status(403).json({
                msg: "Incorrect password"
            })
        }

        req.session.user = {
            userId: user.id,
            name: user.name,
            email: user.email
        }

        return res.status(200).json({
            Signin: true,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name
            }
        })
    } catch(e) {
        console.log(e) 
        res.status(400).json({
            msg: "Error while Singning in"
        })
    }
})


userRouter.get('/signout', (req, res) => {
    res.clearCookie('connect.sid', { path: '/' })
    res.redirect('/api/v1/user/')
})

export default userRouter 