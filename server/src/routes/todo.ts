import express from 'express'
import { createTodoInput, updateTodoInput } from '../../../common/dist'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config();

const todoRouter = express()
const prisma = new PrismaClient()

todoRouter.post('/', async (req, res) => {
    const body = req.body
    const validate = createTodoInput.safeParse(body)
    if(!validate.success) {
        return res.status(411).json({
            msg: "Invalid Inputs"
        })
    }

    try {
        const todo = await prisma.todo.create({
            data: {
                userId: body.userId,
                title: body.title,
                description: body.description,
                status: body.status,
                priority: body.priority,
                createdAt: new Date(),
                dueDate: body.dueDate
            }
        })

        res.status(200).json({
            id: todo.id
        })
    } catch(e) {
        console.log(e) 
        return res.status(411).json({
            msg: "Error while creating Todo"
        })
    }
})


todoRouter.put('/', async (req, res) => {
    const body = req.body
    const validate = updateTodoInput.safeParse(body)
    if(!validate.success) {
        return res.status(403).json({
            msg: "Invalid Inputs"
        })
    }

    try {
        const todo = await prisma.todo.update({
            where: { id: body.todoId },
            data: {
                title: body.title,
                description: body.description,
                status: body.status,
                priority: body.priority,
                dueDate: body.dueDate
            }
        })

        return res.status(200).json({
            id: todo.id
        })
    } catch(e) {
        console.log(e)
        return res.status(411).json({
            msg: "Error while updating Todo"
        })
    }
})


todoRouter.get('/todos/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId)
        const todos = await prisma.todo.findMany({
            where: { userId: userId }, 
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                dueDate: true
            }
        })
    
        return res.status(200).json({
            todos
        })
    } catch(e) {
        console.log(e)
        return res.status(411).json({
            msg: "Error while fetching Todos"
        })
    }
})


todoRouter.get('/:id', async (req, res) => {
    try {
        const todoId = Number(req.params.id)
        const todo = await  prisma.todo.findFirst({
            where: { id: todoId },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                createdAt: true,
                dueDate: true
            }
        })

        return res.status(200).json({
            todo
        })
    } catch(e) {
        console.log(e)
        return res.status(411).json({
            msg: "Error while details of Todo"
        })
    }
})


todoRouter.delete('/:id', async (req, res) => {
    const todoId = Number(req.params.id)
    
    try {
        await prisma.todo.delete({
            where: { id: todoId }
        })

        return res.status(200).json({
            msg: "Todo deleted successfully"
        })
    } catch(e) {
        console.log(e)
        return res.status(411).json({
            msg: "Error while deleting Todo"
        })
    }
})

export default todoRouter