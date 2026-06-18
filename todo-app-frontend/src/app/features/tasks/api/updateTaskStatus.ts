import Status from "@/types/status";

export default async function updateTaskStatus(id: number, status: Status) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.json();
    throw new Error(JSON.stringify(body));
  }

  const result = response.json();

  return result;
}
