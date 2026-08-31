export default function Card({
  children,
  className = "",
  padding = "normal",
  ...props
}) {
  const paddings = {
    none: "",
    small: "p-4",
    normal: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-xl
        shadow-sm
        border border-gray-200 dark:border-gray-700
        transition-colors duration-200
        ${paddings[padding] ?? paddings.normal}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}