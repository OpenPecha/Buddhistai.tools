"use server";
import {db} from '@/lib/prisma'
import { auth0 } from "@/lib/auth0";
export const getUserProfile = async (): Promise<any> => {
  const session = await auth0.getSession();

  const user=await db.user.findUnique({
    where: {
      id: session?.user?.sub,
    },
  });
  if (!user) {
    throw new Error(`User not found`);
  }
  return user;
};
