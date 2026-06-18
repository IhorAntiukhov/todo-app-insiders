"use client";

import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewTaskFormValues, newTaskSchema } from "../forms/newTaskSchema";
import createTask from "../api/createTask";
import React, { useState } from "react";
import updateTask from "../api/updateTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface TaskForm {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TaskForm({ editId, setEditId }: TaskForm) {
  const queryClient = useQueryClient();

  const [error, setError] = useState("");

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

  const handleNewTask = handleSubmit((formData) => {
    createTaskMutation(formData);
  });

  const handleUpdateTask = handleSubmit((formData) => {
    updateTaskMutation(formData);
  });

  return (
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

      <CardFooter>
        {error && <p className="text-red-500">Error: {error}</p>}
      </CardFooter>
    </Card>
  );
}
