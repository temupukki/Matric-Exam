import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../../generated/prisma";
import * as dotenv from "dotenv";
import {getVerificationEmailTemplate} from "../Email"
import { sendEmail } from "./nodemailer";

dotenv.config();

const prisma = new PrismaClient();


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    
  },
     emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const emailTemplate = getVerificationEmailTemplate({ user, url });
      
      await sendEmail({
        to: user.email,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
      });
    },
    sendOnSignUp: true
  },

  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    },
  },
  user:{
        additionalFields:{
            role:{
                type:["USER","ADMIN","NATURAL","SOCIAL","BOTH"]
            }
        }
    },
  trustedOrigins:["http://localhost:5173"]
});


