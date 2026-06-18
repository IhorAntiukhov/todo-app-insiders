import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Status from "@/types/status";
import TaskStatus from "./task-status";
import formatDate from "@/lib/utils";

interface TaskProps {
  id: number;
  createdAt: string;
  name: string;
  description?: string;
  status: Status;
}

export default function Task({
  createdAt,
  name,
  description,
  status,
}: TaskProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <TaskStatus status={status} />
      </CardContent>
      <CardFooter>{formatDate(createdAt)}</CardFooter>
    </Card>
  );
}
