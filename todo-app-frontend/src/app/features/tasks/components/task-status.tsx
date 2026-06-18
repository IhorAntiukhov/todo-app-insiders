import { cn } from "@/lib/utils";
import Status from "@/types/status";

interface TaskStatusProps {
  status: Status;
}

export default function TaskStatus({ status }: TaskStatusProps) {
  return (
    <div
      className={cn(
        status === "todo"
          ? "bg-gray-400"
          : status === "inProgress"
            ? "bg-blue-400"
            : "bg-green-400",
        "px-2 py-1 rounded-full",
      )}
    >
      {status === "todo"
        ? "To-Do"
        : status === "inProgress"
          ? "In progress"
          : "Done"}
    </div>
  );
}
