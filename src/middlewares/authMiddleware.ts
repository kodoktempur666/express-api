import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, 'your-secret');
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ error: 'Access denied' });
            return;
        }
        req.userId = decoded.userId; // Assuming userId is a number
        req.role = decoded.role; // Assuming role is also part of the token payload
        // You can also set req.role if needed, e.g. req.role = decoded.role
        next();
    } catch (e) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role

    if (role !== 'seller') {
        res.status(401).json({ error: 'Access denied' });
        return;
    }
    next()
    
}