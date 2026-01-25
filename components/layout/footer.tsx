import Link from "next/link"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/common/logo"

interface FooterProps {
  className?: string
}

// 푸터 컴포넌트
export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* 브랜드 */}
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">
              모던 Next.js 스타터킷으로 빠르게 프로젝트를 시작하세요.
            </p>
          </div>

          {/* 링크 섹션 1 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">제품</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/features" className="hover:text-primary">
                  기능
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary">
                  가격
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-primary">
                  변경 로그
                </Link>
              </li>
            </ul>
          </div>

          {/* 링크 섹션 2 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">리소스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/docs" className="hover:text-primary">
                  문서
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-primary">
                  가이드
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary">
                  지원
                </Link>
              </li>
            </ul>
          </div>

          {/* 링크 섹션 3 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">회사</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  연락처
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Next.js Starter Kit. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
