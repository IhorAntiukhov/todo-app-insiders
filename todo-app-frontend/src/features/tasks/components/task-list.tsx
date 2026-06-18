"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getTasks from "../api/getTasks";
import Task from "./task";
import { useState } from "react";
import Status from "@/types/status";
import deleteTask from "../api/deleteTask";
import updateTaskStatus from "../api/updateTaskStatus";
import TaskForm from "./task-form";
import TaskFiltering from "./task-filtering";

export default function TaskList() {
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<Status | undefined>();

  const [editId, setEditId] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: () => {},
  });

  const { mutate: updateTaskStatusMutation } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: () => {},
  });

  return (
    <div className="flex space-x-3">
      <div className="space-y-3">
        <TaskForm editId={editId} setEditId={setEditId} status={status} />

        <TaskFiltering status={status} setStatus={setStatus} />
      </div>

      <div className="flex flex-col space-y-3 overflow-scroll">
        {data?.map((task) => (
          <Task
            key={task.id}
            createdAt={task.createdAt}
            name={task.name}
            description={task.description}
            status={task.status}
            onDelete={() => deleteTaskMutation(task.id)}
            onEdit={() => setEditId(task.id)}
            onUpdateStatus={() =>
              updateTaskStatusMutation({
                id: task.id,
                status:
                  task.status === "todo"
                    ? "inProgress"
                    : task.status === "inProgress"
                      ? "done"
                      : task.status === "done"
                        ? "todo"
                        : "todo",
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
