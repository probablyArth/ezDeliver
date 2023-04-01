import twilio from "twilio";

const verifySid = process.env.TWILIO_VERIFY_SID;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOtp = (to: string) => {
  client.verify.v2.services(verifySid).verifications.create({
    to,
    channel: "sms",
  });
};

export const verifyOtp = async (to: string, otpCode: string) => {
  return client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to, code: otpCode })
    .then((check) => check.status as "pending" | "approved" | "canceled");
};
