interface SkeletonLoaderProps {
  className?: string;
  count?: number;
  type?: "text" | "card" | "image" | "circle";
}

export default function SkeletonLoader({
  className = "",
  count = 1,
  type = "text",
}: SkeletonLoaderProps) {
  const getSkeletonClass = () => {
    switch (type) {
      case "text":
        return "h-4 w-full";
      case "card":
        return "h-48 w-full";
      case "image":
        return "h-64 w-full";
      case "circle":
        return "h-12 w-12 rounded-full";
      default:
        return "h-4 w-full";
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`skeleton ${getSkeletonClass()} ${className}`}
          role="status"
          aria-label="جاري التحميل..."
        >
          <span className="sr-only">جاري التحميل...</span>
        </div>
      ))}
    </>
  );
}
