import { Handler } from "express";
import { getTokenFromAuthorizationHeader, verifyJWT } from "../services/jwt";
import { prisma } from "..";

const AuthMiddleware: Handler = async (req, res, next) => {
  const accessToken = getTokenFromAuthorizationHeader(
    req.headers.authorization as string
  );
  if (!accessToken) {
    return res
      .status(404)
      .json({ message: "accessToken not found", cause: "access_token" });
  }
  let userId: string;
  try {
    userId = (await verifyJWT(accessToken)).id;
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Invalid accessToken", cause: "access_token" });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res
      .status(404)
      .json({ message: "user not found", cause: "access_token" });
  }
  req.user = user;
  next();
};

export default AuthMiddleware;
