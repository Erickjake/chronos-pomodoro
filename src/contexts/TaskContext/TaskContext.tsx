import { createContext } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialState } from "./initialTaskState";
import type { TaskActionModel } from "./taskActions";

type TaskContextProps = {
    state: TaskStateModel,
    dispatch: React.Dispatch<TaskActionModel>
};

const initialContextValue = {
    state: initialState,
    dispatch: () => { }
}
export const TaskContext = createContext<TaskContextProps>(initialContextValue)