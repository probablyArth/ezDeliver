import { Router } from "express";
import AuthRouter from "./auth";

const ApiRouter = Router();

ApiRouter.use("/auth", AuthRouter);

export default ApiRouter;
