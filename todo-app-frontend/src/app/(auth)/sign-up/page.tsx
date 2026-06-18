"use client";

import signUp from "@/app/features/auth/api/signUp";
import {
  SignUpFormValues,
  signUpSchema,
} from "@/app/features/auth/forms/signUpSchema";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUpMutation } = useMutation({
    mutationFn: ({ name, email, password }: SignUpFormValues) =>
      signUp(name, email, password),
    onSuccess: () => {
      setError("");
      router.replace("/sign-in");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSignUp = handleSubmit(async (formData) => {
    signUpMutation(formData);
  });

  return (
    <>
      <CardContent>
        <form onSubmit={handleSignUp} className="flex flex-col space-y-3">
          <FormInput
            name="name"
            control={control}
            label="Name"
            placeholder="Enter your name"
            type="text"
            errors={errors}
          />

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

          <FormInput
            name="confirmPassword"
            control={control}
            label="Confirm password"
            placeholder="Confirm your password"
            type="password"
            errors={errors}
          />

          <Button variant="default" type="submit">
            Sign up
          </Button>

          {error && <p className="text-red-500">Error: {error}</p>}
        </form>

        <CardFooter>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-bold">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </CardContent>
    </>
  );
}
