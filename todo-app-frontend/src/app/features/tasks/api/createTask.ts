export default async function createTask(name: string, description: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(JSON.stringify(body));
  }

  const result = response.json();

  return result;
}
