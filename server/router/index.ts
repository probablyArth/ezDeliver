import { Router } from "express";
import AuthRouter from "./auth";
import AuthMiddleware from "../middlewares/authMiddleware";
import DeliveryRouter from "./delievery";
import VehicleRouter from "./vehicle";

const ApiRouter = Router();

ApiRouter.use("/auth", AuthRouter);
ApiRouter.use("/delievery", AuthMiddleware, DeliveryRouter);
ApiRouter.use("/vehicle", AuthMiddleware, VehicleRouter);

export default ApiRouter;
