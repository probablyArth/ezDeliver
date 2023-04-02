import { Router } from "express";
import AuthRouter from "./auth";
import AuthMiddleware from "../middlewares/authMiddleware";
import DeliveryRouter from "./delievery";

const ApiRouter = Router();

ApiRouter.use("/auth", AuthRouter);
ApiRouter.use("/delievery", AuthMiddleware, DeliveryRouter);
ApiRouter.use("/vehicle", AuthMiddleware, DeliveryRouter);

export default ApiRouter;
