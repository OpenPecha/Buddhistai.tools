import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/prisma";

export const runtime = "nodejs"; // important

export async function GET() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return NextResponse.redirect(new URL("/auth/login", process.env.APP_BASE_URL));

  await db.user.upsert({
    where: { id: user.sub },
    update: {
      email: user.email ?? null,
      name: user.name ?? null,
      picture: user.picture ?? null,
    },
    create: {
      id: user.sub,
      email: user.email ?? null,
      name: user.name ?? null,
      picture: user.picture ?? null,
      role: "user",
      isAdmin: false,
    },
  });

  return NextResponse.redirect(new URL("/", process.env.APP_BASE_URL));
}
