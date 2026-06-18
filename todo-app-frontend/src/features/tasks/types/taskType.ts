import Status from "@/types/status";

interface Task {
  id: number;
  createdAt: string;
  name: string;
  description?: string;
  status: Status;
}

export default Task;
