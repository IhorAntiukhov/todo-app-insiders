export default async function signUp(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
}
