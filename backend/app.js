
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import {register} from "./controllers/userController.js";
import session from "express-session";

const app =express();
dotenv.config({path:'/etc/secrets/config.env'});
app.use(
    session({
     cookie: {
            secure: auto,
            sameSite:none,
            maxAge: 1000 * 60 * 60 * 3,
        },
    })
);
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods :['GET','POST','DELETE','PUT'],
    credentials :true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}));//simply string ki url encode kr deta h

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir :"/tmp/",
}));//multer

//app.post("/tush",register);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);

dbConnection();

app.use(errorMiddleware);



export default app;
