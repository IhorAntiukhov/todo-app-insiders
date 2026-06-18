"use client";

import { useQuery } from "@tanstack/react-query";
import getTasks from "../api/getTasks";
import Task from "./task";

export default function TaskList() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return (
    <div>
      {data?.map((task) => (
        <Task
          createdAt={task.createdAt}
          name={task.name}
          description={task.description}
          status={task.status}
        />
      ))}
    </div>
  );
}
