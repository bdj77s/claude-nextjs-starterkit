import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

// 로딩 스피너 컴포넌트
export function LoadingSpinner({
  className,
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "size-4 border-2",
    md: "size-8 border-2",
    lg: "size-12 border-3",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="로딩 중"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
