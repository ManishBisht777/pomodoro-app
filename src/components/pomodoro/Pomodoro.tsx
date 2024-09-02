"use client";

import { FOCUS } from "@/common/const/timer";
import { PomodoroAction } from "@/common/enums/timer";
import { PomodoroState } from "@/common/interfaces/timer";
import { cn } from "@/lib/utils";
import {
  changePomodoroState,
  formatTime,
  getColorByAction,
  getTextByAction,
} from "@/utils/timerUtils";
import { PauseIcon, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tasks from "../tasks/Tasks";
import { Button } from "../ui/button";

interface PomodoroProps {}

export default function Pomodoro({}: PomodoroProps) {
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    timer: FOCUS,
    isRunning: false,
    iteration: 1,
    action: PomodoroAction.FOCUS,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setPomodoroState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }
  };

  const startTimer = () => {
    if (timerRef.current) {
      stopTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setPomodoroState((prevState) => {
        if (
          prevState.timer === 0 &&
          prevState.action === PomodoroAction.FOCUS
        ) {
          if (prevState.iteration % 4 === 0) {
            return changePomodoroState(PomodoroAction.LONG_BREAK, prevState);
          } else {
            return changePomodoroState(PomodoroAction.BREAK, prevState);
          }
        } else if (
          prevState.timer === 0 &&
          prevState.action !== PomodoroAction.FOCUS
        ) {
          return changePomodoroState(PomodoroAction.FOCUS, prevState);
        } else {
          return {
            ...prevState,
            isRunning: true,
            timer: prevState.timer - 1,
          };
        }
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [pomodoroState.action]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center relative h-screen md:w-[35rem] w-[20rem]">
      <div className="h-[40%] w-full flex justify-end flex-col items-center gap-5">
        <div className="flex items-center flex-col gap-3">
          <p>{getTextByAction(pomodoroState.action)}</p>
          <h2 className="md:text-9xl text-7xl  font-extrabold">
            {formatTime(pomodoroState.timer)}
          </h2>
        </div>
        <div>
          <Button
            className={cn(
              "w-12 h-12 rounded-xl",
              getColorByAction(pomodoroState.action)
            )}
            size="icon"
            onClick={startTimer}
          >
            {pomodoroState.isRunning ? (
              <PauseIcon size={20} />
            ) : (
              <Play size={20} />
            )}
          </Button>
        </div>
        <p className="absolute top-10 right-10">#{pomodoroState.iteration}</p>
      </div>
      <Tasks />
    </div>
  );
}
