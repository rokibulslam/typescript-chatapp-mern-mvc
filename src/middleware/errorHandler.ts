import { NextFunction, Request, Response } from "express"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - $${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err:any, req:Request, res:Response) => {
    const statuCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statuCode);
    res.json({
        message: err.message,
        stack:process.env.NODE_ENV ==="production"? null:err.stack
    })
}