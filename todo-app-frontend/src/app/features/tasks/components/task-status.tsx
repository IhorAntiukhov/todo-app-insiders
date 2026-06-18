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
        "w-full px-2 py-1 rounded-full",
      )}
    >
      <p className="text-xs">
        {status === "todo"
          ? "To-Do"
          : status === "inProgress"
            ? "In progress"
            : "Done"}
      </p>
    </div>
  );
}
