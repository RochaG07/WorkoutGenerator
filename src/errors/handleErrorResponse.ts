import { Response } from "express";
import AppError from "./AppError";


export default function handleErrorResponse(error: any, response: Response): Response{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.log(error);

    return response.status(500).json({ 
        status: 'error',
        message: 'Internal server error',
    });

}