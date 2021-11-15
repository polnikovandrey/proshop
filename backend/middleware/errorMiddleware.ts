import { NextFunction, Request, Response } from "express";
import { ErrorRequestHandler, RequestHandler } from "express-serve-static-core";

export const notFoundHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    const error: Error = new Error(`Not found url: ${request.originalUrl}`);
    response.status(404);
    next(error);
};

export const errorHandler: ErrorRequestHandler = (error : { statusCode: number, message: string, stack: string }, request: Request, response: Response, next: NextFunction) => {
    const statusCode: number = response.statusCode === 200 ? 500 : response.statusCode;
    response.status(statusCode);
    response.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
};