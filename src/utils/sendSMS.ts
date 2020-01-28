import Twilio from "twilio";
const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// 어떤 내용이라도 특정 번호에 보내는 메소드
const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};

// Verification key에 대한 내용을 특정 번호에 보내는 메소드. 내부적으로 sendSMS이용
export const sendVeificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is : ${key}`);
