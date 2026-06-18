import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Status from "@/types/status";
import TaskStatus from "./task-status";
import formatDate from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskProps {
  id: number;
  createdAt: string;
  name: string;
  description?: string;
  status: Status;
  onDelete: () => unknown;
  onEdit: () => unknown;
  onUpdateStatus: () => unknown;
}

export default function Task({
  createdAt,
  name,
  description,
  status,
  onDelete,
  onEdit,
  onUpdateStatus,
}: TaskProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <CardAction onClick={onEdit}>
            <Pencil />
          </CardAction>

          <CardAction onClick={onDelete}>
            <Trash />
          </CardAction>
        </div>

        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <p>{description}</p>
        <Button onClick={onUpdateStatus} variant="ghost">
          <TaskStatus status={status} />
        </Button>
      </CardContent>
      <CardFooter>{formatDate(createdAt)}</CardFooter>
    </Card>
  );
}
