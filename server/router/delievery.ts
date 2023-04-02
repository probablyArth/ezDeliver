import { Router } from "express";
import { prisma } from "..";
import { validateRequest } from "zod-express-middleware";
import { string, z } from "zod";

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
      vehicleId: z.string(),
      bookingDate: z.date(),
      items: z.array(z.object({ name: z.string(), weight: z.number() })),
    }),
  }),
  (req, res) => {
    //create a delievery
  }
);

export default DelieveryRouter;
