"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const daily_doer_1 = require("@sundaram_11/daily-doer");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const todoRouter = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
todoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validate = daily_doer_1.createTodoInput.safeParse(body);
    if (!validate.success) {
        return res.status(411).json({
            msg: "Invalid Inputs"
        });
    }
    try {
        const todo = yield prisma.todo.create({
            data: {
                userId: body.userId,
                title: body.title,
                description: body.description,
                status: body.status,
                priority: body.priority,
                createdAt: new Date(),
                dueDate: body.dueDate
            }
        });
        res.status(200).json({
            id: todo.id
        });
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: "Error while creating Todo"
        });
    }
}));
todoRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validate = daily_doer_1.updateTodoInput.safeParse(body);
    if (!validate.success) {
        return res.status(403).json({
            msg: "Invalid Inputs"
        });
    }
    try {
        const todo = yield prisma.todo.update({
            where: { id: body.todoId },
            data: {
                title: body.title,
                description: body.description,
                status: body.status,
                priority: body.priority,
                dueDate: body.dueDate
            }
        });
        return res.status(200).json({
            id: todo.id
        });
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: "Error while updating Todo"
        });
    }
}));
todoRouter.get('/todos/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const todos = yield prisma.todo.findMany({
            where: { userId: userId },
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                dueDate: true
            }
        });
        return res.status(200).json({
            todos
        });
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: "Error while fetching Todos"
        });
    }
}));
todoRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoId = Number(req.params.id);
        const todo = yield prisma.todo.findFirst({
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
        });
        return res.status(200).json({
            todo
        });
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: "Error while details of Todo"
        });
    }
}));
todoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params.id);
    try {
        yield prisma.todo.delete({
            where: { id: todoId }
        });
        return res.status(200).json({
            msg: "Todo deleted successfully"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(411).json({
            msg: "Error while deleting Todo"
        });
    }
}));
exports.default = todoRouter;
