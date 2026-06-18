export default async function deleteTask(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    {
      method: "DELETE",
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
