import { TaskStatus } from "@prisma/client";

export type Task = {
  title: string;
  description: string;
  status: TaskStatus;
  pomodoros?: number;
  completedAt?: Date;
};
