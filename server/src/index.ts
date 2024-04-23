import express from 'express' 
import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import userRouter from './routes/user'
import todoRouter from './routes/todo'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

declare module 'express-session' {
    interface SessionData {
        user?: {
            userId: number,
            name: string,
            email: string
        } 
    }
}

const PORT = process.env.PORT 
const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT)
