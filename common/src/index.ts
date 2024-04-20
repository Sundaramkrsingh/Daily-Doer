import z from "zod"

export const signupInput = z.object({
    name: z.string().min(5, { message: "Name must contain 5 characters" }),
    email: z.string().email(),
    password: z.string()
                .min(8, { message: "Password must contain 8 characters" })
                .max(50, { message: "Password must not exceed 50 characters" })
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character" })
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const createTodoInput = z.object({
    userId: z.number(),
    title: z.string().max(30),
    description: z.string().max(80),
    status: z.enum(["Pending", "Started", "Done"]),
    priority: z.enum(["High", "Moderate", "Normal"]),
    dueDate: z.string()
})

export const updateTodoInput = z.object({
    userId: z.number(),
    todoId: z.number(),
    title: z.string().max(30),
    description: z.string().max(80),
    status: z.enum(["Pending", "Started", "Done"]),
    priority: z.enum(["High", "Moderate", "Normal"]),
    dueDate: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateTodoInput = z.infer<typeof createTodoInput>
export type UpdateTodoInput = z.infer<typeof updateTodoInput>