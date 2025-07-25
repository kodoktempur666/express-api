import { Router } from "express";
import { createUserSchema, usersTable, loginSchema } from "../../db/schema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js"; // Adjust the import path as necessary
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";


const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;

    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    user.password = undefined; // Do not return the password in the response

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;
        
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if (!user) {
            res.status(404).json({ message: "Authentication failed" });
            return;
        }

        const matched = await bcrypt.compare(password, user.password);

        if(!matched) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        user.password = undefined; // Do not return the password in the response

        const token = jwt.sign({ userId: user.id, role: user.role}, 'your-secret', {expiresIn: '30d'})
        res.status(200).json({ token, user})
        console.log({ email, password });
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
