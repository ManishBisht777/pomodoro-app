import prisma from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAuthenticatedUser = async () => {
  try {
    const userSession = await currentUser();

    if (!userSession) return { status: 401, message: "Unauthorized" };

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userSession.id,
      },
    });

    return { status: 200, data: user };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};
