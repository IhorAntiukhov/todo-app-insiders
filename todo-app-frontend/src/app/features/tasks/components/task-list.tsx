"use client";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import getTasks from "../api/getTasks";
import Task from "./task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewTaskFormValues, newTaskSchema } from "../forms/newTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "@/components/form-input";
import createTask from "../api/createTask";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Status from "@/types/status";
import deleteTask from "../api/deleteTask";
import updateTask from "../api/updateTask";
import updateTaskStatus from "../api/updateTaskStatus";

export default function TaskList() {
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status | undefined>();

  const [editId, setEditId] = useState<number | null>(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewTaskFormValues>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["tasks", status],
    queryFn: () => getTasks(status),
  });

  const { mutate: createTaskMutation } = useMutation({
    mutationFn: ({ name, description }: NewTaskFormValues) =>
      createTask(name, description),
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { mutate: updateTaskMutation } = useMutation({
    mutationFn: ({ name, description }: NewTaskFormValues) =>
      updateTask(editId!, name, description),
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: (error) => {
      setError(error.message);
    },
    onSettled: () => {
      setEditId(null);
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { mutate: updateTaskStatusMutation } = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({
        queryKey: ["tasks", status],
      });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleNewTask = handleSubmit((formData) => {
    createTaskMutation(formData);
  });

  const handleUpdateTask = handleSubmit((formData) => {
    updateTaskMutation(formData);
  });

  return (
    <div className="flex space-x-3">
      <div className="space-y-3">
        <Card>
          <CardHeader>
            <CardTitle>{editId !== null ? "Edit task" : "New task"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={editId !== null ? handleUpdateTask : handleNewTask}
              className="space-y-3"
            >
              <FormInput
                name="name"
                control={control}
                label="Name"
                placeholder="Enter task name"
                type="text"
                errors={errors}
              />

              <FormInput
                name="description"
                control={control}
                label="Description"
                placeholder="Enter task description"
                type="text"
                errors={errors}
              />

              <Button className="w-full">
                {editId !== null ? "Update" : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="todo">To-Do</SelectItem>
                  <SelectItem value="inProgress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
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
