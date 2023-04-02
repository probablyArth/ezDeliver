import { Router } from "express";
import { prisma } from "..";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";

const DelieveryRouter = Router();

DelieveryRouter.get("/", async (req, res) => {
  try {
    const deliveries = await prisma.delievery.findMany({
      where: {
        sellerId: req.user.id,
      },
    });
    return res.json({ deliveries });
  } catch (error) {
    res.sendStatus(500);
  }
});

DelieveryRouter.post(
  "/",
  validateRequest({
    body: z.object({
      vehicleId: z.string().refine(
        async (vehicleId) =>
          await prisma.vehicle.findUnique({
            where: {
              id: vehicleId,
            },
          })
      ),
      bookingDate: z.date(),
      items: z.array(z.object({ name: z.string(), weight: z.number() })),
      distance: z.number(),
      from: z.string(),
      to: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const { bookingDate, distance, items, vehicleId, from, to } = req.body;

      const delievery = await prisma.delievery.create({
        data: {
          bookingDate,
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
      return res.status(201).json({ delievery });
    } catch (e: any) {
      return res.sendStatus(500);
    }
  }
);

export default DelieveryRouter;
