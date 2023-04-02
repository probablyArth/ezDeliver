import { Router } from "express";
import { prisma } from "..";
import { validateRequest } from "zod-express-middleware";
import { date, z } from "zod";

const DeliveryRouter = Router();

DeliveryRouter.get("/", async (req, res) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      where: {
        sellerId: req.user.id,
      },
    });
    return res.json({ deliveries });
  } catch (error) {
    res.sendStatus(500);
  }
});

DeliveryRouter.post(
  "/",
  validateRequest({
    body: z.object({
      vehicleId: z.string(),
      items: z.array(z.object({ name: z.string(), weight: z.number() })),
      distance: z.number(),
      from: z.string(),
      to: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const { distance, items, vehicleId, from, to } = req.body;

      const delivery = await prisma.delivery.create({
        data: {
          bookingDate: new Date(),
          distance,
          sellerId: req.user.id,
          vehicleId,
          items: {
            createMany: {
              data: items,
            },
          },
          from,
          to,
        },
      });
      return res.status(201).json({ delivery });
    } catch (e: any) {
      return res.sendStatus(500);
    }
  }
);

export default DeliveryRouter;
