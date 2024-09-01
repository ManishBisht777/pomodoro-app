import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Task } from "@/common/interfaces/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddTaskProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function AddTask({ setTasks, tasks }: AddTaskProps) {
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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-sm flex items-center justify-center gap-1 group hover:text-[#a81f00]">
            <Plus
              size={16}
              className="text-[#a81f00] group-hover:text-white group-hover:bg-[#a81f00] rounded-full"
            />
            Add task
          </button>
        </DialogTrigger>
        <DialogContent className="p-5">
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 rounded-lg overflow-hidden">
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
          </div>
          <DialogFooter>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
