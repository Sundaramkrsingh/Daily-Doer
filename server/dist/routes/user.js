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
const dist_1 = require("../../../common/dist");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const SESSION_SECRET = process.env.SESSION_SECRET || "";
const userRouter = (0, express_1.default)();
userRouter.use((0, express_session_1.default)({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
userRouter.get('/', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({
            valid: true
        });
    }
    return res.json({
        valid: false
    });
});
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const validate = dist_1.signupInput.safeParse(body);
        if (!validate.success) {
            res.status(411);
            return res.json({
                msg: "Invalid inputs"
            });
        }
        const existing = yield prisma.user.findFirst({
            where: { email: body.email }
        });
        if (existing) {
            return res.status(411).json({
                msg: "User with this email already exists"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        const user = yield prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });
        req.session.user = {
            userId: user.id,
            email: user.email,
            name: user.name,
        };
        res.status(200);
        return res.json({
            Signup: true,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "Error while Signing up"
        });
    }
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const validate = dist_1.signinInput.safeParse(body);
        if (!validate.success) {
            res.status(411);
            return res.json({
                msg: "Invalid Inputs"
            });
        }
        const user = yield prisma.user.findFirst({
            where: { email: body.email }
        });
        if (!user) {
            res.status(403);
            return res.json({
                msg: "User with this email does not exist"
            });
        }
        const passwordValidation = yield bcrypt_1.default.compare(body.password, user.password);
        if (!passwordValidation) {
            return res.status(403).json({
                msg: "Incorrect password"
            });
        }
        req.session.user = {
            userId: user.id,
            name: user.name,
            email: user.email
        };
        return res.status(200).json({
            Signin: true,
            user: {
                userId: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "Error while Singning in"
        });
    }
}));
userRouter.get('/signout', (req, res) => {
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/api/v1/user/');
});
exports.default = userRouter;
