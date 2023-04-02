/// <reference path="./environment.d.ts" />

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import ApiRouter from "./router";

export const prisma = new PrismaClient();
config({ path: "./.env" });
console.log(process.env);

const seedVehicles = async () => {
  const vehicles = await prisma.vehicle.count({
    where: {
      OR: [
        {
          name: "small",
        },
        {
          name: "semi",
        },
        {
          name: "medium",
        },
        {
          name: "heavy",
        },
      ],
    },
  });
  if (vehicles === 0) {
    prisma.vehicle
      .createMany({
        data: [
          {
            name: "small",
            pricePerKm: 50,
            weightLimit: 50,
          },
          {
            name: "semi",
            pricePerKm: 100,
            weightLimit: 100,
          },
          {
            name: "medium",
            pricePerKm: 200,
            weightLimit: 200,
          },
          {
            name: "heavy",
            pricePerKm: 400,
            weightLimit: 500,
          },
        ],
      })
      .then(() => {
        console.log("Added vehicles.");
      });
  }
};

const seedOnce = async () => {
  const user = await prisma.user.create({
    data: {
      phone: "+919292929292",
      username: "ramlal",
    },
  });
  const smallVehicleId = await prisma.vehicle.findFirst({
    where: {
      name: "small",
    },
    select: {
      id: true,
    },
  });
  await prisma.delivery.create({
    data: {
      sellerId: user.id,
      bookingDate: new Date(),
      from: "191919",
      to: "202020",
      distance: 20,
      items: {
        createMany: {
          data: [
            {
              name: "Potato",
              weight: 10,
            },
            {
              name: "Mooli",
              weight: 20,
            },
          ],
        },
      },
      vehicleId: smallVehicleId?.id,
    },
  });
  console.log("User and delievery seed created");
};

const app = express();
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api", ApiRouter);

app.get("/", async (req, res) => {
  return res.json({ message: "hi" });
});

app.listen(PORT, async () => {
  console.log(`Server listening at ${PORT}`);
  await seedVehicles();
  // await seedOnce();
});
