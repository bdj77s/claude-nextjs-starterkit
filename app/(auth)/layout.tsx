import { ThemeToggle } from "@/components/layout/theme-toggle"

// 인증 페이지용 레이아웃 (로그인, 회원가입 등)
// 중앙 정렬된 카드 형태의 레이아웃
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted/40 p-4">
      {/* 테마 토글 버튼 (우상단) */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* 메인 콘텐츠 */}
      <main className="w-full max-w-md">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Next.js Starter Kit</p>
      </footer>
    </div>
  )
}
