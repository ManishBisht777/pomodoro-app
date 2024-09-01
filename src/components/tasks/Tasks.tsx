import { Task } from "@/common/interfaces/task";
import { useState } from "react";
import AddTask from "./AddTask";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

interface TasksProps {}
// coments
export default function Tasks({}: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <div className="flex justify-between items-center">
          <p>Tasks</p>
          <AddTask tasks={tasks} setTasks={setTasks} />
        </div>
        <Separator className="mt-4" />
      </div>
      <div>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <>
              <div key={task.id} className="flex gap-1">
                <Checkbox
                  className="rounded-full m-[.3rem]"
                  checked={task.completed}
                  onClick={() => {
                    setTasks(
                      tasks.map((t) => {
                        if (t.id === task.id) {
                          return {
                            ...t,
                            completed: !t.completed,
                          };
                        }
                        return t;
                      })
                    );
                  }}
                />
                <div>
                  <span className="text-sm">{task.name}</span>
                  <p className="text-xs text-gray-700">{task.description}</p>
                </div>
              </div>
              <Separator className="my-3" />
            </>
          ))}
      </div>

      {/* <div className="flex flex-col justify-center text-center items-center">
        <Image
          src="/images/mind.png"
          width={200}
          height={200}
          alt="Peaceful mind"
        />
        <div className="space-y-1">
          <p className="font-medium">Your peace of mind is priceless</p>
          <p className="text-sm text-gray-600 max-w-64">
            Well done! All your tasks are organized in the right place.
          </p>
        </div>
      </div> */}
    </div>
  );
}
