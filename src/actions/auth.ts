"use server";

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

export const onSignUpUser = async (data: {
  firstname: string;
  lastname: string;
  clerkId: string;
  image: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        clerkId: data.clerkId,
        image: data.image,
      },
    });

    return { status: 200, message: "User created successfully", data: user };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
};

export const onSignInUser = async (clerkId: string) => {
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (loggedInUser) {
      return {
        status: 200,
        message: "User successfully logged in",
        id: loggedInUser.id,
      };
    }

    return {
      status: 400,
      message: "User could not be logged in! Try again",
    };
  } catch (error) {
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    };
  }
};
