"use client";

import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import signIn from "@/features/auth/api/signIn";
import {
  SignInFormValues,
  signInSchema,
} from "@/features/auth/forms/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signInMutation } = useMutation({
    mutationFn: ({ email, password }: SignInFormValues) =>
      signIn(email, password),
    onSuccess: () => {
      setError("");
      router.replace("/");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSignIn = handleSubmit(async (formData) => {
    signInMutation(formData);
  });

  return (
    <>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <form onSubmit={handleSignIn} className="space-y-3">
            <FormInput
              name="email"
              control={control}
              label="Email"
              placeholder="Enter your email"
              type="email"
              errors={errors}
            />

            <FormInput
              name="password"
              control={control}
              label="Password"
              placeholder="Enter your password"
              type="password"
              errors={errors}
            />

            <Button variant="default" type="submit" className="w-full">
              Sign in
            </Button>

            {error && <p className="text-red-500">Error: {error}</p>}
          </form>

          <CardFooter>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-bold">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </div>
      </CardContent>
    </>
  );
}
