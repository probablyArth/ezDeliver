import { Router } from "express";
import { prisma } from "..";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { sendOtp, verifyOtp } from "../services/otp";
import {
  createAndDeleteTokens,
  doesTokenExist,
  verifyRefreshJWT,
} from "../services/jwt";

const AuthRouter = Router();

AuthRouter.post(
  "/signup",
  validateRequest({
    body: z.object({
      phone: z.string().refine((phone) => isValidPhoneNumber(phone, "IN")),
      username: z.string(),
      otp: z.string().min(3),
    }),
  }),
  async (req, res) => {
    const { phone, username, otp } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          phone: parsePhoneNumber(phone, "IN").number,
        },
      });

      if (user) {
        return res
          .status(409)
          .json({ message: "User with that phone already exists" });
      }
      return await verifyOtp(parsePhoneNumber(phone, "IN").number, otp)
        .then((message) => {
          if (message === "approved") {
            return prisma.user
              .create({
                data: {
                  phone: parsePhoneNumber(phone, "IN").number,
                  username,
                },
              })
              .then(async (user) => {
                const { accessToken, refreshToken } =
                  await createAndDeleteTokens(user.id);
                return res
                  .status(201)
                  .json({ message: "User created", accessToken, refreshToken });
              })
              .catch((e: any) => {
                console.log(e.message);
                return res.sendStatus(500);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          
          res.status(403).json({ message: "Invalid otp" });
        });
    } catch (e: any) {
      console.error(e.message);
      return res.sendStatus(500);
    }
  }
);

AuthRouter.post(
  "/login",
  validateRequest({
    body: z.object({
      phone: z.string().refine((phone) => isValidPhoneNumber(phone, "IN")),
      otp: z.string().min(3),
    }),
  }),
  async (req, res) => {
    try {
      const { otp, phone } = req.body;
      const parsedPhoneNumber = parsePhoneNumber(phone, "IN").number;
      const user = await prisma.user.findFirst({
        where: {
          phone: parsedPhoneNumber,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }
      return verifyOtp(parsedPhoneNumber, otp)
        .then(async (message) => {
          if (message === "approved") {
            const { accessToken, refreshToken } = await createAndDeleteTokens(
              user.id
            );
            return res.json({ message: "success", accessToken, refreshToken });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(403).json({ message: "Invalid otp" });
        });
    } catch (e: any) {
      console.error(e.message);
      return res.sendStatus(500);
    }
  }
);

AuthRouter.post(
  "/refresh",
  validateRequest({
    body: z.object({
      refreshToken: z.string().min(64),
    }),
  }),
  async (req, res) => {
    const { refreshToken } = req.body;
    let userId: string;
    try {
      userId = (await verifyRefreshJWT(refreshToken)).id;
    } catch (e: any) {
      return res.status(401).json({ message: "Invalid refreshToken" });
    }
    try {
      const doesExist = await doesTokenExist(userId, refreshToken);
      if (!doesExist) {
        return res.status(404).json({ message: "Token not found" });
      }
      const { accessToken, refreshToken: newRefreshToken } =
        await createAndDeleteTokens(userId);
      return res
        .status(201)
        .json({ message: "success", accessToken, refreshToken });
    } catch (e: any) {
      console.error(e.message);
      return res.sendStatus(500);
    }
  }
);

AuthRouter.post(
  "/sendOtp",
  validateRequest({
    body: z.object({
      phone: z.string().refine((phone) => isValidPhoneNumber(phone, "IN")),
    }),
  }),
  (req, res) => {
    try {
      sendOtp(parsePhoneNumber(req.body.phone, "IN").number);
      return res.status(200).json({ message: "otp sent!" });
    } catch (e: any) {
      console.error(e.message);
      return res.sendStatus(500);
    }
  }
);

export default AuthRouter;
