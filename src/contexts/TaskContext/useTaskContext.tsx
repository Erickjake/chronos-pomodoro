import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function useTaskContext() {
  return useContext(TaskContext);
}
