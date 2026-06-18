export default async function updateTask(
  id: number,
  name: string,
  description: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
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
