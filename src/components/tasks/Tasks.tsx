import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

interface TasksProps {}

type Task = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

export default function Tasks({}: TasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [inputValue, setInputValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        name: inputValue,
        description: descriptionValue,
        completed: false,
      },
    ]);
    setInputValue("");
    setDescriptionValue("");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p>Tasks</p>

      <div>
        <button className="w-full flex border border-dashed rounded-md justify-center p-4">
          <Plus size={24} />
        </button>

        <div className="border p-2 pt-3 shadow-sm flex flex-col gap-2 rounded-lg overflow-hidden">
          <div className="flex flex-col">
            <input
              className="
            placeholder:font-medium placeholder:text-gray-400 focus:outline-none font-medium"
              type="text"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
              placeholder="Add Task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <input
              placeholder="description"
              className="placeholder:text-sm text-sm placeholder:text-gray-400 focus:outline-none"
              name="description"
              value={descriptionValue}
              id="description"
              onChange={(e) => {
                setDescriptionValue(e.target.value);
              }}
            />
          </div>
          <Separator />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline">
              Cancel
            </Button>
            <Button
              className="flex items-center justify-center gap-1"
              size="sm"
              onClick={addTask}
            >
              Add task
            </Button>
          </div>
        </div>

        <div>
          {tasks.map((task) => (
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
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
