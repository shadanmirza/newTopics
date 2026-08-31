import { forwardRef, useId } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      id,
      className = "",
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            w-full rounded-lg border bg-white px-4 py-2.5
            text-gray-900 placeholder-gray-400
            dark:bg-gray-800 dark:text-gray-100
            border-gray-300 dark:border-gray-600
            focus:border-transparent focus:outline-none
            focus:ring-2 focus:ring-primary-500
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;