import { Router } from "express";
import { prisma } from "..";

const VehicleRouter = Router();

VehicleRouter.get("/", async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    return res.json({ vehicles });
  } catch (e: any) {
    console.log(e.message);
    return res.sendStatus(5000);
  }
});

export default VehicleRouter;
