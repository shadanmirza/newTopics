export default function Badge({
  children,
  variant = "gray",
  className = "",
  ...props
}) {
  const variants = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-0.5
        text-xs font-medium
        ${variants[variant] ?? variants.gray}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}