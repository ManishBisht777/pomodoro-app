"use server";

import { Task } from "@/common/interfaces/task";
import prisma from "@/utils/db";
import { getAuthenticatedUser } from "./auth";

export const saveTask = async (task: Task) => {
  try {
    const user = await getAuthenticatedUser();

    if (!user.data?.id) return { status: 401, message: "Unauthorized" };

    const newTask = await prisma.task.create({
      data: {
        ...task,
        userId: user.data.id,
        createdAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });

    if (newTask) {
      return {
        status: 200,
        message: "Task created successfully",
        task: newTask,
      };
    }

    return { status: 400, message: "Task could not be created" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal server error" };
  }
};
