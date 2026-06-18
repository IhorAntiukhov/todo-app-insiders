import Status from "@/types/status";
import Task from "../types/taskType";

export default async function getTasks(status?: Status): Promise<Task[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${status ? "?status=" + status : ""}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const body = await response.json();
    throw new Error(JSON.stringify(body));
  }

  const result = response.json();

  return result;
}
