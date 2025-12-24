
"use client";

import { Controller, useFormContext, FieldError  } from "react-hook-form";
import React from "react";

type ControlledInputProps = {
  name: string;
  label?: string;
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
  }) => React.ReactElement;
};

export default function ControlledInput({
  label,
  name,
  children,
}: ControlledInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col w-full gap-y-1">
      {label && <legend className="w-full text-lg capitalize mb-1" >{label}</legend>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => children(field)}
      />

      <p className={`text-sm relative text-error-dark snappy h-4 ${
            errors[name] ? "visible animate-ghostIn" : "invisible"
          }`}
        >
          {error?.message}
      </p>
    </div>
  );
}
