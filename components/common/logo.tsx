import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

// 로고 컴포넌트 - 사이트 브랜딩에 사용
export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-lg font-bold text-primary-foreground">N</span>
      </div>
      {showText && (
        <span className="text-lg font-semibold tracking-tight">Next.js</span>
      )}
    </Link>
  )
}
