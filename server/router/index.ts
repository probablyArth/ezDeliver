import { Router } from "express";
import AuthRouter from "./auth";
import AuthMiddleware from "../middlewares/authMiddleware";
import DelieveryRouter from "./delievery";

const ApiRouter = Router();

ApiRouter.use("/auth", AuthRouter);
ApiRouter.use("/delievery", AuthMiddleware, DelieveryRouter);

export default ApiRouter;
