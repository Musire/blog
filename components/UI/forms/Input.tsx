"use client";

import {
  useFormContext,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// Discriminated union for input vs textarea
type FormFieldProps<T extends FieldValues> =
  | ({
      label: string;
      name: Path<T>;
      type?: undefined; // default input
    } & InputHTMLAttributes<HTMLInputElement>)
  | ({
      label: string;
      name: Path<T>;
      type: "text-area";
    } & TextareaHTMLAttributes<HTMLTextAreaElement>);

export default function Input<T extends FieldValues>({
  label,
  name,
  type,
  ...rest
}: FormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = errors[name] as FieldError | undefined;

  const baseClasses =
    "grow bg-transparent border border-white/40 rounded-lg focus:outline-none text-base normal-space text-white/60";

  return (
    <div>
      <label className="flex flex-col w-full space-y-1">
        <span className="w-fit capitalize text-white/75 text-lg">{label}</span>

        {type !== "text-area" && (
          <input
            {...register(name)}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className={`${baseClasses} ${
              fieldError ? "border-error-dark snappy" : ""
            }`}
          />
        )}

        {type === "text-area" && (
          <textarea
            {...register(name)}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`min-h-32 ${baseClasses} ${
              fieldError ? "border-error-dark snappy scrollbar-adjust " : ""
            }`}
          />
        )}

        <p
          className={`text-sm relative text-error-dark snappy h-4 ${
            fieldError ? "visible animate-ghostIn" : "invisible"
          }`}
        >
          {fieldError?.message}
        </p>
      </label>
    </div>
  );
}
