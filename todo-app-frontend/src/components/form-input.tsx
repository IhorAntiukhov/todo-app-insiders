import React, { HTMLInputTypeAttribute } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputProps<
  T extends FieldValues,
> extends React.ComponentProps<"input"> {
  name: Path<T>;
  control: Control<T, unknown, T>;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  errors: FieldErrors<T>;
}

export default function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type,
  errors,
}: FormInputProps<T>) {
  const isError = errors[name]?.message;

  return (
    <Field data-invalid={isError}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input id={name} type={type} placeholder={placeholder} {...field} />
        )}
      />

      {isError && <FieldError>{errors[name]?.message?.toString()}</FieldError>}
    </Field>
  );
}
