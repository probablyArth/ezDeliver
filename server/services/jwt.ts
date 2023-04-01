import { sign, verify } from "jsonwebtoken";
import { prisma } from "..";

export const createJWTtoken = (id: string) => {
  return sign({ id }, process.env.JWT_SIGNING_KEY, {
    expiresIn: parseInt(process.env.JWT_EXPIRY, 10),
  });
};

export const createRefreshJWTtoken = (id: string) => {
  return sign({ id }, process.env.REFRESH_JWT_SIGNING_KEY);
};

export const verifyJWT = async (token: string): Promise<{ id: string }> =>
  verify(token, process.env.JWT_SIGNING_KEY) as { id: string };

export const verifyRefreshJWT = async (
  token: string
): Promise<{ id: string }> =>
  verify(token, process.env.REFRESH_JWT_SIGNING_KEY) as { id: string };

export const createAndDeleteTokens = async (id: string) => {
  await prisma.token.deleteMany({
    where: {
      userId: id,
    },
  });
  const accessToken = createJWTtoken(id);
  const refreshToken = createRefreshJWTtoken(id);
  await prisma.token.create({
    data: { userId: id, token: refreshToken },
  });
  return { accessToken, refreshToken };
};

export const doesTokenExist = async (id: string, token: string) => {
  const user = await prisma.token.findFirst({
    where: {
      token,
      userId: id,
    },
  });
  return Boolean(user);
};

export const getTokenFromAuthorizationHeader = (headerValue: string): string =>
  headerValue.replace("Bearer ", "");
