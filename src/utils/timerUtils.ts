import { BREAK, FOCUS, LONG_BREAK } from "@/common/const/timer";
import { PomodoroAction } from "@/common/enums/timer";
import { PomodoroState } from "@/common/interfaces/timer";

export const changePomodoroState = (
  action: PomodoroAction,
  prevState: PomodoroState
) => {
  switch (action) {
    case PomodoroAction.LONG_BREAK:
      return {
        ...prevState,
        timer: LONG_BREAK,
        action: PomodoroAction.LONG_BREAK,
        iteration: prevState.iteration + 1,
      };
    case PomodoroAction.BREAK:
      return {
        ...prevState,
        timer: BREAK,
        action: PomodoroAction.BREAK,
      };
    case PomodoroAction.FOCUS:
      return {
        ...prevState,
        action: PomodoroAction.FOCUS,
        timer: FOCUS,
        iteration: prevState.iteration + 1,
      };
  }
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getTextByAction = (action: PomodoroAction) => {
  switch (action) {
    case PomodoroAction.FOCUS:
      return "Focus";
    case PomodoroAction.BREAK:
      return "Break";
    case PomodoroAction.LONG_BREAK:
      return "Long Break";
  }
};

export const getColorByAction = (action: PomodoroAction) => {
  switch (action) {
    case PomodoroAction.FOCUS:
      return "bg-red-500";
    case PomodoroAction.BREAK:
      return "bg-green-500";
    case PomodoroAction.LONG_BREAK:
      return "bg-blue-500";
  }
};
